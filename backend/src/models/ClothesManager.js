const AbstractManager = require("./AbstractManager");

class ClothesManager extends AbstractManager {
  constructor() {
    super({ table: "clothes" });
  }

  insert(article) {
    if (article.photo)
      return this.database.query(
        `insert into ${this.table} (type_id, name, material, quantity, color, description, photo, isPublic) values (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          article.typeId,
          article.name,
          article.material,
          article.quantity,
          article.color,
          article.description,
          article.photo,
          article.isPublic,
        ]
      );

    return this.database.query(
      `insert into ${this.table} (type_id, name, material, quantity, color, description, isPublic) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        article.typeId,
        article.name,
        article.material,
        article.quantity,
        article.color,
        article.description,
        article.isPublic,
      ]
    );
  }

  update(article) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [article.title, article.id]
    );
  }
}

module.exports = ClothesManager;
