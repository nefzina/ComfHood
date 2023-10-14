const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  findUser(id) {
    return this.database.query(
      `select firstname, lastname, email from ${this.table} where id = ?`,
      [id]
    );
  }

  findAllUsers() {
    return this.database.query(
      `select firstname, lastname, email from ${this.table}`
    );
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, email, hpassword) values (?, ?, ?, ?)`,
      [user.firstname, user.lastname, user.email, user.hpassword]
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
