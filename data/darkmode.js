// darkmode.js

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.createElement('button');
    toggleBtn.innerText = '🌓 الوضع الليلي';
    toggleBtn.id = 'darkModeToggle';
  
    Object.assign(toggleBtn.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '10px 16px',
      fontSize: '14px',
      backgroundColor: '#1e90ff',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      zIndex: 2000,
      direction: "rtl"
    });
  
    document.body.appendChild(toggleBtn);
  
    // Check local storage
    if (localStorage.getItem('dark-mode') === 'enabled') {
      document.body.classList.add('dark-mode');
      toggleBtn.innerText = '🌞 الوضع العادي';
    }
  
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
  
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
        toggleBtn.innerText = '🌞 الوضع العادي';
      } else {
        localStorage.setItem('dark-mode', 'disabled');
        toggleBtn.innerText = '🌓 الوضع الليلي';
      }
    });
  });
  