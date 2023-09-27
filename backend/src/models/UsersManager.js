const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, email, hpassword, role_id, cart_id) values (?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.hpassword,
        user.role_id,
        user.cart_id,
      ]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, hpassword = ? where id = ?`,
      [user.firstname, user.lastname, user.hpassword, user.id]
    );
  }
}

module.exports = UsersManager;
