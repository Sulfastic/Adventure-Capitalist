/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import InventoryItemsCollection from './InventoryItemsCollection';

class UserData {
  get saveTimestamp() {
    return this._saveTime;
  }

  get loadTimestamp() {
    return this._loadTime;
  }

  get cash() {
    return this._cash;
  }

  get inventory() {
    return this._inventory;
  }

  constructor() {
    this._saveTime = null;
    this._loadTime = null;
    this._cash = 5;
    this._income = 0;
    this._inventory = {};
  }

  parse({
    cash,
    saveTimestamp,
    loadTimestamp,
    inventory,
  }) {
    this._cash = cash;
    this._saveTime = saveTimestamp;
    this._loadTime = loadTimestamp;

    this.parseInventory(inventory);
  }

  parseInventory(inventory) {
    for (const name in inventory) {
      const business = inventory[name];
      this._inventory[name] = new InventoryItemsCollection(
        business.income,
        business.baseProductionTime,
        business.timeDecreaseMultiplier,
      );

      for (let i = 0; i < business.quantity; i += 1) {
        this._inventory[name].add();
        this.updateIncome();
      }
    }
  }

  spendMoney(price) {
    this._cash -= price;
  }

  earnMoney(money) {
    this._cash += money;
  }

  addItemToInventory({
    name: resource,
    incomeIncrease: income,
    baseProductionTime,
    timeDecreaseMultiplier,
  }) {
    if (!this.hasSpecifiedIncomeSource(resource)) {
      this._inventory[resource] = new InventoryItemsCollection(
        income, baseProductionTime, timeDecreaseMultiplier,
      );
    }

    this._inventory[resource].add();

    this.updateIncome();
  }

  updateIncome() {
    const {totalIncome} = Object.values(this._inventory)
      .reduce((item1, item2) => ({
        totalIncome: item1.totalIncome + item2.totalIncome,
      }), {totalIncome: 0});
    this._income = totalIncome;
  }

  hasSpecifiedIncomeSource(name) {
    return Object.prototype.hasOwnProperty.call(this._inventory, name);
  }

  getBusinessByName(name) {
    if (this.hasSpecifiedIncomeSource(name)) return this._inventory[name];
    return null;
  }

  toString() {
    return (`Cash: ${this._cash.toFixed(2)} Hourly Income: ${this._income}`);
  }
}

const user = new UserData();

export default user;
