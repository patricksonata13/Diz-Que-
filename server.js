import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import novelasRoutes from './routes/novelas.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/api/novelas', novelasRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`📖 Diz-Que-App rodando em http://localhost:${PORT}`);
});
app.listen(PORT, () => {
  console.log(`📖 Diz-Que-App rodando em http://localhost:${PORT}`);
});

