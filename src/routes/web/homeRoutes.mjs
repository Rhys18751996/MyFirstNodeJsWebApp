import express from "express";
import * as controller from "../../controllers/homeController.mjs";

const router = express.Router();

router.get("/", (req, res) => {
    controller.index(req, res);
});

router.get("/home", (req, res) => {
    controller.home(req, res);
});

export default router;
