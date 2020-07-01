export default class Manager {
  constructor({
    name = 'A manager',
    incomeSourceUsage = 'Empty Income Source',
    baseCost = 1000,
  } = {}) {
    this.name = name;
    this.incomeSourceUsage = incomeSourceUsage;
    this.baseCost = baseCost;
  }

  toString() {
    return (`${this.name}, cost: ${this.baseCost}, works on: ${this.incomeSourceUsage}`);
  }
}
