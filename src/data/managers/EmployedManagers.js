import ManagersCollection from './ManagersCollection';

class EmployedManagers extends ManagersCollection {
  hireManager(manager) {
    this._managers[manager.name] = manager;
  }
}

const managers = new EmployedManagers();

export default managers;
