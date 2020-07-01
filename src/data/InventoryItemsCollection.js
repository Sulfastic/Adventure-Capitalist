export default class InventoryItemsCollection {
  get totalIncome() {
    return this.income * this.quantity;
  }

  constructor(income = 0) {
    this.income = income;
    this.quantity = 0;
  }

  add() {
    this.quantity += 1;
  }
}
