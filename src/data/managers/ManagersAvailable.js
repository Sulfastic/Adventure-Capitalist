import Manager from './Manager';
import managers from './managers.json';
import ManagersCollection from './ManagersCollection';

class ManagersAvailable extends ManagersCollection {
  _init() {
    super._init();

    managers.forEach((manager) => {
      this._managers[manager.name] = new Manager(manager);
    });
  }

  removeFromUnemployedPool(manager) {
    delete this._managers[manager.name];
  }
}

const managersAvailable = new ManagersAvailable();

export default managersAvailable;
