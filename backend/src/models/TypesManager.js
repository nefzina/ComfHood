const AbstractManager = require("./AbstractManager");

class TypesManager extends AbstractManager {
  constructor() {
    super({ table: "types" });
  }

  insert(type) {
    return this.database.query(`insert into ${this.table} (type) values (?)`, [
      type,
    ]);
  }

  update(type) {
    return this.database.query(
      `update ${this.table} set type = ? where id = ?`,
      [type.type, type.id]
    );
  }
}

module.exports = TypesManager;
