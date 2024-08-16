import express from "express";
import * as controller from "../../controllers/userController.mjs";
const router = express.Router();

router.get("/", controller.index);
router.get("/register", controller.register);
router.get("/getUser/:id", controller.getUser);
router.get("/searchUser", controller.searchUser); //http://localhost:3000/user/searchUser?q=something

export default router;