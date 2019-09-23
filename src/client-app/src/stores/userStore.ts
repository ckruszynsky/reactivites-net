import {action, computed, observable, runInAction} from 'mobx';

import agent from '../api/agent';
import {history} from '../util/router';
import {IUser, IUserFormValues} from './../models/user';
import {RootStore} from './rootStore';

export class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction('logging in user', () => {
        this.user = user;
      });
      history.push('/activities');
    } catch (error) {
      throw error;
    }
  };
}
