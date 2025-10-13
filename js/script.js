const sidebar = document.getElementById('sidebar');
const toggleTheme = document.getElementById('theme-toggle');
const collapseBtn = document.querySelector('.toggle-sidebar');
const collapseIcon = document.getElementById('collapse-icon');

// Make the whole toggle-theme row clickable (so when sidebar is collapsed and only the icon
// is visible, clicking it will still toggle the theme). Skip when the actual checkbox/label
// was the click target to avoid double toggles.
const toggleThemeContainer = document.querySelector('.toggle-theme');
if (toggleThemeContainer) {
  toggleThemeContainer.addEventListener('click', (e) => {
    if (!toggleTheme) return;
    // If click was on the checkbox or its label, do nothing — checkbox's change will handle it
    if (e.target === toggleTheme || e.target.closest('label.switch')) return;
    toggleTheme.checked = !toggleTheme.checked;
    // Trigger change so existing handler runs
    toggleTheme.dispatchEvent(new Event('change', { bubbles: true }));
  });
}

toggleTheme.addEventListener('change', () => {
  sidebar.classList.toggle('dark');
  document.body.classList.toggle('dark');
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
