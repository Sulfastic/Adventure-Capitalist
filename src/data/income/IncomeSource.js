export default class IncomeSource {
  get finalCost() {
    return this.baseCost * this.costMultiplier;
  }

  constructor({
    name = 'Empty Income Source',
    icon = 'empty',
    incomeIncrease = 1,
    baseCost = 1,
    costMultiplier = 1.01,
    baseProductionTime = 0.5,
    timeDecreaseMultiplier = 1,
    maximumNumberOfThisItem = 1,
  } = {}) {
    this.name = name;
    this.icon = icon;
    this.incomeIncrease = incomeIncrease;
    this.baseCost = baseCost;
    this.costMultiplier = costMultiplier;
    this.baseProductionTime = baseProductionTime;
    this.timeDecreaseMultiplier = timeDecreaseMultiplier;
    this.maximumNumberOfThisItem = maximumNumberOfThisItem;
  }

  sellAnItem() {
    if (this.maximumNumberOfThisItem > 0) {
      this.maximumNumberOfThisItem -= 1;
      this.baseCost = this.finalCost;
    }
  }

  toString() {
    return (`$${this.finalCost.toFixed(2)}, income: $${this.incomeIncrease}`);
  }
}
