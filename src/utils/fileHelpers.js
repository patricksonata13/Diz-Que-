import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '../../data/videos.json');

export const readData = () => {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      return { videos: [], proximoId: 1 };
    }
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados:', error);
    return { videos: [], proximoId: 1 };
  }
};

export const saveData = (data) => {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    return false;
  }
};
