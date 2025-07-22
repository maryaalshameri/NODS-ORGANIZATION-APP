



const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let currentIndex = 0;
let autoSlideInterval = null;

function updateSlider() {
  slides.forEach((slide, i) => {
    if (i === currentIndex) {
      slide.classList.add('active');

      const rightSide = slide.querySelector('.right-side');
      if (rightSide) {
        rightSide.classList.remove('animate-overlay');
        void rightSide.offsetWidth;  // force reflow to restart animation
        rightSide.classList.add('animate-overlay');
      }
    } else {
      slide.classList.remove('active');
    }
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Event listeners for buttons
nextBtn.addEventListener('click', () => {
  stopAutoSlide();
  nextSlide();
  startAutoSlide();
});

prevBtn.addEventListener('click', () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

// Initialize
updateSlider();
startAutoSlide();














// const menuToggle = document.querySelector('.menu-toggle');
// const nav = document.querySelector('.main-header nav');

// menuToggle.addEventListener('click', () => {
//   nav.classList.toggle('open');
// });


// //them 
//   const toggleBtn = document.getElementById('themeToggle');
//   const icon = document.getElementById('themeIcon');

//   // تحميل الوضع المحفوظ من localStorage
//   if (localStorage.getItem('theme') === 'dark') {
//     document.documentElement.setAttribute('data-theme', 'dark');
//     icon.classList.replace('fa-moon', 'fa-sun');
//   }

//   toggleBtn.addEventListener('click', () => {
//     const currentTheme = document.documentElement.getAttribute('data-theme');
//     if (currentTheme === 'dark') {
//       document.documentElement.setAttribute('data-theme', 'light');
//       localStorage.setItem('theme', 'light');
//       icon.classList.replace('fa-sun', 'fa-moon');
//       updateToggleButton('light');
//     } else {
//       document.documentElement.setAttribute('data-theme', 'dark');
//       localStorage.setItem('theme', 'dark');
//       icon.classList.replace('fa-moon', 'fa-sun');
//       updateToggleButton('dark');
//     }
//   });
   

// function setupThemeToggle() {
//     const toggleBtn = document.getElementById('themeToggle');
    
//     if (toggleBtn) {
//         toggleBtn.addEventListener('click', () => {
//             const currentTheme = document.documentElement.getAttribute('data-theme');
//             const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
//             document.documentElement.setAttribute('data-theme', newTheme);
//             localStorage.setItem('theme', newTheme);
//             updateToggleButton(newTheme);
            
//             // يمكنك إضافة حدث مخصص لتنبيه الصفحات الأخرى إذا لزم الأمر
//             window.dispatchEvent(new CustomEvent('themeChanged', { detail: newTheme }));
//         });
//     }
// }

function applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleButton(savedTheme);
}

function updateToggleButton(theme) {
    const icon = document.getElementById('themeIcon');
    if (icon) {
        if (theme === 'dark') {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
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
