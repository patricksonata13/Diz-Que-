const feed = document.getElementById("feed");

async function loadVideos() {
    try {
        const res = await fetch("/api/videos");
        const videos = await res.json();
        renderVideos(videos);
    } catch (error) {
        console.error("Erro ao carregar novelas:", error);
        feed.innerHTML = '<div class="error">Erro ao carregar novelas</div>';
    }
}

function renderVideos(videos) {
    feed.innerHTML = '';
    
    videos.forEach(video => {
        const card = document.createElement("div");
        card.className = "video-card";
        
        // Mostrar capítulos se existirem
        const capitulosHTML = video.capitulos && video.capitulos.length > 0 
            ? video.capitulos.map(cap => `
                <div class="episodio" onclick="playVideo('${cap.url}', '${video.titulo} - ${cap.titulo}')">
                    ▶ ${cap.titulo}
                    <span class="stats">👁️ ${cap.views} ❤️ ${cap.likes}</span>
                </div>
            `).join('')
            : '<div class="sem-episodios">Em breve</div>';
        
        card.innerHTML = `
            <div class="video-cover">
                <img src="${video.capa}" alt="${video.titulo}">
            </div>
            <div class="video-info">
                <h3>${video.titulo}</h3>
                <p>${video.descricao}</p>
                <div class="video-meta">
                    <span>📍 ${video.localizacao?.bairro || 'Rio de Janeiro'}</span>
                    <span>🎭 ${video.categoria}</span>
                </div>
                <div class="capitulos">
                    <h4>Episódios:</h4>
                    ${capitulosHTML}
                </div>
            </div>
        `;
        
        feed.appendChild(card);
    });
}

// Função para reproduzir vídeo
function playVideo(videoUrl, titulo) {
    const player = document.createElement('div');
    player.className = 'video-player-overlay';
    player.innerHTML = `
        <div class="video-player">
            <div class="player-header">
                <h3>${titulo}</h3>
                <button onclick="this.parentElement.parentElement.parentElement.remove()">✕</button>
            </div>
            <video controls autoplay>
                <source src="${videoUrl}" type="video/mp4">
                Seu navegador não suporta vídeos.
            </video>
        </div>
    `;
    document.body.appendChild(player);
}

document.addEventListener("DOMContentLoaded", loadVideos);
