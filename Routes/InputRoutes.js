const express = require("express");
const multer = require("multer");
const inputController = require("../Controller/InputController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Input APIs
router.post("/offer", inputController.saveOffer);
router.post("/leads/upload", upload.single("file"), inputController.uploadLeads);

module.exports = router;
