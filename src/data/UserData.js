import InventoryItemsCollection from './InventoryItemsCollection';

export default class UserData {
  constructor() {
    this.cash = 5;
    this.hourlyIncome = 0;
    this.inventory = {};
  }

  workOnResource({name: resource}, onComplete) {
    if (this.hasSpecifiedIncomeSource(resource)) {
      const item = this.inventory[resource];
      setTimeout(() => {
        this.cash += item.totalIncome;
        onComplete();
      }, item.finalProductionTime * 1000);
    } else {
      onComplete();
      console.log('no such business owned');
    }
  }

  spendMoney(price) {
    this.cash -= price;
  }

  addItemToInventory({
    name: resource,
    incomeIncrease: income,
    baseProductionTime,
    timeDecreaseMultiplier,
  }) {
    if (!this.hasSpecifiedIncomeSource(resource)) {
      this.inventory[resource] = new InventoryItemsCollection(
        income, baseProductionTime, timeDecreaseMultiplier,
      );
    }

    this.inventory[resource].add();

    this.updateIncome();
  }

  updateIncome() {
    const {totalIncome} = Object.values(this.inventory)
      .reduce((item1, item2) => ({
        totalIncome: item1.totalIncome + item2.totalIncome,
      }), {totalIncome: 0});
    this.hourlyIncome = totalIncome;
  }

  toString() {
    return (`Cash: ${this.cash.toFixed(2)} Hourly Income: ${this.hourlyIncome}`);
  }
  // private

  hasSpecifiedIncomeSource(name) {
    return Object.prototype.hasOwnProperty.call(this.inventory, name);
  }
}
