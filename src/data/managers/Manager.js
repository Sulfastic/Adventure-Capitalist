export default class Manager {
  constructor({
    name = 'A manager',
    icon = 'manager1',
    incomeSourceUsage = 'Empty Income Source',
    baseCost = 1000,
  } = {}) {
    this.cash = 0;
    this.name = name;
    this.icon = icon;
    this.incomeSourceUsage = incomeSourceUsage;
    this.baseCost = baseCost;
  }

  toString() {
    return (`$${this.baseCost}`);
  }
}
