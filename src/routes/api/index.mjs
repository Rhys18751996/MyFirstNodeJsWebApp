import express from "express";
import userApiRoutes from "./userApiRoutes.mjs";

const router = express.Router();

router.use("/userApiRoutes", userApiRoutes);

export default router;