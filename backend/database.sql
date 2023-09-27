-- roles table --
CREATE TABLE roles (
  id int(5) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO roles (name) VALUES ('user'), ('admin');

-- users table --
CREATE TABLE users (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstname varchar(255) NOT NULL,
  lastname varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  hpassword varchar(255) NOT NULL,
  role_id int(5) NOT NULL, FOREIGN KEY (role_id) REFERENCES roles(id),
  cart_id int(11) NOT NULL, FOREIGN KEY (cart_id) REFERENCES carts(id)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- types table --
CREATE TABLE types (
id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
type varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO types (type) VALUES ('Hoodies'), ('T-shirts');

 -- items table --
CREATE TABLE items (
id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
type_id int NOT NULL, FOREIGN KEY (type_id) REFERENCES types(id),
name varchar(255) NOT NULL,
material varchar(255) NOT NULL,
stock_quantity int(11) NOT NULL,
sold_quantity int(11) DEFAULT 0,
color varchar(255) NOT NULL,
description varchar(255),
photo varchar(255) DEFAULT '/assets/images/tailoring.jpg',
isPublic TINYINT(1) NOT NULL,
price float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

 -- carts table --
CREATE TABLE carts (
  item_id int(11), FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
  user_id int(11), FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;