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
  console.log(episodes);

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

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  // إبقاء الـ spinner ظاهرًا 1 ثانية
  setTimeout(() => {
    document.body.classList.add('loaded');

    const spinner = document.querySelector('.loading-spinner');
    if (spinner) spinner.style.display = 'none';

    // لو فيه أنيميشن أبواب
    document.querySelectorAll('.door').forEach(door => {
      door.classList.add('open');
    });

    setTimeout(() => {
      document.querySelectorAll('.door').forEach(door => {
        door.style.display = 'none';
      });
    }, 1000);

    // تحميل الحلقات بعد انتهاء التحميل
    fetchEpisodes();
  }, 1000);
});
