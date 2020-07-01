export default class Market {
  // registerManager() {

  // }

  static buyAnItem(user, incomeSource) {
    if (user.cash >= incomeSource.finalCost) {
      user.spendMoney(incomeSource.finalCost);
      user.addItemToInventory(incomeSource);
      incomeSource.sellAnItem();
    }
  }

  static hireManager(user, manager) {
    if (user.cash >= manager.baseCost) {
      user.spendMoney(manager.baseCost);
    }
  }
}
