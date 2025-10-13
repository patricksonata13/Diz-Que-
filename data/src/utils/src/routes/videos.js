import express from "express";
import { readData, saveData } from "../utils/fileHelpers.js";

const router = express.Router();

// Listar todos os vídeos
router.get("/", (req, res) => {
  const { videos } = readData();
  res.json({ success: true, data: videos, total: videos.length });
});

// Buscar vídeo por ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { videos } = readData();
  const video = videos.find(v => v.id === id);
  if (!video) return res.status(404).json({ success: false, error: "Vídeo não encontrado" });
  res.json({ success: true, data: video });
});

// Dar like em um capítulo
router.post("/:id/capitulo/:capId/like", (req, res) => {
  const id = parseInt(req.params.id);
  const capId = parseInt(req.params.capId);
  const data = readData();
  const video = data.videos.find(v => v.id === id);
  if (!video) return res.status(404).json({ success: false, error: "Vídeo não encontrado" });

  const cap = video.capitulos.find(c => c.id === capId);
  if (!cap) return res.status(404).json({ success: false, error: "Capítulo não encontrado" });

  cap.likes++;
  saveData(data);
  res.json({ success: true, data: { likes: cap.likes } });
});

export default router;
