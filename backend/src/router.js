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
  verifyToken,
} = require("./middlewares/validator");

const router = express.Router();

const itemsControllers = require("./controllers/itemsControllers");
const typesControllers = require("./controllers/typesControllers");
const usersControllers = require("./controllers/usersControllers");
const authControllers = require("./controllers/authControllers");
const cartsControllers = require("./controllers/cartsControllers");
const addressesControllers = require("./controllers/addressesControllers");

const upload = multer({ dest: "./public/uploads" });
router.post(
  "/photos",
  verifyToken,
  upload.single("photo"),
  uploadFile.uploadFile
);

router.get("/publicItems", itemsControllers.browsePublic);
router.get("/items", verifyToken, itemsControllers.browse);
router.get("/items/:id", itemsControllers.read);
router.post("/items", verifyToken, itemsControllers.add);
router.put("/items/:id", verifyToken, itemsControllers.edit);
router.delete("/items/:id", verifyToken, itemsControllers.destroy);

router.get("/types", typesControllers.browse);
router.post("/types", verifyToken, typesControllers.add);
router.put("/types/:id", verifyToken, typesControllers.edit);
router.delete("/types/:id", verifyToken, typesControllers.destroy);

router.post("/login", validateEmail, validatePassword, authControllers.login);

router.get("/users", verifyToken, usersControllers.browse);
router.get("/users/:id", verifyToken, usersControllers.read);
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
  verifyToken,
  validateFirstname,
  usersControllers.editFirstname
);
router.put(
  "/users/:id/lastname",
  verifyToken,
  validateLastname,
  usersControllers.editLastname
);
router.put(
  "/users/:id/password",
  verifyToken,
  validatePassword,
  hashPassword,
  usersControllers.editPassword
);
router.put(
  "/users/:id/addressId",
  verifyToken,
  validateAddressId,
  usersControllers.editAddressId
);
router.delete("/users/:id", verifyToken, usersControllers.destroy);

router.get("/carts/:id", verifyToken, cartsControllers.readByUserId);
router.get(
  "/carts/:userId/:itemId",
  verifyToken,
  cartsControllers.readByUserItemIds
);
router.post("/carts", verifyToken, cartsControllers.add);
router.put("/carts", verifyToken, cartsControllers.edit);
router.delete(
  "/carts/:userId/:itemId",
  verifyToken,
  cartsControllers.destroyByItemId
);

router.get("/addresses/:id", verifyToken, addressesControllers.read);
router.post("/addresses", verifyToken, addressesControllers.add);
router.put("/addresses/:id", verifyToken, addressesControllers.edit);
router.delete("/addresses/:id", verifyToken, addressesControllers.destroy);

module.exports = router;
