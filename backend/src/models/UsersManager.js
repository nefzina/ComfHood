const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  findUser(id) {
    return this.database.query(
      `select firstname, lastname, email, address_id from ${this.table} where id = ?`,
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

  updateFirstname(firstname, id) {
    return this.database.query(
      `update ${this.table} set firstname = ? where id = ?`,
      [firstname, id]
    );
  }

  updateLastname(lastname, id) {
    return this.database.query(
      `update ${this.table} set lastname = ? where id = ?`,
      [lastname, id]
    );
  }

  updatePassword(hpassword, id) {
    return this.database.query(
      `update ${this.table} set hpassword = ? where id = ?`,
      [hpassword, id]
    );
  }

  updateAddress(addressId, id) {
    return this.database.query(
      `update ${this.table} set address_id = ? where id = ?`,
      [addressId, id]
    );
  }
}

module.exports = UsersManager;
