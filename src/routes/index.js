const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.getIndexPage);

router.get("/chat", indexController.getChatPage);

module.exports = router;
