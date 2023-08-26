-- roles table --
CREATE TABLE roles (
  id int(5) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO roles (name) VALUES ('user'), ('admin');

-- users table --
CREATE TABLE users (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  hpassword varchar(255) NOT NULL,
  role_id int(5) NOT NULL, FOREIGN KEY (role_id) REFERENCES roles(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


 -- items table --
CREATE TABLE items (
id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
type varchar(255) NOT NULL,
name varchar(255) NOT NULL,
material varchar(255) NOT NULL,
quantity int(11) NOT NULL,
reference varchar(255) UNIQUE NOT NULL,
color varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

 -- carts table --
CREATE TABLE carts (
  id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  total_price varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

 -- items_carts table --
CREATE TABLE items_carts (
  items_id int(11), FOREIGN KEY (items_id) REFERENCES items(id),
  carts_id int(11), FOREIGN KEY (carts_id) REFERENCES carts(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;