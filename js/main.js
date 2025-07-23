// ========================== السلايدر ==========================
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
        void rightSide.offsetWidth;
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
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

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

updateSlider();
startAutoSlide();






