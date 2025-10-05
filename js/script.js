const sidebar = document.getElementById('sidebar');
const toggleTheme = document.getElementById('theme-toggle');
const collapseBtn = document.querySelector('.toggle-sidebar');
const collapseIcon = document.getElementById('collapse-icon');

toggleTheme.addEventListener('change', () => {
  sidebar.classList.toggle('dark');
  document.body.classList.toggle('dark');
});

collapseBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  if(sidebar.classList.contains('collapsed')) {
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
  if(/首页|Home/.test(text)) target = 'home-section';
  else if(/项目/.test(text)) target = 'projects-section';
  else if(/联系方式/.test(text)) target = 'contact-section';
  else if(/成就/.test(text)) target = 'achievements-section';

  if(target) {
    item.addEventListener('click', () => {
      document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const el = document.getElementById(target);
      if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});
