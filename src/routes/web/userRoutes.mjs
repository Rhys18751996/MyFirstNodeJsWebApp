import express from "express";
import * as controller from "../../controllers/userController.mjs";
import passport from "passport";
import profilePictureUpload from '../../middleware/uploadMiddleware.mjs';

const router = express.Router();

router.get("/", controller.index);

router.get("/register", controller.register);
router.post("/register", controller.registerUser);

router.get("/uploadProfileImage", controller.ProfileImagePage);
router.post("/uploadProfileImage", profilePictureUpload.single('profilePicture'), controller.uploadProfileImage);

router.get("/searchUser", controller.searchUser); //http://localhost:3000/user/searchUser?q=something

router.delete("/deleteUser", controller.deleteUser);

router.get("/login", controller.login);
router.post("/submitLogin", passport.authenticate("local"), controller.submitLogin);

router.get("/createTestUser", controller.createTestUser);

export default router;