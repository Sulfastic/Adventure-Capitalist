export default class IncomeSource {
  get finalCost() {
    return this.baseCost * this.costMultiplier;
  }

  constructor({
    name = 'Empty Income Source',
    baseCost = 1,
    incomeIncrease = 1,
    costMultiplier = 1.01,
  } = {}) {
    this.name = name;
    this.baseCost = baseCost;
    this.incomeIncrease = incomeIncrease;
    this.costMultiplier = costMultiplier;
  }

  risePrice() {
    this.baseCost = this.finalCost;
  }

  toString() {
    return (`${this.name}: $ ${this.finalCost.toFixed(2)}, income increase: ${this.incomeIncrease}`);
  }
}
