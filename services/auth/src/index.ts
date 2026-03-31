import express from "express";
import dotenv from "dotenv";
import log from "./utils/logger.js";
import connectDB from "./config/db.js";
import router from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth", router);

app.listen(PORT, () => {
  log.info(`Auth Service started at ${PORT}`);
  connectDB();
});
