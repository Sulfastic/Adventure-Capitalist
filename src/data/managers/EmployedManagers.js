import ManagersCollection from './ManagersCollection';

export default new (class EmployedManagers extends ManagersCollection {
  hireManager(manager) {
    this.managers[manager.name] = manager;
  }
})();
