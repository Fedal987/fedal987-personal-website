const sidebar = document.getElementById('sidebar');
const toggleTheme = document.getElementById('theme-toggle');
const collapseBtn = document.querySelector('.toggle-sidebar');
const collapseIcon = document.getElementById('collapse-icon');

// 主题切换（保留原逻辑）
toggleTheme.addEventListener('change', () => {
  sidebar.classList.toggle('dark');
  document.body.classList.toggle('dark');
});

// 折叠侧边栏（保留原逻辑）
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

// 菜单导航：点击时滚动到对应 section，并设置 active
document.querySelectorAll('.menu-item').forEach(item => {
  // 绑定目标 id（根据菜单文字简易映射）
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

// 联系表单：简单前端处理并模拟发送
const contactForm = document.getElementById('contact-form');
if(contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const feedback = document.getElementById('form-feedback');

    if(!name || !email || !message) {
      feedback.textContent = '请完整填写所有字段。';
      return;
    }

    feedback.textContent = '发送中...';
    // 模拟延迟
    setTimeout(() => {
      feedback.textContent = '已发送，谢谢！我会尽快回复。';
      contactForm.reset();
    }, 900);
  });
}
