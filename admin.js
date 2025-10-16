// 🔐 Admin Login
const ADMIN_USER = "Admin";
const ADMIN_PASS = "Admin123";
const MAIN_SITE_URL = "index.html"; // <-- Change to your main website URL

const loginSection = document.getElementById("login-section");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const logoutBtn = document.getElementById("logout-btn");

// Project elements
const projectForm = document.getElementById("projectForm");
const projectListEl = document.getElementById("project-list");
const pTitle = document.getElementById("p-title");
const pImage = document.getElementById("p-image");
const pDesc = document.getElementById("p-desc");
const submitProjectBtn = document.getElementById("submitProject");
const cancelEditBtn = document.getElementById("cancelEdit");
const formTitle = document.getElementById("formTitle");

// Stats
const projectCountEl = document.getElementById("projectCount");
const messageCountEl = document.getElementById("messageCount");
const userCountEl = document.getElementById("userCount");

// Messages
const messageListEl = document.getElementById("message-list");

// Password toggle
const togglePassword = document.getElementById("togglePassword");
const adminPassword = document.getElementById("admin-password");

// Scroll Buttons
const scrollTopBtn = document.getElementById("scrollTopBtn");
const scrollBottomBtn = document.getElementById("scrollBottomBtn");

// LocalStorage arrays
let projects = JSON.parse(localStorage.getItem("projects")) || [];
let messages = JSON.parse(localStorage.getItem("messages")) || [];
let editIndex = null;

// ======================
// 🔹 Check Login Status on Page Load
// ======================
if (localStorage.getItem("isLoggedIn") === "true") {
  loginSection.classList.add("hidden");
  dashboard.classList.remove("hidden");
  renderProjects();
  renderMessages();
  updateStats();
} else {
  loginSection.classList.remove("hidden");
  dashboard.classList.add("hidden");
}

// ======================
// 🔹 Login Functionality
// ======================
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("admin-username").value;
  const password = document.getElementById("admin-password").value;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    localStorage.setItem("isLoggedIn", "true"); // mark as logged in
    loginSection.classList.add("hidden");
    dashboard.classList.remove("hidden");
    renderProjects();
    renderMessages();
    updateStats();
    loginError.textContent = "";
  } else {
    loginError.textContent = "Incorrect username or password!";
  }
});

// Show/Hide password
togglePassword.addEventListener("click", () => {
  const type = adminPassword.type === "password" ? "text" : "password";
  adminPassword.type = type;
});

// ======================
// 🔹 Logout (Redirect to main site)
// ======================
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn"); // remove login status
  window.location.href = MAIN_SITE_URL;   // redirect to main site
});

// ======================
// 🔹 Project CRUD & Messages (same as previous code)
// ======================
projectForm.addEventListener("submit", e => {
  e.preventDefault();
  const project = {
    title: pTitle.value,
    image: pImage.value,
    desc: pDesc.value
  };

  if (editIndex !== null) {
    projects[editIndex] = project;
    editIndex = null;
    submitProjectBtn.textContent = "Add Project";
    formTitle.textContent = "Add New Project";
    cancelEditBtn.style.display = "none";
  } else {
    projects.push(project);
  }

  localStorage.setItem("projects", JSON.stringify(projects));
  renderProjects();
  updateStats();
  projectForm.reset();
});

function renderProjects() {
  projectListEl.innerHTML = "";
  projects.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <button onclick="editProject(${index})">Edit</button>
      <button onclick="deleteProject(${index})">Delete</button>
    `;
    projectListEl.appendChild(card);
  });
}

window.editProject = index => {
  const p = projects[index];
  pTitle.value = p.title;
  pImage.value = p.image;
  pDesc.value = p.desc;
  editIndex = index;
  submitProjectBtn.textContent = "Update Project";
  formTitle.textContent = "Edit Project";
  cancelEditBtn.style.display = "inline-block";
};

cancelEditBtn.addEventListener("click", () => {
  editIndex = null;
  projectForm.reset();
  submitProjectBtn.textContent = "Add Project";
  formTitle.textContent = "Add New Project";
  cancelEditBtn.style.display = "none";
});

window.deleteProject = index => {
  if (confirm("Are you sure you want to delete this project?")) {
    projects.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(projects));
    renderProjects();
    updateStats();
  }
};

// Messages dummy
if (messages.length === 0) {
  messages.push(
    { name: "John Doe", email: "john@example.com", message: "Hello there!" },
    { name: "Jane Smith", email: "jane@example.com", message: "Nice work!" }
  );
  localStorage.setItem("messages", JSON.stringify(messages));
}

function renderMessages() {
  messageListEl.innerHTML = "";
  messages.forEach((m, index) => {
    const card = document.createElement("div");
    card.className = "message-card";
    card.innerHTML = `
      <p><strong>${m.name}</strong> (${m.email})</p>
      <p>${m.message}</p>
      <button onclick="deleteMessage(${index})">Delete</button>
    `;
    messageListEl.appendChild(card);
  });
}

window.deleteMessage = index => {
  if (confirm("Delete this message?")) {
    messages.splice(index, 1);
    localStorage.setItem("messages", JSON.stringify(messages));
    renderMessages();
    updateStats();
  }
};

// Stats update
function updateStats() {
  projectCountEl.textContent = projects.length;
  messageCountEl.textContent = messages.length;
  userCountEl.textContent = 12; // dummy users
}

// Scroll buttons
window.onscroll = () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  scrollBottomBtn.style.display = window.scrollY > 300 ? "block" : "none";
};

scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: 'smooth' }));
scrollBottomBtn.addEventListener("click", () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
