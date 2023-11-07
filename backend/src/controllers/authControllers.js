const argon2 = require("argon2");
const models = require("../models");

const login = (req, res) => {
  const { email, password } = req.body;

  models.auth
    .findUserByEmail(email)
    .then(([[user]]) => {
      if (user == null) {
        res.status(404).json({ message: "Email or password does not match" });
      } else {
        argon2
          .verify(user.hpassword, password)
          .then((match) => {
            if (!match)
              res
                .status(404)
                .json({ message: "Email or password does not match" });
            else {
              const currentUser = user;
              delete currentUser.hpassword;
              res.status(200).send(currentUser);
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
