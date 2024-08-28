import express from "express";
import userApiRoutes from "./userApiRoutes.mjs";


const router = express.Router();

router.use("/user", userApiRoutes);

export default router;