const AbstractManager = require("./AbstractManager");

class ClothesManager extends AbstractManager {
  constructor() {
    super({ table: "items" });
  }

  insert(item) {
    if (item.photo)
      return this.database.query(
        `insert into ${this.table} (type_id, name, material, stock_quantity, color, description, photo, isPublic, price) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.typeId,
          item.name,
          item.material,
          item.quantity,
          item.color,
          item.description,
          item.photo,
          item.isPublic,
          item.price,
        ]
      );

    return this.database.query(
      `insert into ${this.table} (type_id, name, material, stock_quantity, color, description, isPublic, price) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item.typeId,
        item.name,
        item.material,
        item.quantity,
        item.color,
        item.description,
        item.isPublic,
        item.price,
      ]
    );
  }

  update(item) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }
}

module.exports = ClothesManager;
