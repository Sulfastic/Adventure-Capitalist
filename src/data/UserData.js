import InventoryItemsCollection from './InventoryItemsCollection';

class UserData {
  constructor() {
    this.cash = 5;
    this.hourlyIncome = 0;
    this.inventory = {};
  }

  spendMoney(price) {
    this.cash -= price;
  }

  earnMoney(money) {
    this.cash += money;
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

const user = new UserData();

export default user;
