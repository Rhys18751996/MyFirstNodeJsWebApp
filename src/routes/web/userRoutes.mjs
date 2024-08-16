import express from "express";
const router = express.Router();

import * as controller from "../../controllers/userController.mjs";

router.get("/", (req, res) => {
    controller.index(req, res)
});

router.get("/getUser/:id", (req, res) => {
    controller.getUser(req, res);
});

// Define a route which goes to userController and uses its index method
//router.get("/user/:id", indexx);

export default router;