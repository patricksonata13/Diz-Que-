const fs = require('fs');
const data = require('./data/videos.json');

// Mapeamento das capas
const capaMapping = {
  4: "capa1.jpg",  // O Matuto
  5: "capa2.jpg",  // Costa Verde
  6: "capa3.jpg",  // Viaduto
  7: "capa4.jpg",  // Varre Sai
  8: "capa5.jpg",  // Um Verão em Arraial
  9: "capa6.jpg"   // Teu Samba
};

// Adicionar as 3 novelas que faltam
const novasNovelas = [
  {
    id: 10,
    titulo: "Letra 7",
    descricao: "Um grupo de mulheres se envolve em golpes e estelionatos, navegando entre riscos, estratégias e a vida no submundo da cidade.",
    autor: "Anônimo",
    categoria: "Suspense",
    localizacao: { bairro: "Centro", pontoTuristico: "" },
    capa: "capa7.jpg",
    capitulos: [],
    likes: 0,
    views: 0,
    dataCriacao: new Date().toISOString(),
    dataAtualizacao: new Date().toISOString()
  },
  {
    id: 11,
    titulo: "Ô Postinho", 
    descricao: "Comédia em formato mockumentary dentro de um posto de saúde de favela.",
    autor: "Anônimo",
    categoria: "Comédia",
    localizacao: { bairro: "Favela", pontoTuristico: "" },
    capa: "capa8.jpg",
    capitulos: [],
    likes: 0,
    views: 0,
    dataCriacao: new Date().toISOString(),
    dataAtualizacao: new Date().toISOString()
  },
  {
    id: 12, 
    titulo: "Império de Pedra",
    descricao: "Homem do Vidigal constrói império de mármore e lida com conflitos familiares no Leblon.",
    autor: "Anônimo",
    categoria: "Drama Familiar",
    localizacao: { bairro: "Leblon/Vidigal", pontoTuristico: "" },
    capa: "capa9.jpg",
    capitulos: [],
    likes: 0,
    views: 0,
    dataCriacao: new Date().toISOString(),
    dataAtualizacao: new Date().toISOString()
  }
];

// Atualizar capas das novelas existentes
data.videos.forEach(video => {
  if (capaMapping[video.id]) {
    video.capa = capaMapping[video.id];
  }
});

// Adicionar novas novelas
data.videos = [...data.videos, ...novasNovelas];
data.proximoId = 13;

// Salvar arquivo atualizado
fs.writeFileSync('./data/videos.json', JSON.stringify(data, null, 2));
console.log('✅ Novelas atualizadas com sucesso!');
console.log('📊 Total de novelas:', data.videos.length);
