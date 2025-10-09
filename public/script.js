const feed = document.getElementById("feed");

async function loadVideos() {
  const res = await fetch("/api/videos");
  const data = await res.json();
  data.data.forEach(video => {
    video.capitulos.forEach(cap => {
      const container = document.createElement("div");
      container.className = "video-container";
      container.innerHTML = `
        <h3>${video.titulo} - ${cap.titulo}</h3>
        <video src="${cap.url}" controls width="300"></video>
        <button onclick="like(${video.id}, ${cap.id})">❤️ ${cap.likes}</button>
      `;
      feed.appendChild(container);
    });
  });
}

async function like(videoId, capId) {
  const res = await fetch(`/api/videos/${videoId}/capitulo/${capId}/like`, { method: "POST" });
  const data = await res.json();
  alert(`Curtidas: ${data.data.likes}`);
  feed.innerHTML = "";
  loadVideos();
}

loadVideos();
