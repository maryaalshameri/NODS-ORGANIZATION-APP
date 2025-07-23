// بيانات المشاريع التجريبية
let projectData = [
  {
    id: 1,
    title: "مشروع التعليم في المناطق الريفية",
    category: "education",
    description: "دعم المدارس في المناطق النائية بمستلزمات التعليم.",
    image: "image/j1.JPG",
    date: "2015-02-20",
    location: "الحديدة"
  },
  {
    id: 2,
    title: "عيادة متنقلة في القرى",
    category: "health",
    description: "توفير الرعاية الصحية للقرى عبر عيادات متنقلة.",
    image: "image/j2.jpg",
    date: "2015-02-20",
    location: "عدن"
  },
  {
    id: 3,
    title: "تمكين المرأة الريفية",
    category: "women",
    description: "تدريب النساء على المهارات المهنية لزيادة الدخل.",
    image: "image/j3.jpg",
    date: "2015-02-20",
    location: "حجة - البيضاء"
  },
  {
    id: 4,
    title: "مشروع بناء آبار مياه",
    category: "development",
    description: "حفر آبار مياه صالحة للشرب في القرى.",
    image: "image/j4.webp",
    date: "2015-02-20",
    location: "تعز"
  },
  {
    id: 5,
    title: "التوعية بالنظام المدني",
    category: "development",
    description: "الوثيقة المدنية",
    image: "image/p1.jfif",
    date: "2015-02-20",
    location: "تعز - حجة"
  },
  {
    id: 6,
    title: "تعزيز السلم والأمن المجتمعي",
    category: "development",
    description: "برنامج تعزيز التعايش",
    image: "image/p2.jpg",
    date: "2015-02-20",
    location: "عدن، لحج"
  },
  {
    id: 7,
    title: "الديمقراطية وحقوق الإنسان",
    category: "development",
    description: "تدريب الخطباء والواعظات بالتواصل الإعلامي وحقوق الإنسان",
    image: "image/p3.jfif",
    date: "2015-02-20",
    location: "مأرب، الجوف"
  },
  {
    id: 8,
    title: "دعم وتمكين النساء",
    category: "women",
    description: "التوعية بالسن الآمن للزواج",
    image: "image/p2.jpg",
    date: "2015-02-20",
    location: "عدن، لحج"
  }
];

// عناصر DOM
const grid = document.querySelector('.projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');

// دالة عرض المشاريع
function renderProjects(projects) {
  const fragment = document.createDocumentFragment();

  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.category = project.category;

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" />
      <div class="card-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-meta">
          <span><i class="fas fa-map-marker-alt"></i> ${project.location}</span>
          <span><i class="far fa-calendar-alt"></i> ${project.date}</span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openModal(project));
    fragment.appendChild(card);
  });

  grid.innerHTML = '';
  grid.appendChild(fragment);
}

// فلترة حسب الفئة
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active')?.classList.remove('active');
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const searchQuery = searchInput.value.trim();

    let filtered = projectData;

    if (filter !== 'all') {
      filtered = filtered.filter(p => p.category === filter);
    }

    if (searchQuery !== '') {
      filtered = filtered.filter(p =>
        p.title.includes(searchQuery) ||
        p.description.includes(searchQuery) ||
        p.location.includes(searchQuery) ||
        p.date.includes(searchQuery)
      );
    }

    renderProjects(filtered);
  });
});

// مودال التفاصيل
function openModal(project) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal">
      <button class="close-modal">&times;</button>
      <img src="${project.image}" />
      <h2>${project.title}</h2>
      <p>${project.description}</p>
      <div class="project-meta">
        <span><i class="fas fa-map-marker-alt"></i> ${project.location}</span>
        <span><i class="far fa-calendar-alt"></i> ${project.date}</span>
      </div>
    </div>
  `;
  modal.querySelector('.close-modal').onclick = () => modal.remove();
  document.body.appendChild(modal);
}

// Debounce للبحث
function debounce(func, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

// البحث التفاعلي
searchInput?.addEventListener('input', debounce((e) => {
  const query = e.target.value.trim();
  const activeCategory = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';

  let filtered = projectData;

  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  if (query !== '') {
    filtered = filtered.filter(p =>
      p.title.includes(query) ||
      p.description.includes(query) ||
      p.location.includes(query) ||
      p.date.includes(query)
    );
  }

  renderProjects(filtered);
}));

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  renderProjects(projectData); // عرض المشاريع مباشرة
  localStorage.setItem('projects', JSON.stringify(projectData)); // حفظها في localStorage
});
