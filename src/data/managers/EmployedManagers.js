import ManagersCollection from './ManagersCollection';

export default new (class EmployedManagers extends ManagersCollection {
  hireManager(manager) {
    this._managers[manager.name] = manager;
  }
})();
