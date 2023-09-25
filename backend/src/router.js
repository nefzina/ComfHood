const express = require("express");
const multer = require("multer");
const uploadFile = require("./services/uploadFile");

const router = express.Router();

const clothesControllers = require("./controllers/itemsControllers");
const typesControllers = require("./controllers/typesControllers");
const usersControllers = require("./controllers/usersControllers");
const cartsControllers = require("./controllers/cartsControllers");

router.get("/clothes", clothesControllers.browse);
router.get("/clothes/:id", clothesControllers.read);
router.put("/clothes/:id", clothesControllers.edit);
router.post("/clothes", clothesControllers.add);
router.delete("/clothes/:id", clothesControllers.destroy);

router.get("/types", typesControllers.browse);
// router.get("/types/:id", typesControllers.read);
router.put("/types/:id", typesControllers.edit);
router.post("/types", typesControllers.add);
router.delete("/types/:id", typesControllers.destroy);

const upload = multer({ dest: "./public/uploads" });
router.post("/photos", upload.single("photo"), uploadFile.uploadFile);

router.get("/users", usersControllers.browse);
router.get("/users/:id", usersControllers.read);
router.put("/users/:id", usersControllers.edit);
router.post("/users", usersControllers.add);
router.delete("/users/:id", usersControllers.destroy);

router.get("/carts/:id", cartsControllers.read);
router.put("/carts/:id", cartsControllers.edit);
router.post("/carts", cartsControllers.add);
router.delete("/carts/:id", cartsControllers.destroy);

module.exports = router;
