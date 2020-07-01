export default class InventoryItemsCollection {
  get totalIncome() {
    return this.income * this.quantity;
  }

  get finalProductionTime() {
    return this.baseProductionTime * this.timeDecreaseMultiplier;
  }

  constructor(income = 0, baseProductionTime = 1, timeDecreaseMultiplier = 1) {
    this.income = income;
    this.quantity = 0;
    this.baseProductionTime = baseProductionTime;
    this.timeDecreaseMultiplier = timeDecreaseMultiplier;
  }

  add() {
    this.quantity += 1;
    this.timeDecreaseMultiplier *= this.timeDecreaseMultiplier;
  }
}
