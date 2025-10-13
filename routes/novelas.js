import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const DATA_PATH = path.join(process.cwd(), 'data.json');

const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  } catch {
    return [];
  }
};

const saveData = (data) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
};

// GET - Listar todas as novelinhas
router.get('/', (req, res) => {
  const data = readData();
  res.json(data);
});

// POST - Criar uma nova novelinha
router.post('/', (req, res) => {
  const data = readData();
  const novaNovela = {
    id: Date.now(),
    titulo: req.body.titulo || 'Sem título',
    conteudo: req.body.conteudo || '',
    autor: req.body.autor || 'Anônimo',
    likes: 0,
    views: 0,
    data: new Date().toISOString()
  };
  data.push(novaNovela);
  saveData(data);
  res.status(201).json(novaNovela);
});

// POST - Curtir uma novelinha
router.post('/:id/like', (req, res) => {
  const data = readData();
  const novela = data.find(n => n.id === parseInt(req.params.id));
  if (novela) {
    novela.likes += 1;
    saveData(data);
    res.json({ likes: novela.likes });
  } else {
    res.status(404).json({ error: 'Novelinha não encontrada' });
  }
});

// POST - Contabilizar visualização
router.post('/:id/view', (req, res) => {
  const data = readData();
  const novela = data.find(n => n.id === parseInt(req.params.id));
  if (novela) {
    novela.views += 1;
    saveData(data);
    res.json({ views: novela.views });
  } else {
    res.status(404).json({ error: 'Novelinha não encontrada' });
  }
});

export default router;

