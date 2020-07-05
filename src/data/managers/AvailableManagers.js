import Manager from './Manager';
import managers from './managers.json';
import ManagersCollection from './ManagersCollection';

export default new (class AvailableManagers extends ManagersCollection {
  _init() {
    super._init();

    managers.forEach((manager) => {
      this.managers[manager.name] = new Manager(manager);
    });
  }

  removeFromUnemployedPool(manager) {
    delete this.managers[manager.name];
  }
})();
