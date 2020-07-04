import Manager from './Manager';

export default class ManagersCollection {
  get managers() {
    return this._managers;
  }

  constructor() {
    this._init();
  }

  parse(managers) {
    if (!(Object.keys(managers).length === 0 && managers.constructor === Object)) {
      this._managers = {};
      Object.keys(managers).forEach((name) => {
        this._managers[name] = new Manager(managers[name]);
      });
    }
  }

  _init() {
    this._managers = {};
  }
}
