import { observable, action } from "mobx";
import { autobind } from 'core-decorators';

@autobind
export default class UserStore {
  @observable userId = null;
  @observable seminarRoom = {};

  @action async getUserInfomation () {
      ...
  }
}
