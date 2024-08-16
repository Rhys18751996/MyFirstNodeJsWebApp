import express from "express";
import { indexx, getUser } from "../../controllers/userController.mjs";

const router = express.Router();

router.get("/", (req, res) => {
    console.log("userRoute fired");
    indexx(req, res)
});

// Define a route which goes to userController and uses its index method
router.get("/user/:id", indexx);

export default router;