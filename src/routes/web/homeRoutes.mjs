import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    console.log("the home/index route was called");
    res.render("home/");
});

router.get("/home", (req, res) => {
    console.log("the home/home route was called");
    res.render("home/home");
});

export default router;
