/* ---- Toggle Contact Type ---- */
let currentContact = "call";

function switchContact(type) {
  currentContact = type;
  document
    .getElementById("btnCall")
    .classList.toggle("active", type === "call");
  document
    .getElementById("btnMsg")
    .classList.toggle("active", type === "message");
  const msgField = document.getElementById("messageField");
  msgField.classList.toggle("visible", type === "message");
  const btn = document.getElementById("submitBtn");
  btn.textContent = type === "call" ? "📞 طلب اتصال الآن" : "💬 إرسال الرسالة";
}

/* ---- Form Submit ---- */
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById("submitBtn");
  btn.textContent = "✅ تم الإرسال بنجاح!";
  btn.classList.add("success");
  btn.disabled = true;
  setTimeout(() => {
    btn.classList.remove("success");
    btn.disabled = false;
    switchContact(currentContact);
    e.target.reset();
  }, 3500);
}

/* ---- Testimonials Auto-Rotate ---- */
const tcards = document.querySelectorAll(".tcard");
let activeTcard = 0;
setInterval(() => {
  tcards[activeTcard].classList.remove("active");
  activeTcard = (activeTcard + 1) % tcards.length;
  tcards[activeTcard].classList.add("active");
}, 4000);

/* ---- Scroll Reveal ---- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
const sidebar = document.getElementById("sidebar");
const overlay = document.querySelector(".menu-overlay");

function showsidebar() {
  sidebar.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("no-scroll");
}

function hidesidebar() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

// ESC يقفل
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hidesidebar();
});
