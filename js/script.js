const sidebar = document.getElementById('sidebar');
const toggleTheme = document.getElementById('theme-toggle');
const collapseBtn = document.querySelector('.toggle-sidebar');
const collapseIcon = document.getElementById('collapse-icon');

const toggleThemeContainer = document.querySelector('.toggle-theme');
if (toggleThemeContainer) {
  toggleThemeContainer.addEventListener('click', (e) => {
    if (!toggleTheme) return;
    if (e.target === toggleTheme || e.target.closest('label.switch')) return;
    toggleTheme.checked = !toggleTheme.checked;
    toggleTheme.dispatchEvent(new Event('change', { bubbles: true }));
  });
}

toggleTheme.addEventListener('change', () => {
  sidebar.classList.toggle('dark');
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', toggleTheme.checked ? 'dark' : 'light');
});

collapseBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  if (sidebar.classList.contains('collapsed')) {
    collapseIcon.classList.remove('fa-angle-double-left');
    collapseIcon.classList.add('fa-angle-double-right');
  } else {
    collapseIcon.classList.remove('fa-angle-double-right');
    collapseIcon.classList.add('fa-angle-double-left');
  }
});

document.querySelectorAll('.menu-item').forEach(item => {
  const text = item.textContent.trim();
  let target = null;
  if (/首页|Home/.test(text)) target = 'home-section';
  else if (/项目/.test(text)) target = 'projects-section';
  else if (/联系方式/.test(text)) target = 'contact-section';
  else if (/成就/.test(text)) target = 'achievements-section';

  if (target) {
    item.addEventListener('click', () => {
      document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme');
  let isDarkMode = false;

  if (savedTheme === 'dark') {
    isDarkMode = true;
  } else if (savedTheme === 'light') {
    isDarkMode = false;
  } else {
    isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  if (isDarkMode) {
    toggleTheme.checked = true;
    sidebar.classList.add('dark');
    document.body.classList.add('dark');
  }

  var audio = document.getElementById('bgm');
  var volumeSlider = document.getElementById('volume-slider');

  audio.volume = volumeSlider.value;
    
  volumeSlider.addEventListener('input', function() {
    audio.volume = this.value;
  });
    
  // bind点击事件 用户点击任意位置即可播放bgm
  document.addEventListener('click', function() {
    audio.play();
    document.removeEventListener('click', arguments.callee);
  }, { once: true });
    
  document.addEventListener("WeixinJSBridgeReady", function () {
    audio.play();
  }, false);
});