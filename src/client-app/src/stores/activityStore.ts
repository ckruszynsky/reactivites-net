import {action, computed, configure, observable, runInAction} from 'mobx';
import {createContext, SyntheticEvent} from 'react';

import agent from '../api/agent';
import {IActivity} from '../models';

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable loading = false;
  @observable currentActivity: IActivity | null = null;  
  @observable submitting = false;
  @observable target = "";

  @computed get activitiesByDate() :IActivity[] {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.loading = true;
    const activities = await agent.Activities.list();
    try {
      runInAction("loading activities", () => {
        activities.forEach(act => {
          act.date = act.date.split(".")[0];
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
      } else {
        this.loading = true;
        const activity = await agent.Activities.details(id);
        runInAction("load Activity", () => {
          this.currentActivity = activity;
          this.loading = false;
        });
      }
    } catch (error) {
      runInAction("load activity error", () => {
        this.loading = false;
      });
      console.error(error);
    }
  };

  @action clearActivity = () => {
    this.currentActivity = null;
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction("Create Activity", () =>
        this.activityRegistry.set(activity.id, activity)
      );
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
