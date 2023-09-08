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

-- types table --
CREATE TABLE types (
id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
type varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO types (type) VALUES ('Hoodies'), ('T-shirts');

 -- clothes table --
CREATE TABLE clothes (
id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
type_id int NOT NULL, FOREIGN KEY (type_id) REFERENCES types(id),
name varchar(255) NOT NULL,
material varchar(255) NOT NULL,
quantity int(11) NOT NULL,
color varchar(255) NOT NULL,
description varchar(255),
photo varchar(255) DEFAULT '/assets/images/tailoring.jpg',
isPublic TINYINT(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

 -- carts table --
CREATE TABLE carts (
  id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  total_price varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

 -- clothes_carts table --
CREATE TABLE clothes_carts (
  clothes_id int(11), FOREIGN KEY (clothes_id) REFERENCES clothes(id),
  carts_id int(11), FOREIGN KEY (carts_id) REFERENCES carts(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;