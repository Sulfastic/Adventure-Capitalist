export default class Vendor {
  static buyAnItem(user, item) {
    if (user.cash >= item.finalCost) {
      user.spendMoney(item.finalCost);
      user.addItemToInventory(item);
      item.risePrice();
    }
  }
}
