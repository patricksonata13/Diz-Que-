const fs = require('fs');
const data = require('./data/videos.json');

// Mapeamento completo: IDs para títulos e capas corretos
const mapeamento = {
  1: { titulo: "O Matuto", capa: "capa1.jpg" },
  2: { titulo: "Costa Verde", capa: "capa2.jpg" },
  3: { titulo: "Viaduto", capa: "capa3.jpg" },
  4: { titulo: "Varre Sai", capa: "capa4.jpg" },
  5: { titulo: "Um Verão em Arraial", capa: "capa5.jpg" },
  6: { titulo: "Teu Samba", capa: "capa6.jpg" },
  7: { titulo: "Letra 7", capa: "capa7.jpg" },
  8: { titulo: "Ô Postinho", capa: "capa8.jpg" },
  9: { titulo: "Império de Pedra", capa: "capa9.jpg" }
};

// Atualizar cada vídeo com título e descrição corretos
data.videos.forEach(video => {
  if (mapeamento[video.id]) {
    const info = mapeamento[video.id];
    video.titulo = info.titulo;
    video.capa = `/images/capas/${info.capa}`;
    
    // Adicionar descrições básicas
    const descricoes = {
      "O Matuto": "Homem da Cidade de Deus navega entre o crime e a família ao se mudar para a Freguesia.",
      "Costa Verde": "Grupos protetores lutam por segredos ancestrais na região da Costa Verde.",
      "Viaduto": "5 amigos são transportados de um baile charme para a Madureira do tempo da escravidão.",
      "Varre Sai": "A história da criação do distrito de Varre Sai e sua identidade cultural.",
      "Um Verão em Arraial": "Jovens vivem romances e confusões em um verão em Arraial do Cabo.",
      "Teu Samba": "Casais se conhecem em sambas por diferentes regiões do Rio.",
      "Letra 7": "Um grupo de mulheres se envolve em golpes e estelionatos no submundo da cidade.",
      "Ô Postinho": "Comédia em formato mockumentary dentro de um posto de saúde de favela.",
      "Império de Pedra": "Homem do Vidigal constrói império de mármore e lida com conflitos familiares no Leblon."
    };
    
    video.descricao = descricoes[info.titulo] || "Descrição em breve...";
    video.autor = "Anônimo";
    video.categoria = "Drama";
  }
});

// Salvar arquivo atualizado
fs.writeFileSync('./data/videos.json', JSON.stringify(data, null, 2));
console.log('✅ Novelas corrigidas com sucesso!');
console.log('📚 Novelas configuradas:');
data.videos.forEach(video => {
  if (video.id <= 9) {
    console.log(`   ${video.id}. ${video.titulo} → ${video.capa}`);
  }
});
