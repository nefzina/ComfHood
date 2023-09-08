const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (req, res) => {
  const { originalname } = req.file;
  const { filename } = req.file;
  const newName = `${uuidv4()}-${originalname}`;

  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${newName}`,
    (err) => {
      if (err) throw err;
      res.status(201).send(newName);
    }
  );
};

module.exports = { uploadFile };
