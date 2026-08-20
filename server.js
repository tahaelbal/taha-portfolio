import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatHandler from "./api/chat/route.js";

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/chat", chatHandler);

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log(`Chat backend listening on http://localhost:${port}`);
});
