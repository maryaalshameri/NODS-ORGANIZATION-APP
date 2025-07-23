// ========================== نموذج الاتصال ==========================
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('success');
  const messageTable = document.getElementById('messageTable');
  const messageBody = document.getElementById('messageBody');

  let submissions = [];

  // ✅ إخفاء الجدول دائمًا
  messageTable.style.display = 'none';

  // ✅ تحميل الرسائل من localStorage (ممكن استخدامها لاحقًا في لوحة تحكم)
  const savedData = localStorage.getItem("messages");
  if (savedData) {
    submissions = JSON.parse(savedData);
    submissions.forEach(sub => addToTable(sub));
  }

  // ✅ إذا سبق للمستخدم أن أرسل رسالة بهذه الجلسة، لا يسمح له بالإرسال
  if (sessionStorage.getItem("hasMessaged") === 'true') {
    contactForm.innerHTML = `<p style="color:red;"><i class="fa-solid fa-triangle-exclamation"></i> لقد قمت بإرسال رسالة مسبقًا في هذه الجلسة.</p>`;
    return;
  }

  // ✅ دالة لإضافة الرسالة إلى الجدول (لكن لا نعرض الجدول)
  function addToTable({ name, email, message }) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${name}</td>
      <td>${email}</td>
      <td>${message}</td>
    `;
    messageBody.appendChild(row);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('message').value.trim();

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

    const newSubmission = { name, email, message };
    submissions.push(newSubmission);

    // ✅ حفظ الرسائل في localStorage
    localStorage.setItem("messages", JSON.stringify(submissions));

    // ✅ منع تكرار الإرسال في نفس الجلسة
    sessionStorage.setItem("hasMessaged", 'true');

    // ✅ حفظ في الجدول (مخفي)
    addToTable(newSubmission);

    // ✅ عرض رسالة نجاح
    contactSuccess.style.display = 'block';
    contactForm.reset();

    setTimeout(() => contactSuccess.style.display = 'none', 3000);

    // ✅ تعطيل النموذج بعد الإرسال
    contactForm.innerHTML = `<p style="color:green;"><i class="fa-solid fa-check"></i> تم إرسال رسالتك بنجاح. لا يمكنك الإرسال مجددًا أثناء هذه الجلسة.</p>`;
  });
});
