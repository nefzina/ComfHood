const AbstractManager = require("./AbstractManager");

class CartsManager extends AbstractManager {
  constructor() {
    super({ table: "carts" });
  }

  insert(cart) {
    return this.database.query(
      `insert into ${this.table} (item_id, user_id) values (?, ?)`,
      [cart.item_id, cart.user_id]
    );
  }

  update(cart) {
    return this.database.query(
      `update ${this.table} set item_id = ? where uesr_id = ?`,
      [cart.item_id, cart.user_id]
    );
  }

  deleteItem(itemId) {
    return this.database.query(`delete from ${this.table} where item_id = ?`, [
      itemId,
    ]);
  }
}

module.exports = CartsManager;
