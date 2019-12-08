import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { action, computed, observable, reaction, runInAction, toJS } from 'mobx';
import { SyntheticEvent } from 'react';
import { toast } from 'react-toastify';

import agent from '../api/agent';
import { IActivity } from '../models';
import { history } from '../util/router';
import { createAttendee, setActivityProps } from './../util/setActivityProps';
import { RootStore } from './rootStore';

const LIMIT = 2;
export class ActivityStore {
	rootStore: RootStore
	@observable activityRegistry = new Map()
	@observable loading = false
	@observable processing = false
	@observable currentActivity: IActivity | null = null
	@observable submitting = false
	@observable target = ''
	@observable count = 0;
	@observable page = 0;

	@computed get totalPages() {
		return Math.ceil(this.count/LIMIT);
	}


	//only observes the ref, doesn't try to turn
	//the object itself into a observable
	@observable.ref hubConnection: HubConnection | null = null

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore

		reaction(
			()=>this.predicate.keys(),
			()=> {
				this.page = 0;
				this.activityRegistry.clear();
				this.loadActivities();
			}
		);
	}

	@observable predicate = new Map();

  @action setPredicate = (predicate: string, value: string | Date) => {
    this.predicate.clear();
    if (predicate !== 'all') {
      this.predicate.set(predicate, value);
    }
  }

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append('limit', String(LIMIT));
    params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
    this.predicate.forEach((value, key) => {
      if (key === 'startDate') {
        params.append(key, value.toISOString())
      } else {
        params.append(key, value)
      }
    })
    return params;
  }

	@computed get activitiesByDate(): [string, IActivity[]][] {
		return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()))
	}

	groupActivitiesByDate(activities: IActivity[]): [string, IActivity[]][] {
		const sortedActivities = activities.sort(
			(a, b) => a.date.getTime() - b.date.getTime()
		)
		return Object.entries(
			sortedActivities.reduce(
				(activities, activity) => {
					const date = activity.date.toISOString().split('T')[0]
					activities[date] = activities[date]
						? [...activities[date], activity]
						: [activity]
					return activities
				},
				{} as {[key: string]: IActivity[]}
			)
		)
	}

	@action loadActivities = async () => {
		this.loading = true
		const user = this.rootStore.userStore.user!
		try {
			const activitiesEnvelope = await agent.Activities.list(this.axiosParams);
			const {activities, count} = activitiesEnvelope;
			runInAction('loading activities', () => {
				activities.forEach(act => {
					act = setActivityProps(act, user)
					this.activityRegistry.set(act.id, act)
				})
				this.count = count;
				this.loading = false
			})
		} catch (error) {
			runInAction('load activities error', () => {
				this.loading = false
			})
		}
	}

	@action loadActivity = async (id: string) => {
		try {
			if (this.activityRegistry.has(id)) {
				const activity = this.activityRegistry.get(id)
				this.currentActivity = activity
				return toJS(activity); //create a deep clone of the observable
			} else {
				this.loading = true
				const user = this.rootStore.userStore.user!
				let activity = await agent.Activities.details(id)
				runInAction('load Activity', () => {
					activity = setActivityProps(activity, user)
					this.currentActivity = activity
					this.activityRegistry.set(activity.id, activity)
					this.loading = false
				})
				return activity
			}
		} catch (error) {
			this.loading = false
			console.log(error.response)
		}
	}

	@action clearActivity = () => {
		this.currentActivity = null
	}

	@action createActivity = async (activity: IActivity) => {
		this.submitting = true
		try {
			await agent.Activities.create(activity)
			const attendee = createAttendee(this.rootStore.userStore.user!)
			attendee.isHost = true
			let attendees = []
			attendees.push(attendee)
			activity.attendees = attendees
			activity.isHost = true
			runInAction('Create Activity', () => {
				this.activityRegistry.set(activity.id, activity)
				history.push(`/activities/${activity.id}`)
				this.submitting = false
			})
		} catch (error) {
			toast.error('Problem submitting data')
			runInAction('Create Activity reset modes', () => {
				this.submitting = false
			})
		}
	}

	@action deleteActivity = async (
		event: SyntheticEvent<HTMLButtonElement>,
		id: string
	) => {
		this.submitting = true
		try {
			this.target = event.currentTarget.name
			this.currentActivity = null
			await agent.Activities.delete(id)
			runInAction('Delete Activity', () => this.activityRegistry.delete(id))
		} catch (error) {
			console.error(error)
			runInAction('Delete Activity reset submit', () => (this.submitting = false))
		}
	}

	@action editActivity = async (activity: IActivity) => {
		this.submitting = true
		try {
			await agent.Activities.update(activity)
			runInAction('Edit Activity', () => {
				this.activityRegistry.set(activity.id, activity)
				this.currentActivity = activity
				history.push(`/activities/${activity.id}`)
				this.submitting = false
			})
		} catch (error) {
			console.error(error)
			runInAction('Edit Activity reset modes', () => {
				this.submitting = false
			})
		}
	}

	@action attendActivity = async () => {
		const attendee = createAttendee(this.rootStore.userStore.user!)
		this.processing = true
		try {
			await agent.Activities.attend(this.currentActivity!.id)
			runInAction(() => {
				if (this.currentActivity) {
					this.currentActivity.attendees.push(attendee)
					this.currentActivity.isGoing = true
					this.activityRegistry.set(this.currentActivity.id, this.currentActivity)
				}
				this.processing = false
			})
		} catch (error) {
			runInAction(() => {
				this.processing = false
			})

			toast.error('Problem signing up to activity')
		}
	}

	@action cancelAttendance = async () => {
		this.processing = true
		try {
			await agent.Activities.unattend(this.currentActivity!.id)
			runInAction(() => {
				if (this.currentActivity) {
					this.currentActivity.attendees = this.currentActivity.attendees.filter(
						a => a.username !== this.rootStore.userStore.user!.username
					)
					this.currentActivity.isGoing = false
					this.activityRegistry.set(this.currentActivity.id, this.currentActivity)
				}
				this.processing = false
			})
		} catch (error) {
			runInAction(() => {
				this.processing = false
			})

			toast.error('Problem cancelling attendance')
		}
	}

	@action addComment = async (values: any) => {
		values.activityId = this.currentActivity!.id

		try {
			await this.hubConnection!.invoke('SendComment', values)
		} catch (error) {
			console.log(error)
		}
	}

	@action
	stopHubConnection = () => {
		this.hubConnection!.stop()
	}

	@action createHubConnection = () => {
		this.hubConnection = new HubConnectionBuilder()
			.withUrl(process.env.REACT_APP_API_CHAT_URL!, {
				accessTokenFactory: () => this.rootStore.commonStore.token!
			})
			.configureLogging(LogLevel.Information)
			.build()

		this.hubConnection
			.start()
			.then(() => console.log(this.hubConnection!.state))
			.catch(error => {
				console.log('Error establishing connection', error)
				toast.error('Error establishing connection')
			})

		this.hubConnection.on('ReceiveComment', comment => {
			runInAction(() => {
				if (this.currentActivity != null) {
					this.currentActivity.comments.push(comment)
				}
			})
		})
	}

	@action setPage = (page:number) => {
		this.page = page;
	}
}
