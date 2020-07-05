import Manager from './Manager';

export default class ManagersCollection {
  constructor() {
    this._init();
  }

  parse(managers) {
    if (!(Object.keys(managers).length === 0 && managers.constructor === Object)) {
      this.managers = {};
      Object.keys(managers).forEach((name) => {
        this.managers[name] = new Manager(managers[name]);
      });
    }
  }

  _init() {
    this.managers = {};
  }
}
