const feed = document.getElementById("feed");

async function loadVideos() {
  const res = await fetch("/api/videos");
  const data = await res.json();

  data.data.forEach(video => {
    video.capitulos.forEach(cap => {
      const container = document.createElement("div");
      container.className = "video-container";

      container.innerHTML = `
        <video src="${cap.url}" muted loop></video>
        <div class="overlay">
          <h3>${video.titulo} - ${cap.titulo}</h3>
          <button class="like-btn"><i class="fa fa-heart"></i> ${cap.likes}</button>
        </div>
      `;

      const videoEl = container.querySelector("video");
      const likeBtn = container.querySelector(".like-btn");

      // Curtir vídeo
      likeBtn.addEventListener("click", async () => {
        const res = await fetch(`/api/videos/${video.id}/capitulo/${cap.id}/like`, { method: "POST" });
        const data = await res.json();
        likeBtn.innerHTML = `<i class="fa fa-heart"></i> ${data.data.likes}`;
      });

      feed.appendChild(container);
    });
  });

  initAutoplay();
}

// Autoplay conforme o scroll
function initAutoplay() {
  const videos = document.querySelectorAll("video");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.6 });

  videos.forEach(video => observer.observe(video));
}

loadVideos();
