/* eslint-disable no-console */

import user from '../data/user/UserData';
import availableManagers from '../data/managers/ManagersAvailable';
import employedManagers from '../data/managers/EmployedManagers';
import ee from '../events/ee';

const A_SECOND = 1000;

function _canUserAfford(value) {
  return user.cash >= value;
}

function _doesUserHaveGivenResource(resource) {
  return user.hasSpecifiedIncomeSource(resource);
}

function _canHireManager(manager) {
  return _canUserAfford(manager.baseCost)
    && _doesUserHaveGivenResource(manager.incomeSourceUsage);
}

function _hireManager(manager) {
  user.spendMoney(manager.baseCost);
  availableManagers.removeFromUnemployedPool(manager);
  employedManagers.hireManager(manager);
}

function _buyABusiness(incomeSource) {
  user.spendMoney(incomeSource.finalCost);
  user.addItemToInventory(incomeSource);
  incomeSource.sellAnItem();
}

function _workOnResource(name, onComplete) {
  const business = user.getBusinessByName(name);
  ee.emit(`production/started${name}`, name);
  setTimeout(() => {
    user.earnMoney(business.totalIncome);
    ee.emit(`production/finished${name}`, name);
    onComplete();
  }, business.finalProductionTime * A_SECOND);
}

function _produceOfflineIncome(time) {
  Object.values(employedManagers.managers).forEach((manager) => {
    const business = user.getBusinessByName(manager.incomeSourceUsage);
    const productionTime = business.finalProductionTime * A_SECOND;
    const cyclesDoneOffline = Math.floor(time / productionTime);

    user.earnMoney(business.totalIncome * cyclesDoneOffline);
  });
}

export default class Market {
  static workOnResource(resource, onComplete) {
    if (_doesUserHaveGivenResource(resource)) {
      _workOnResource(resource, onComplete);
    } else {
      onComplete();
      console.log('no such business owned');
    }
  }

  static buyABusiness(incomeSource) {
    if (_canUserAfford(incomeSource.finalCost)) {
      _buyABusiness(incomeSource);
      ee.emit(`${incomeSource.name}/bought`);
    }
  }

  static hireManager(manager) {
    if (_canHireManager(manager)) {
      _hireManager(manager);
    } else {
      console.log('cannot hire manager: no sufficient money or no such business owned');
    }
  }

  static orderManagerToWork(incomeSourceUsage) {
    Market.workOnResource(incomeSourceUsage, () => Market.orderManagerToWork(incomeSourceUsage));
  }

  static forceOrderManagersToWork() {
    Object.values(employedManagers.managers).forEach((manager) => {
      Market.orderManagerToWork(manager.incomeSourceUsage);
    });
  }

  static produceOfflineIncome() {
    const {saveTimestamp, loadTimestamp} = user;
    if (saveTimestamp && loadTimestamp) {
      _produceOfflineIncome(loadTimestamp - saveTimestamp);
    }
  }
}
