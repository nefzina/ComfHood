const express = require("express");
const multer = require("multer");
const uploadFile = require("./services/uploadFile");
const { hashPassword } = require("./services/auth");
const {
  validateFirstname,
  validateLastname,
  validateEmail,
  validatePassword,
  validateAddressId,
} = require("./middlewares/validator");

const router = express.Router();

const itemsControllers = require("./controllers/itemsControllers");
const typesControllers = require("./controllers/typesControllers");
const usersControllers = require("./controllers/usersControllers");
const authControllers = require("./controllers/authControllers");
const cartsControllers = require("./controllers/cartsControllers");
const addressesControllers = require("./controllers/addressesControllers");

router.get("/items", itemsControllers.browse);
router.get("/items/:id", itemsControllers.read);
router.post("/items", itemsControllers.add);
router.put("/items/:id", itemsControllers.edit);
router.delete("/items/:id", itemsControllers.destroy);

router.get("/types", typesControllers.browse);
// router.get("/types/:id", typesControllers.read);
router.post("/types", typesControllers.add);
router.put("/types/:id", typesControllers.edit);
router.delete("/types/:id", typesControllers.destroy);

const upload = multer({ dest: "./public/uploads" });
router.post("/photos", upload.single("photo"), uploadFile.uploadFile);

router.get("/users", usersControllers.browse);
router.get("/users/:id", usersControllers.read);
router.post(
  "/users",
  validateFirstname,
  validateLastname,
  validateEmail,
  validatePassword,
  hashPassword,
  usersControllers.add
);

router.put(
  "/users/:id/firstname",
  validateFirstname,
  usersControllers.editFirstname
);
router.put(
  "/users/:id/lastname",
  validateLastname,
  usersControllers.editLastname
);
router.put(
  "/users/:id/password",
  validatePassword,
  hashPassword,
  usersControllers.editPassword
);
router.put(
  "/users/:id/addressId",
  validateAddressId,
  usersControllers.editAddressId
);

router.delete("/users/:id", usersControllers.destroy);

router.post("/login", validateEmail, validatePassword, authControllers.login);

router.get("/carts/:id", cartsControllers.read);
// router.put("/carts/:id", cartsControllers.edit);
router.post("/carts", cartsControllers.add);
router.delete("/carts/:id", cartsControllers.destroy);

router.get("/addresses/:id", addressesControllers.read);
router.post("/addresses", addressesControllers.add);
router.put("/addresses/:id", addressesControllers.edit);
router.delete("/addresses/:id", addressesControllers.destroy);

module.exports = router;
