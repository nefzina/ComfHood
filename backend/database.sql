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
  role_id int(5) NOT NULL DEFAULT 1, FOREIGN KEY (role_id) REFERENCES roles(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO users (firstname, lastname, email, hpassword, role_id) VALUES
("first", "visitor", "visitor@mail.com ", "$argon2id$v=19$m=65536,t=5,p=1$7ZWpaTY9eIv+zChdo6bj1A$3bMjdfo1iY8NRzLnnTEVkNQokxQ0kdKhp9sCOqduIzA", 1),
("Koukie ", "Dough ", "cookie@mail.com", "$argon2id$v=19$m=65536,t=5,p=1$3/eCgecXfcEqbq8KHNPpmg$zbyxJvBNBSLD7iCUzqji09J/7S8C6h2jZKlAVc+0s8M", 1),
("lilac", "flower", "lilac@mail.com", "$argon2id$v=19$m=65536,t=5,p=1$al5PkvjEtY0hpu2jhw1iEQ$hEb/onodTxwUVAbMKAk9vm26tYktN/8I4HjR2tyHed8", 2);

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
  user_id int(11) UNSIGNED, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;