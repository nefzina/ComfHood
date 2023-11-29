const AbstractManager = require("./AbstractManager");

class CartsManager extends AbstractManager {
  constructor() {
    super({ table: "carts" });
  }

  findByUserId(userId) {
    return this.database.query(
      `select item_id, quantity from ${this.table} where user_id = ?`,
      [userId]
    );
  }

  findByUserItemIds(userId, itemId) {
    return this.database.query(
      `select quantity from ${this.table} where user_id = ? and item_id = ?`,
      [userId, itemId]
    );
  }

  insert(data) {
    return this.database.query(
      `insert into ${this.table} (item_id, user_id, quantity) values (?, ?, ?)`,
      [data.item_id, data.user_id, data.quantity]
    );
  }

  update(data) {
    return this.database.query(
      `update ${this.table} set quantity = ? where user_id = ? and item_id = ?`,
      [data.quantity, data.user_id, data.item_id]
    );
  }

  deleteItem(userId, itemId) {
    return this.database.query(
      `delete from ${this.table} where user_id = ? and item_id = ?`,
      [userId, itemId]
    );
  }
}

module.exports = CartsManager;
