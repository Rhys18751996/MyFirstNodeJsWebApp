import express from "express";
const router = express.Router();

import { indexx, getUser } from "../../controllers/userController.mjs";


router.get("/", (req, res) => {
    console.log("userRoute fired");
    res.render("user/");
    //indexx(req, res)
});

router.get("/user", (req, res) => {
    console.log("the user/user route was called");
    res.render("user/user");
});

// Define a route which goes to userController and uses its index method
//router.get("/user/:id", indexx);

export default router;