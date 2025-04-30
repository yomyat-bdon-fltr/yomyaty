// وظيفة لتحميل الحلقات من JSON
function fetchEpisodes() {
  fetch('data/episodes.json')
    .then(response => response.json())
    .then(data => {
      const episodes = data.episodes;
      displayEpisodes(episodes);
    })
    .catch(error => {
      console.error('Error fetching episodes:', error);
      const episodesList = document.getElementById('episodes-list');
      episodesList.innerHTML = `<p style="color: red; text-align: center;">فشل تحميل الحلقات. حاول لاحقًا.</p>`;
    });
}

// وظيفة لعرض الحلقات
function displayEpisodes(episodes) {
  const episodesList = document.getElementById('episodes-list');


  episodesList.innerHTML = '';

  episodes.forEach(episode => {
    const card = document.createElement('div');
    card.className = 'episode-card';

    card.innerHTML = `
      <div class="episode-content">
        <h3 class="episode-title">${episode.title}</h3>
        <p class="episode-date">${episode.date}</p>
        <p class="episode-excerpt">${episode.excerpt}</p>
        <a href="episodes/epsoids.html?episodeId=${episode.id}" class="read-more">اقرأ المزيد</a>
      </div>
    `;

    card.addEventListener('click', () => showEpisodeDetail(episode.id));
    episodesList.appendChild(card);
  });
}

// الانتقال إلى صفحة التفاصيل
function showEpisodeDetail(id) {
  location.href = `episodes/epsoids.html?episodeId=${id}`;
}


function showLoadingAnimation() {
  if (sessionStorage.getItem("loaded") === "true") {
    document.querySelector('.circle-div').style.display = 'none';
  }
}

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  showLoadingAnimation(); // ✅ استدعاء الدالة

  setTimeout(() => {
    document.body.classList.add('loaded');
    sessionStorage.setItem("loaded", "true");

    // التعامل مع أنيميشن الدائرة
    const circleDiv = document.querySelector('.circle-div');
    if (circleDiv && sessionStorage.getItem("loaded") !== "true") {
      circleDiv.addEventListener('animationend', () => {
        circleDiv.style.display = 'none';
      });
    }

    // تحميل الحلقات
    fetchEpisodes();
  }, 1000);
});
