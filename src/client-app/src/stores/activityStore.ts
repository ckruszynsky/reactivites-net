import {action, computed, observable, runInAction} from 'mobx';
import {SyntheticEvent} from 'react';
import {toast} from 'react-toastify';

import agent from '../api/agent';
import {IActivity} from '../models';
import {history} from '../util/router';
import {createAttendee, setActivityProps} from './../util/setActivityProps';
import {RootStore} from './rootStore';

export class ActivityStore {
  rootStore: RootStore;
  @observable activityRegistry = new Map();
  @observable loading = false;
  @observable currentActivity: IActivity | null = null;
  @observable submitting = false;
  @observable target = '';

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @computed get activitiesByDate(): [string, IActivity[]][] {
    return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
  }

  groupActivitiesByDate(activities: IActivity[]): [string, IActivity[]][] {
    const sortedActivities = activities.sort((a, b) => a.date.getTime() - b.date.getTime());
    return Object.entries(
      sortedActivities.reduce(
        (activities, activity) => {
          const date = activity.date.toISOString().split('T')[0];
          activities[date] = activities[date] ? [...activities[date], activity] : [activity];
          return activities;
        },
        {} as {[key: string]: IActivity[]}
      )
    );
  }
  @action loadActivities = async () => {
    this.loading = true;
    const user = this.rootStore.userStore.user!;
    try {
      const activities = await agent.Activities.list();
      runInAction('loading activities', () => {
        activities.forEach(act => {
          act = setActivityProps(act, user);
          this.activityRegistry.set(act.id, act);
        });
        this.loading = false;
      });
    } catch (error) {
      runInAction('load activities error', () => {
        this.loading = false;
      });
    }
  };

  @action loadActivity = async (id: string) => {
    try {
      if (this.activityRegistry.has(id)) {
        const activity = this.activityRegistry.get(id);
        this.currentActivity = activity;
        return activity;
      } else {
        this.loading = true;
        const user = this.rootStore.userStore.user!;
        let activity = await agent.Activities.details(id);
        runInAction('load Activity', () => {
          activity = setActivityProps(activity, user);
          this.currentActivity = activity;
          this.activityRegistry.set(activity.id, activity);
          this.loading = false;
        });
        return activity;
      }
    } catch (error) {
      this.loading = false;
      console.log(error.response);
    }
  };

  @action clearActivity = () => {
    this.currentActivity = null;
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction('Create Activity', () => {
        this.activityRegistry.set(activity.id, activity);
        history.push(`/activities/${activity.id}`);
        this.submitting = false;
      });
    } catch (error) {
      toast.error('Problem submitting data');
      runInAction('Create Activity reset modes', () => {
        this.submitting = false;
      });
    }
  };

  @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    try {
      this.target = event.currentTarget.name;
      this.currentActivity = null;
      await agent.Activities.delete(id);
      runInAction('Delete Activity', () => this.activityRegistry.delete(id));
    } catch (error) {
      console.error(error);
      runInAction('Delete Activity reset submit', () => (this.submitting = false));
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction('Edit Activity', () => {
        this.activityRegistry.set(activity.id, activity);
        this.currentActivity = activity;
        history.push(`/activities/${activity.id}`);
        this.submitting = false;
      });
    } catch (error) {
      console.error(error);
      runInAction('Edit Activity reset modes', () => {
        this.submitting = false;
      });
    }
  };

  @action attendActivity = () => {
    const attendee = createAttendee(this.rootStore.userStore.user!);
    if(this.currentActivity){
      this.currentActivity.attendees.push(attendee);
      this.currentActivity.isGoing = true;
      this.activityRegistry.set(this.currentActivity.id, this.currentActivity)
    }
  }  

  @action cancelAttendance = () => {
    console.log('canceling attendance');
    if(this.currentActivity){
      this.currentActivity.attendees = this.currentActivity.attendees.filter(a => a.username !== this.rootStore.userStore.user!.username);
      this.currentActivity.isGoing = false;
      this.activityRegistry.set(this.currentActivity.id, this.currentActivity);
    }
  }
}
