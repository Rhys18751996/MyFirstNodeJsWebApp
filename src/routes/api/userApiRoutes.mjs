import express from "express";
import * as accountController from '../../controllers/userController.mjs';

const router = express.Router();

router.get("/", (req, res) => {
    res.json("This is a json status code for the users api");
});

router.get('/GetUsers', accountController.getAllUsers);

export default router;