import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import videosRoutes from "./src/routes/videos.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/videos", videosRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Microframas rodando em http://localhost:${PORT}`);
});
