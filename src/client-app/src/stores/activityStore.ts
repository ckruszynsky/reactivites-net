import { action, computed, configure, observable, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';

import agent from '../api/agent';
import { IActivity } from '../models';

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable loadingInitial = false;
  @observable selectedActivity: IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
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
      runInAction("load activities set initial false", () => (this.loadingInitial = false));
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction("Create Activity", () => this.activityRegistry.set(activity.id, activity));
    } catch (error) {
      console.error(error);
    } finally {
      runInAction("Create Activity reset modes", () => {
        this.editMode = false;
        this.submitting = false;
      });
    }
  };

  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  };

  @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    try {
      this.target = event.currentTarget.name;
      this.selectedActivity = undefined;
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
        this.selectedActivity = activity;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction("Edit Activity reset modes", () => {
        this.submitting = false;
        this.editMode = false;
      });
    }
  };

  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };
  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
