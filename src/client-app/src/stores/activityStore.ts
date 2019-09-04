import { action, observable } from 'mobx';
import { createContext } from 'react';

import agent from '../api/agent';
import { IActivity } from '../models';

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;

  @action loadActivities = () => {
    this.loadingInitial = true;
    agent.Activities.list()
      .then(activities => {
        activities.forEach(act => {
          act.date = act.date.split(".")[0];
          this.activities.push(act);
        });
      })
      .finally(() => this.loadingInitial = false);
  };
}

export default createContext(new ActivityStore());
