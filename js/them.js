
///////////data-theme/////////////

function applyTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateToggleButton(savedTheme);
}

function updateToggleButton(theme) {
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.classList.replace(theme === 'dark' ? 'fa-moon' : 'fa-sun', theme === 'dark' ? 'fa-sun' : 'fa-moon');
  }
}

function setupThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateToggleButton(newTheme);
    });
  }
}

window.addEventListener('storage', (event) => {
  if (event.key === 'theme') {
    document.documentElement.setAttribute('data-theme', event.newValue);
    updateToggleButton(event.newValue);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  setupThemeToggle();
});



///////////////////////menu-toggle/////////////////////
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open'); // أضف/أزل كلاس "open" للقائمة
});



// ========================== نافذة التسجيل ==========================
document.addEventListener('DOMContentLoaded', () => {
  const openModalBtn = document.getElementById('openJoinModal');
  const modals = document.getElementById('joinModal');
  const closeModalBtn = document.getElementById('closeJoinModal');
  const joinForm = document.getElementById('joinForm'); 
  const joinSuccess = document.getElementById('successMessage');
  const alreadyJoinedMessage = document.getElementById('alreadyJoinedMessage');

  // ✅ تحقق: إذا سجّل المستخدم سابقًا، أخفِ الزر وأظهر الرسالة
  if (localStorage.getItem('joined') === 'true') {
    openModalBtn.style.display = 'none';
    alreadyJoinedMessage.style.display = 'block';
  }

  openModalBtn.addEventListener('click', () => {
    modals.style.display = 'flex';
    joinSuccess.style.display = 'none';
    joinForm.style.display = 'block';
  });

  closeModalBtn.addEventListener('click', () => {
    modals.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modals) {
      modals.style.display = 'none';
    }
  });

  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    const namePattern = /^[A-Za-z\u0600-\u06FF\s]+$/;
    if (name.length <= 3 || !namePattern.test(name)) {
      alert('يرجى إدخال اسم صحيح يحتوي فقط على حروف، وألا يقل عن 4 أحرف.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('يرجى إدخال بريد إلكتروني صحيح.');
      return;
    }

    // ✅ تم التسجيل: نخزّن القيمة ونخفي الزر ونُظهر الرسالة
    localStorage.setItem('joined', 'true');
    joinForm.style.display = 'none';
    joinSuccess.style.display = 'block';
    openModalBtn.style.display = 'none';
    alreadyJoinedMessage.style.display = 'block';
  });
});
