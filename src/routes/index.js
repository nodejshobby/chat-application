const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const authMiddleware = require("../middlewares/Auth");

router.get("/", authMiddleware.isAuthenticated, indexController.getIndexPage);

router.get(
  "/chat",
  authMiddleware.isAuthenticated,
  indexController.getChatPage
);

module.exports = router;
