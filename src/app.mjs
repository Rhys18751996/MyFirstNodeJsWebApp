import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import webRoutes from "./routes/web/index.mjs";
import apiRoutes from "./routes/api/index.mjs";
import { syncUserDb } from "./models/User.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", webRoutes);
app.use("/api", apiRoutes);

app.listen(app.get("port"), () => {
    console.log(`Server started on port ${app.get("port")}\n`);
});

syncUserDb(); // this creates the users database

