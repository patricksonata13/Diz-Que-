import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const DATA_PATH = path.join(process.cwd(), 'data.json');

// Helper para ler dados
const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  } catch (error) {
    return [];
  }
};

// Helper para salvar dados
const saveData = (data) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
};

// GET - Listar todas as novelinhas
router.get('/novelas', (req, res) => {
  const novelas = readData();
  res.json(novelas);
});

// POST - Criar nova novelinha
router.post('/novelas', (req, res) => {
  const { titulo, conteudo, autor, imagem } = req.body;
  const novelas = readData();
  
  const novaNovela = {
    id: novelas.length + 1,
    titulo,
    conteudo,
    autor: autor || "Anônimo",
    imagem: imagem || "/images/default.jpg",
    likes: 0,
    views: 0,
    data: new Date().toISOString()
  };
  
  novelas.push(novaNovela);
  saveData(novelas);
  res.json(novaNovela);
});

// POST - Dar like
router.post('/novelas/:id/like', (req, res) => {
  const id = parseInt(req.params.id);
  const novelas = readData();
  const novela = novelas.find(n => n.id === id);
  
  if (novela) {
    novela.likes++;
    saveData(novelas);
    res.json(novela);
  } else {
    res.status(404).json({ error: 'Novelinha não encontrada' });
  }
});

// POST - Adicionar visualização
router.post('/novelas/:id/view', (req, res) => {
  const id = parseInt(req.params.id);
  const novelas = readData();
  const novela = novelas.find(n => n.id === id);
  
  if (novela) {
    novela.views++;
    saveData(novelas);
    res.json(novela);
  } else {
    res.status(404).json({ error: 'Novelinha não encontrada' });
  }
});

export default router;
