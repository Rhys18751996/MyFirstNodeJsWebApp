var express = require("express");
var router = express.Router();

const userController = require('../controllers/userController');

router.get("/", function(req, res) {
    console.log("User route just fired.");
 res.render("user/");
 });

// Define a route for getting user information
router.get('/user/:id', userController.getUser);

module.exports = router;