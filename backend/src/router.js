const express = require("express");
const multer = require("multer");
const uploadFile = require("./services/uploadFile");

const router = express.Router();

const clothesControllers = require("./controllers/clothesControllers");
const typesControllers = require("./controllers/typesControllers");

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

module.exports = router;
