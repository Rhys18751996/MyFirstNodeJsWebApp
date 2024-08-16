import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json("This is a json status code for the users api");
});

export default router;