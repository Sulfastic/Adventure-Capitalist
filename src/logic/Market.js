import user from '../data/user/UserData';

export default class Market {
  // registerManager() {

  // }

  static workOnResource({name: resource}, onComplete) {
    if (user.hasSpecifiedIncomeSource(resource)) {
      const item = user.inventory[resource];
      setTimeout(() => {
        user.earnMoney(item.totalIncome);
        onComplete();
      }, item.finalProductionTime * 1000);
    } else {
      onComplete();
      console.log('no such business owned');
    }
  }

  static buyAnItem(incomeSource) {
    if (user.cash >= incomeSource.finalCost) {
      user.spendMoney(incomeSource.finalCost);
      user.addItemToInventory(incomeSource);
      incomeSource.sellAnItem();
    }
  }

  static hireManager(manager) {
    if (user.cash >= manager.baseCost) {
      user.spendMoney(manager.baseCost);
    } else {
      console.log('no sufficient money');
    }
  }
}
