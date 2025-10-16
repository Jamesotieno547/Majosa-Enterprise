// ✅ Smooth nav toggle
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');
navToggle?.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// ✅ Insert current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// ✅ Contact form: save message to localStorage
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = {
      id: 'm_' + Date.now(),
      name: document.getElementById('c-name').value.trim(),
      email: document.getElementById('c-email').value.trim(),
      phone: document.getElementById('c-phone').value.trim(),
      message: document.getElementById('c-message').value.trim(),
      date: new Date().toISOString(),
    };

    const msgs = JSON.parse(localStorage.getItem('majosa_messages') || '[]');
    msgs.unshift(msg);
    localStorage.setItem('majosa_messages', JSON.stringify(msgs));

    alert('✅ Thank you! Your message was sent successfully.');
    contactForm.reset();
  });
}

// ✅ Load projects dynamically into portfolio grid
function renderPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  const projs = JSON.parse(localStorage.getItem('majosa_projects') || '[]');
  if (!grid) return;
  if (projs.length === 0) return;

  grid.innerHTML = '';
  projs.forEach((p) => {
    const div = document.createElement('div');
    div.className = 'project-card';
    div.innerHTML = `
      <img src="${p.image || 'https://via.placeholder.com/400x250?text=No+Image'}" alt="${p.title}">
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
    `;
    grid.appendChild(div);
  });
}
renderPortfolio();
