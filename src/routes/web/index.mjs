import express from "express";
import homeRoutes from "./homeRoutes.mjs";
import userRoutes from "./userRoutes.mjs";

const router = express.Router();

router.use("/", homeRoutes);
router.use("/user", userRoutes);

export default router;
