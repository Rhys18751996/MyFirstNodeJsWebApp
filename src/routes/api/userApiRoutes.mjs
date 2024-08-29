import express from "express";
import * as controller from '../../Controllers/userApiController.mjs';

const router = express.Router();

router.get("/", (req, res) => {
    res.json("This is a json status code for the users api");
});

router.get('/GetUsers', controller.getAllUsers);
router.get("/getUser/:id", controller.getUser);
router.get("/getRoles", controller.getAllRoles)

export default router;