import InventoryItemsCollection from './InventoryItemsCollection';

export default class UserData {
  constructor() {
    this.cash = 5;
    this.hourlyIncome = 0;
    this.inventory = {};
  }

  workOnResource(resource) {
    this.cash += this.inventory[resource].totalIncome;
  }

  spendMoney(price) {
    this.cash -= price;
  }

  addItemToInventory({name, incomeIncrease: income}) {
    if (!Object.prototype.hasOwnProperty.call(this.inventory, name)) {
      this.inventory[name] = new InventoryItemsCollection(income);
    }

    this.inventory[name].add();

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
}
