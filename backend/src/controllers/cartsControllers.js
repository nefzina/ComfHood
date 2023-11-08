const models = require("../models");

const readByUserId = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  models.carts
    .findByUserId(userId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readByUserItemIds = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const itemId = parseInt(req.params.itemId, 10);

  models.carts
    .findByUserItemIds(userId, itemId)
    .then(([rows]) => {
      if (!rows[0]) {
        res.send({ message: "not found" });
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const edit = (req, res) => {
  const data = req.body;

  models.carts
    .update(data)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const data = req.body;

  models.carts
    .insert(data)
    .then(([result]) => {
      res.location(`/carts/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroyByItemId = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const itemId = parseInt(req.params.itemId, 10);

  models.carts
    .deleteItem(userId, itemId)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  readByUserId,
  readByUserItemIds,
  edit,
  add,
  destroyByItemId,
};
