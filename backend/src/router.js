const express = require("express");
const multer = require("multer");
const uploadFile = require("./services/uploadFile");
const { hashPassword } = require("./services/auth");
const { validateUser, validateLogin } = require("./middlewares/validator");

const router = express.Router();

const itemsControllers = require("./controllers/itemsControllers");
const typesControllers = require("./controllers/typesControllers");
const usersControllers = require("./controllers/usersControllers");
const authControllers = require("./controllers/authControllers");
const cartsControllers = require("./controllers/cartsControllers");

router.get("/items", itemsControllers.browse);
router.get("/items/:id", itemsControllers.read);
router.put("/items/:id", itemsControllers.edit);
router.post("/items", itemsControllers.add);
router.delete("/items/:id", itemsControllers.destroy);

router.get("/types", typesControllers.browse);
// router.get("/types/:id", typesControllers.read);
router.put("/types/:id", typesControllers.edit);
router.post("/types", typesControllers.add);
router.delete("/types/:id", typesControllers.destroy);

const upload = multer({ dest: "./public/uploads" });
router.post("/photos", upload.single("photo"), uploadFile.uploadFile);

router.get("/users", usersControllers.browse);
router.get("/users/:id", usersControllers.read);
router.put("/users/:id", validateUser, hashPassword, usersControllers.edit);
router.post("/users", validateUser, hashPassword, usersControllers.add);
router.delete("/users/:id", usersControllers.destroy);

router.post("/login", validateLogin, authControllers.login);

router.get("/carts/:id", cartsControllers.read);
// router.put("/carts/:id", cartsControllers.edit);
router.post("/carts", cartsControllers.add);
router.delete("/carts/:id", cartsControllers.destroy);

module.exports = router;
