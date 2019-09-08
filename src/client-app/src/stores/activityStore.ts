import { action, observable } from 'mobx';
import { createContext } from 'react';

import agent from '../api/agent';
import { IActivity } from '../models';

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable selectedActivity:IActivity| undefined;
  @observable editMode = false;

  @action loadActivities = async () => {
    this.loadingInitial = true;
    const activities = await agent.Activities.list();
    try {
      activities.forEach(act => {
        act.date = act.date.split(".")[0];
        this.activities.push(act);
      });
    }catch(error){
      console.error(error);
    } finally{
      this.loadingInitial = false;
    }
  };

  @action selectActivity = (id:string) => {
    this.selectedActivity = this.activities.find(a=> a.id === id);
    this.editMode = false;
  }
}

export default createContext(new ActivityStore());
