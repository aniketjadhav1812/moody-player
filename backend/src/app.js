import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import SongsRoute from "./routes/songs.route.js";
configDotenv();
const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://moody-player-frontend-6pvd.onrender.com/",
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use("/songs",SongsRoute);

export default app;
