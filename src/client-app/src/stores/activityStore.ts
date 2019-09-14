import { action, computed, configure, observable, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';

import agent from '../api/agent';
import { IActivity } from '../models';
import { history } from '../util/router';

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable loading = false;
  @observable currentActivity: IActivity | null = null;  
  @observable submitting = false;
  @observable target = "";

  @computed get activitiesByDate():[string,IActivity[]][] {
    return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()))
  }

  groupActivitiesByDate(activities:IActivity[]):[string,IActivity[]][]{
    const sortedActivities = activities.sort(
      (a, b) => a.date.getTime() - b.date.getTime()      
    );
    return Object.entries(sortedActivities.reduce((activities,activity)=>{
        const date = activity.date.toISOString().split('T')[0];
        activities[date] = activities[date] ? [...activities[date], activity]: [activity]
        return activities;
    },{} as {[key:string]: IActivity[]}));    
  }
  @action loadActivities = async () => {
    this.loading = true;
    const activities = await agent.Activities.list();
    try {
      runInAction("loading activities", () => {
        activities.forEach(act => {
          act.date = new Date(act.date);
          this.activityRegistry.set(act.id, act);
        });
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(
        "load activities set initial false",
        () => (this.loading = false)
      );
    }
  };

  @action loadActivity = async (id: string) => {
    try {
      if (this.activityRegistry.has(id)) {
        this.currentActivity = this.activityRegistry.get(id);
        return this.currentActivity;
      } else {
        this.loading = true;
        const activity = await agent.Activities.details(id);
        runInAction("load Activity", () => {
          activity.date = new Date();
          this.currentActivity = activity;
          this.activityRegistry.set(activity.id, activity);
          this.loading = false;
        });
        return activity;
       
      }
    } catch (error) {
      runInAction("load activity error", () => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  @action clearActivity = () => {
    this.currentActivity = null;
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction("Create Activity", () =>{
        this.activityRegistry.set(activity.id, activity);
          history.push(`/activities/${activity.id}`)
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction("Create Activity reset modes", () => { 
        this.submitting = false;
      });
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    try {
      this.target = event.currentTarget.name;
      this.currentActivity = null;
      await agent.Activities.delete(id);
      runInAction("Delete Activity", () => this.activityRegistry.delete(id));
    } catch (error) {
      console.error(error);
    } finally {
      runInAction("Delete Activity reset submit", () => (this.submitting = false));
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("Edit Activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.currentActivity = activity;
        history.push(`/activities/${activity.id}`);
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction("Edit Activity reset modes", () => {
        this.submitting = false;
      });
    }
  };
}

export default createContext(new ActivityStore());
