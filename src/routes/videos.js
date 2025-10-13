import express from 'express';
import { readData, saveData } from '../utils/fileHelpers.js';

const router = express.Router();

// GET - Listar todas as novelas (fofocas)
router.get('/', (req, res) => {
  try {
    const { categoria, bairro } = req.query;
    let { videos } = readData();

    // Filtro por categoria
    if (categoria) {
      videos = videos.filter(n => 
        n.categoria.toLowerCase().includes(categoria.toLowerCase())
      );
    }

    // Filtro por bairro
    if (bairro) {
      videos = videos.filter(n => 
        n.localizacao.bairro.toLowerCase().includes(bairro.toLowerCase())
      );
    }

    res.json({ 
      success: true, 
      data: videos, 
      total: videos.length,
      message: 'Diz aí, qual fofoca você quer ver? 🎭'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Aí deu ruim! Tenta de novo aí...' 
    });
  }
});

// POST - Criar nova fofoca
router.post('/', (req, res) => {
  try {
    const { titulo, descricao, autor, categoria, bairro } = req.body;
    
    if (!titulo) {
      return res.status(400).json({
        success: false,
        error: 'Cadê o título da fofoca? 😅'
      });
    }
    
    const data = readData();
    const novaNovela = {
      id: data.proximoId,
      titulo,
      descricao: descricao || 'Essa fofoca tá quente...',
      autor: autor || 'Anônimo',
      categoria: categoria || 'Geral',
      localizacao: {
        bairro: bairro || 'Rio de Janeiro',
        pontoTuristico: ''
      },
      capitulos: [],
      likes: 0,
      views: 0,
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString()
    };
    
    data.videos.push(novaNovela);
    data.proximoId++;
    saveData(data);
    
    res.status(201).json({
      success: true,
      data: novaNovela,
      message: 'Fofoca criada! Agora todo mundo vai saber... 😏'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Não deu pra espalhar a fofoca...' 
    });
  }
});

// POST - Curtir fofoca
router.post('/:id/like', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = readData();
    const novela = data.videos.find(n => n.id === id);
    
    if (novela) {
      novela.likes++;
      novela.dataAtualizacao = new Date().toISOString();
      saveData(data);
      res.json({
        success: true,
        data: { likes: novela.likes },
        message: 'Essa fofoca é boa mesmo! ❤️'
      });
    } else {
      res.status(404).json({ 
        success: false, 
        error: 'Fofoca não encontrada... sumiu!' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Não deu pra curtir a fofoca...' 
    });
  }
});

export default router;
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFile = path.join(__dirname, '../../data/videos.json');

function lerDados() {
    const json = fs.readFileSync(dataFile);
    return JSON.parse(json);
}

function salvarDados(dados) {
    fs.writeFileSync(dataFile, JSON.stringify(dados, null, 2));
}

router.get('/', (req, res) => {
    const dados = lerDados();
    res.json(dados.videos);
});

router.get('/:id', (req, res) => {
    const dados = lerDados();
    const video = dados.videos.find(v => v.id === 
parseInt(req.params.id));
    if (video) res.json(video);
    else res.status(404).json({ error: "Vídeo não encontrado" });
});

router.post('/', (req, res) => {
    const dados = lerDados();
    const { titulo, descricao, url, capa } = req.body;
    const novoVideo = {
        id: dados.proximoId++,
        titulo,
        descricao,
        url,
        capa,
        capitulos: [],
        likes: 0,
        views: 0,
        dataCriacao: new Date(),
        dataAtualizacao: new Date()
    };
    dados.videos.push(novoVideo);
    salvarDados(dados);
    res.status(201).json(novoVideo);
});

router.put('/:id', (req, res) => {
    const dados = lerDados();
    const video = dados.videos.find(v => v.id === 
parseInt(req.params.id));
    if (!video) return res.status(404).json({ error: "Vídeo não 
encontrado" });

    const { titulo, descricao, url, capa } = req.body;
    if (titulo) video.titulo = titulo;
    if (descricao) video.descricao = descricao;
    if (url) video.url = url;
    if (capa) video.capa = capa;
    video.dataAtualizacao = new Date();

    salvarDados(dados);
    res.json(video);
});

router.delete('/:id', (req, res) => {
    const dados = lerDados();
    const index = dados.videos.findIndex(v => v.id === 
parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Vídeo não 
encontrado" });

    const removido = dados.videos.splice(index, 1)[0];
    salvarDados(dados);
    res.json(removido);
});

module.exports = router;

