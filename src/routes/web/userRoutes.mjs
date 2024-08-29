import express from "express";
import * as controller from "../../controllers/userController.mjs";

const router = express.Router();

router.get("/", controller.index);

router.get("/register", controller.register);
router.post("/register", controller.registerUser);

router.get("/searchUser", controller.searchUser); //http://localhost:3000/user/searchUser?q=something

router.delete("/deleteUser", controller.deleteUser);

router.get("/login", controller.login);
router.post("/login", controller.login);

router.get("/createTestUser", controller.createTestUser);

export default router;