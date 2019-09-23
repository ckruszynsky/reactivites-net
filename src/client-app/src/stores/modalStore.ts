import {action, observable} from 'mobx';

import {RootStore} from './rootStore';

export class ModalStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  //must be set to shallow,
  //if not it will throw error regarding changing observed observable values
  //outside actions
  //will only observe the first level in the body object.
  @observable.shallow modal = {
    open: false,
    body: null
  };

  @action openModal = (content: any) => {
    this.modal.open = true;
    this.modal.body = content;
  };

  @action closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}
