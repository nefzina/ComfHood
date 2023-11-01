const AbstractManager = require("./AbstractManager");

class AddressesManager extends AbstractManager {
  constructor() {
    super({ table: "addresses" });
  }

  findAddress(id) {
    return this.database.query(`select * from ${this.table} where id = ?`, [
      id,
    ]);
  }

  insert(address) {
    return this.database.query(
      `insert into ${this.table} (house_number, street_address, appartment, zip_code,
        region, country) values (?, ?, ?, ?, ?, ?)`,
      [
        address.house_number,
        address.street_address,
        address.appartment,
        address.zip_code,
        address.region,
        address.country,
      ]
    );
  }

  update(address) {
    return this.database.query(
      `update ${this.table} set house_number = ?, street_address = ?, appartment = ?, zip_code = ?,
      region = ?, country = ? where id = ?`,
      [
        address.house_number,
        address.street_address,
        address.appartment,
        address.zip_code,
        address.region,
        address.country,
        address.id,
      ]
    );
  }
}

module.exports = AddressesManager;
