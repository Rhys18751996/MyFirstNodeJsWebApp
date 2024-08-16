var express = require("express");

var router = express.Router();

router.use("/", require("./homeRoutes"));
router.use("/", require("./userRoutes"));

module.exports = router;
