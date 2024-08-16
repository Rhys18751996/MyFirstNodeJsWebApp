import express from "express";
import * as controller from "../../controllers/homeController.mjs";

const router = express.Router();

router.get("/", controller.index);
router.get("/home", controller.home);

export default router;

//examples of post requests
// router.post("/book/create", book_controller.book_create_post);
// router.post("/book/:id/delete", book_controller.book_delete_post);