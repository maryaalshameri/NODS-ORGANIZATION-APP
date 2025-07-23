document.addEventListener('DOMContentLoaded', () => {
      const contactForm = document.getElementById('contactForm');
      const contactSuccess = document.getElementById('success');
      const messagesContainer = document.getElementById('messagesContainer');
      
      let submissions = [];

      const savedData = localStorage.getItem("messages");
      if (savedData) {
        submissions = JSON.parse(savedData);
        submissions.forEach(sub => addToCard(sub));
      }

      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('message').value.trim();
        const topic = document.getElementById('topic').value;
         

        if (!topic) {
        alert("❌ يرجى اختيار نوع الموضوع.");
            return;
                }
        const namePattern = /^[A-Za-z\u0600-\u06FF\s]+$/;
        if (name.length <= 3 || !namePattern.test(name)) {
          alert("❌ يرجى إدخال اسم صحيح (أكثر من 3 حروف، بدون أرقام).");
          return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          alert("❌ يرجى إدخال بريد إلكتروني صحيح.");
          return;
        }

        if (message.length < 5) {
          alert("❌ يرجى كتابة رسالة لا تقل عن 5 أحرف.");
          return;
        }
const newSubmission = { name, message, topic };

        submissions.push(newSubmission);

        localStorage.setItem("messages", JSON.stringify(submissions));
        addToCard(newSubmission);

        contactSuccess.style.display = 'block';
        contactForm.reset();
        setTimeout(() => contactSuccess.style.display = 'none', 3000);
      });

function addToCard({ name, message, topic }) {
  const card = document.createElement('div');
  card.className = "message-card";
  card.setAttribute('data-topic', topic);
  card.innerHTML = `
    <h3><i class="fas fa-user" ></i>${name}</h3>
    <p "><i class="fas fa-envelope"></i>  ${topic}</p>
    <p><i class="fas fa-envelope"></i> ${message}</p>
  `;
  messagesContainer.appendChild(card);
}
    });


    function filterCards(topic) {
  const cards = document.querySelectorAll('.message-card');
  cards.forEach(card => {
    const cardTopic = card.getAttribute('data-topic');
    if (topic === 'all' || cardTopic === topic) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}