const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const models = require("../models");

const login = (req, res) => {
  const { email, password } = req.body;

  models.auth
    .findUserByEmail(email)
    .then(([[user]]) => {
      if (user == null) {
        res.status(401).json({ message: "Invalid credentials." });
      } else {
        argon2
          .verify(user.hpassword, password)
          .then((match) => {
            if (!match)
              res.status(401).json({ message: "Invalid credentials." });
            else {
              const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
              });
              const currentUser = user;
              delete currentUser.hpassword;
              res.status(200).send({ currentUser, token });
            }
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  login,
};
