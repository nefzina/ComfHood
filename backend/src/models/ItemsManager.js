const AbstractManager = require("./AbstractManager");

class ItemsManager extends AbstractManager {
  constructor() {
    super({ table: "items" });
  }

  findPublic() {
    return this.database.query(
      `select * from ${this.table} where isPublic = 1 and stock_quantity > 0`
    );
  }

  insert(item) {
    if (item.photo)
      return this.database.query(
        `insert into ${this.table} (type_id, name, material, stock_quantity, color, description, photo, isPublic, price) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.typeId,
          item.name,
          item.material,
          item.stockQuantity,
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
        item.stockQuantity,
        item.color,
        item.description,
        item.isPublic,
        item.price,
      ]
    );
  }

  update(item) {
    return this.database.query(
      `update ${this.table} set type_id = ?, name = ?, material = ?, stock_quantity = ?, color = ?, description = ?, photo = ?, isPublic = ?, price = ? where id = ?`,
      [
        item.typeId,
        item.name,
        item.material,
        item.stockQuantity,
        item.color,
        item.description,
        item.photo,
        item.isPublic,
        item.price,
        item.id,
      ]
    );
  }

  updateQuantities(item) {
    return this.database.query(
      `update ${this.table} set stock_quantity = ?, sold_quantity = ? where id = ?`,
      [item.stockQuantity, item.soldQuantity, item.id]
    );
  }
}

module.exports = ItemsManager;
