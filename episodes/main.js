document.addEventListener('DOMContentLoaded', () => {
  const loadingSpinner = document.querySelector('.loading-spinner');
  const container = document.getElementById('episode-detail');

  setTimeout(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const episodeId = urlParams.get('episodeId');

    if (episodeId) {
      fetch('episodes/' + episodeId + '.json')
        .then(res => res.json())
        .then(data => {
          loadingSpinner.style.display = 'none';
          document.body.classList.add('loaded');

          // العنوان الرئيسي والتاريخ من أول عنصر
          const title = document.createElement('h1');
          title.className = 'detail-title';
          title.textContent = data[0].main_title || 'عنوان غير متوفر';
          container.appendChild(title);

          const date = document.createElement('p');
          date.className = 'detail-date';
          date.textContent = data[0].date || '';
          container.appendChild(date);

          const content = document.createElement('div');
          content.className = 'detail-content';

          // باقي العناصر
          data.slice(1).forEach(section => {
            if (!section.title || !section.body) return;

            const secTitle = document.createElement('h3');
            secTitle.textContent = section.title;
            content.appendChild(secTitle);

            // تحويل النص إلى HTML مع دعم تنسيق الروابط
            let bodyHTML = section.body.replace(/\n/g, '<br>');

            // دعم التنسيق: /sنص/e /aرابط/o
            const linkPattern = /\/s(.*?)\/e\s*\/a(.*?)\/o/g;
            bodyHTML = bodyHTML.replace(linkPattern, (_, linkText, linkHref) => {
              return `<a href="${linkHref.trim()}" target="_blank" style="color: var(--primary-color); text-decoration: underline;">${linkText.trim()}</a>`;
            });

            const paragraph = document.createElement('p');
            paragraph.innerHTML = bodyHTML;
            content.appendChild(paragraph);

            // صورة
            if (section.image) {
              const img = document.createElement('img');
              img.src = section.image;
              img.alt = section.title;
              img.className = 'section-image';
              content.appendChild(img);
            }

            // فيديو
            if (section.video) {
              const video = document.createElement('video');
              video.src = section.video;
              video.controls = true;
              video.className = 'section-video';
              content.appendChild(video);
            }

            // صوت
            if (section.audio) {
              const audio = document.createElement('audio');
              audio.src = section.audio;
              audio.controls = true;
              audio.className = 'section-audio';
              content.appendChild(audio);
            }

            // رابط خارجي مباشر
            if (section.link) {
              const link = document.createElement('a');
              link.href = section.link;
              link.textContent = section.linkText || 'رابط خارجي';
              link.target = "_blank";
              link.className = 'section-link';
              content.appendChild(link);
            }
          });

          container.appendChild(content);

          const backBtn = document.createElement('a');
          backBtn.href = '../index.html';
          backBtn.className = 'back-button';
          backBtn.textContent = 'العودة للرئيسية ← ';
          container.appendChild(backBtn);
        })
        .catch(error => {
          loadingSpinner.style.display = 'none';
          const errorMessage = document.createElement('p');
          errorMessage.textContent = 'فشل تحميل المحتوى 😢';
          errorMessage.style = "text-align: center; margin-top: 2rem; color: red;";
          container.appendChild(errorMessage);
          console.error("Error loading JSON:", error);
        });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'رقم الحلقة غير صحيح أو مفقود!',
        confirmButtonText: 'العودة للرئيسية'
      }).then(() => {
        window.location.href = '../index.html';
      });

    }
  }, 1000);
});
