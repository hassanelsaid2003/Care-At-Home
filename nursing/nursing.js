// ===== NURSES DATA =====
const nurses = [
  {
    id: 1,
    name: "Nadia El-Sayed",
    emoji: "👩‍⚕️",
    gender: "female",
    spec: "Home Care",
    title: "Post-Surgery & Chronic Disease Home Care",
    cert: "RN • BSN",
    exp: 12,
    rating: 4.9,
    reviews: 318,
    price: 80,
    avail: "today",
    tags: ["Post-Surgery", "Wound Care", "IV Therapy"],
    services: ["Wound Dressing", "Medication Admin", "Vital Signs"],
    insurance: true,
  },
  {
    id: 2,
    name: "Ahmed Sami",
    emoji: "👨‍⚕️",
    gender: "male",
    spec: "ICU",
    title: "Critical Care & Intensive Monitoring",
    cert: "RN • CCRN",
    exp: 9,
    rating: 4.8,
    reviews: 204,
    price: 120,
    avail: "today",
    tags: ["Critical Care", "Ventilator", "Hemodynamics"],
    services: ["ICU Monitoring", "Ventilator Care", "PICC Line"],
    insurance: true,
  },
  {
    id: 3,
    name: "Fatma Khalil",
    emoji: "👩‍⚕️",
    gender: "female",
    spec: "Pediatric",
    title: "Child & Newborn Nursing Care",
    cert: "RN • CPN",
    exp: 7,
    rating: 4.9,
    reviews: 276,
    price: 75,
    avail: "today",
    tags: ["Newborn", "Child Care", "Vaccines"],
    services: ["Newborn Care", "Vaccine Admin", "Growth Monitoring"],
    insurance: true,
  },
  {
    id: 4,
    name: "Hassan Mostafa",
    emoji: "👨‍⚕️",
    gender: "male",
    spec: "Surgical",
    title: "Pre & Post Operative Nursing",
    cert: "RN • CNOR",
    exp: 14,
    rating: 4.7,
    reviews: 189,
    price: 110,
    avail: "tomorrow",
    tags: ["Pre-Op", "Post-Op", "Sterile Technique"],
    services: ["Surgical Prep", "Post-Op Care", "Drain Management"],
    insurance: false,
  },
  {
    id: 5,
    name: "Mariam Fawzy",
    emoji: "👩‍⚕️",
    gender: "female",
    spec: "Oncology",
    title: "Cancer Care & Chemotherapy Support",
    cert: "RN • OCN",
    exp: 11,
    rating: 4.9,
    reviews: 247,
    price: 130,
    avail: "today",
    tags: ["Chemotherapy", "Pain Management", "Palliative"],
    services: ["Chemo Administration", "Port Care", "Pain Control"],
    insurance: true,
  },
  {
    id: 6,
    name: "Khaled Adel",
    emoji: "👨‍⚕️",
    gender: "male",
    spec: "Geriatric",
    title: "Elderly & Long-Term Care Nursing",
    cert: "RN • GCN",
    exp: 16,
    rating: 4.8,
    reviews: 312,
    price: 70,
    avail: "today",
    tags: ["Elderly Care", "Dementia", "Mobility"],
    services: ["Daily Care", "Dementia Support", "Fall Prevention"],
    insurance: true,
  },
  {
    id: 7,
    name: "Dalia Mahmoud",
    emoji: "👩‍⚕️",
    gender: "female",
    spec: "Mental Health",
    title: "Psychiatric & Behavioral Health Nursing",
    cert: "RN • PMH-RN",
    exp: 8,
    rating: 4.7,
    reviews: 156,
    price: 95,
    avail: "tomorrow",
    tags: ["Psychiatric", "Anxiety", "Behavioral"],
    services: ["Mental Assessment", "Medication Mgmt", "Crisis Support"],
    insurance: true,
  },
  {
    id: 8,
    name: "Tarek Nasser",
    emoji: "👨‍⚕️",
    gender: "male",
    spec: "Rehabilitation",
    title: "Physical & Neurological Rehabilitation",
    cert: "RN • CRRN",
    exp: 10,
    rating: 4.8,
    reviews: 198,
    price: 90,
    avail: "later",
    tags: ["Stroke Rehab", "Mobility", "Exercises"],
    services: ["Exercise Therapy", "Mobility Aid", "Progress Tracking"],
    insurance: false,
  },
  {
    id: 9,
    name: "Rania Ibrahim",
    emoji: "👩‍⚕️",
    gender: "female",
    spec: "Home Care",
    title: "Diabetic Care & Wound Management",
    cert: "RN • CWCN",
    exp: 6,
    rating: 4.6,
    reviews: 134,
    price: 75,
    avail: "today",
    tags: ["Diabetes", "Wound Care", "Injections"],
    services: ["Blood Sugar Monitoring", "Insulin Admin", "Foot Care"],
    insurance: true,
  },
  {
    id: 10,
    name: "Mona Sherif",
    emoji: "👩‍⚕️",
    gender: "female",
    spec: "Oncology",
    title: "Palliative & End-of-Life Care",
    cert: "RN • ACHPN",
    exp: 13,
    rating: 5.0,
    reviews: 289,
    price: 140,
    avail: "today",
    tags: ["Palliative", "Comfort Care", "Family Support"],
    services: ["Pain Relief", "Emotional Support", "Family Guidance"],
    insurance: true,
  },
  {
    id: 11,
    name: "Youssef Badr",
    emoji: "👨‍⚕️",
    gender: "male",
    spec: "ICU",
    title: "Cardiac ICU & Emergency Nursing",
    cert: "RN • CCRN",
    exp: 18,
    rating: 4.9,
    reviews: 367,
    price: 135,
    avail: "later",
    tags: ["Cardiac ICU", "Emergency", "Defibrillation"],
    services: ["Cardiac Monitoring", "Emergency Response", "Code Blue"],
    insurance: true,
  },
  {
    id: 12,
    name: "Heba Zaki",
    emoji: "👩‍⚕️",
    gender: "female",
    spec: "Rehabilitation",
    title: "Post-Stroke & Orthopedic Rehab",
    cert: "RN • CRRN",
    exp: 9,
    rating: 4.7,
    reviews: 172,
    price: 85,
    avail: "tomorrow",
    tags: ["Post-Stroke", "Orthopedic", "Balance"],
    services: ["Gait Training", "Strength Exercises", "ADL Support"],
    insurance: false,
  },
];

// ===== STATE =====
let activeFilter = "all";
let currentNurse = null;

// ===== RENDER =====
function renderNurses(list) {
  const grid = document.getElementById("nurses-grid");
  const noRes = document.getElementById("no-results");
  document.getElementById("result-count").textContent = list.length;

  if (list.length === 0) {
    grid.innerHTML = "";
    noRes.classList.add("show");
    return;
  }
  noRes.classList.remove("show");

  grid.innerHTML = list
    .map((n) => {
      const stars =
        "★".repeat(Math.floor(n.rating)) + (n.rating % 1 >= 0.5 ? "½" : "");
      const availCls =
        n.avail === "today"
          ? "avail-today"
          : n.avail === "tomorrow"
            ? "avail-tomorrow"
            : "avail-later";
      const availTxt =
        n.avail === "today"
          ? "✓ Available Today"
          : n.avail === "tomorrow"
            ? "Available Tomorrow"
            : "Book Ahead";
      const avatarCls = n.gender === "male" ? "male-avatar" : "";

      return `
      <div class="nurse-card">
        <span class="avail-badge ${availCls}">${availTxt}</span>

        <div class="nurse-avatar ${avatarCls}">
          ${n.emoji}
          <span class="cert-ribbon">${n.cert}</span>
        </div>

        <div class="nurse-info">
          <div class="nurse-name">${n.name}</div>
          <div class="nurse-spec">${n.spec} Nursing — ${n.title}</div>
          <div class="nurse-rating">
            <span class="stars">${stars}</span>
            <span class="rating-num">${n.rating}</span>
            <span class="reviews-count">(${n.reviews} reviews)</span>
          </div>
          <div class="nurse-tags">
            ${n.tags.map((t) => `<span class="nurse-tag">${t}</span>`).join("")}
          </div>
        </div>

        <div class="nurse-meta">
          <div class="meta-item">
            <span class="meta-val">${n.exp}+</span>
            <span class="meta-label">Yrs Exp.</span>
          </div>
          <div class="meta-item">
            <span class="meta-val">${n.reviews}</span>
            <span class="meta-label">Reviews</span>
          </div>
          <div class="meta-item">
            <span class="meta-val" style="color:${n.insurance ? "#0f766e" : "var(--second)"};font-size:0.82rem">
              ${n.insurance ? "✓ Insur." : "Self-pay"}
            </span>
            <span class="meta-label">Insurance</span>
          </div>
        </div>

        <div class="nurse-services">
          ${n.services.map((s) => `<span class="svc-chip"><i class="fa-solid fa-check"></i>${s}</span>`).join("")}
        </div>

        <div class="nurse-price">
          <div class="price-label">Home Visit Fee</div>
          <span class="price-val">$${n.price}</span>
          <span class="price-per"> / visit</span>
        </div>

        <button class="book-btn" onclick="openBooking(${n.id})">
          <i class="fa-solid fa-calendar-check"></i> Book Nursing Visit
        </button>
      </div>
    `;
    })
    .join("");
}

// ===== FILTER =====
function filterNurses() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const sortBy = document.getElementById("sort-select").value;

  let list = nurses.filter((n) => {
    const matchSpec = activeFilter === "all" || n.spec === activeFilter;
    const matchQuery =
      !query ||
      n.name.toLowerCase().includes(query) ||
      n.spec.toLowerCase().includes(query) ||
      n.title.toLowerCase().includes(query) ||
      n.cert.toLowerCase().includes(query) ||
      n.tags.some((t) => t.toLowerCase().includes(query)) ||
      n.services.some((s) => s.toLowerCase().includes(query));
    return matchSpec && matchQuery;
  });

  if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
  else if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
  else if (sortBy === "exp") list.sort((a, b) => b.exp - a.exp);

  renderNurses(list);
}

function setFilter(el, spec) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  el.classList.add("active");
  activeFilter = spec;
  filterNurses();
}

// ===== BOOKING MODAL =====
function openBooking(id) {
  currentNurse = nurses.find((n) => n.id === id);
  if (!currentNurse) return;

  document.getElementById("modal-avatar").textContent = currentNurse.emoji;
  document.getElementById("modal-avatar").className =
    "modal-avatar" + (currentNurse.gender === "male" ? " male-avatar" : "");
  document.getElementById("modal-nurse-name").textContent = currentNurse.name;
  document.getElementById("modal-nurse-spec").textContent =
    currentNurse.spec + " Nursing — " + currentNurse.cert;
  document.getElementById("modal-nurse-price").textContent =
    `$${currentNurse.price} / visit${currentNurse.insurance ? " · Insurance accepted" : ""}`;

  const today = new Date().toISOString().split("T")[0];
  document.getElementById("f-date").min = today;
  document.getElementById("f-date").value = today;

  document.getElementById("booking-form").style.display = "block";
  document.getElementById("success-screen").classList.remove("show");
  document.getElementById("modal-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

function submitBooking() {
  const name = document.getElementById("f-name").value.trim();
  const phone = document.getElementById("f-phone").value.trim();
  const addr = document.getElementById("f-address").value.trim();
  const date = document.getElementById("f-date").value;

  if (!name || !phone || !addr || !date) {
    showToast("⚠️ Please fill in all required fields.");
    return;
  }

  document.getElementById("booking-form").style.display = "none";
  document.getElementById("success-screen").classList.add("show");
  showToast(`✓ Nursing visit booked with ${currentNurse.name}!`);
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById("toast");
  document.getElementById("toast-msg").textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

// ===== FIXED SIDEBAR / MOBILE MENU =====

const sidebar = document.getElementById("sidebar");
const overlay = document.querySelector(".menu-overlay");

function showsidebar() {
  if (sidebar) sidebar.classList.add("active");
  if (overlay) overlay.classList.add("active");
  document.body.classList.add("no-scroll");
}

function hidesidebar() {
  if (sidebar) sidebar.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

// Close on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hidesidebar();
});

// Close when clicking overlay
if (overlay) {
  overlay.addEventListener("click", hidesidebar);
}

// Close modal on outside click
document
  .getElementById("modal-overlay")
  .addEventListener("click", function (e) {
    if (e.target === this) closeModal();
  });

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, i * 70);
        revealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

// ===== INIT =====
filterNurses();

setTimeout(() => {
  document.querySelectorAll(".nurse-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(22px)";
    card.style.transition = "opacity 0.55s ease, transform 0.55s ease";
    revealObs.observe(card);
  });
}, 50);

/* ── Google Translate ────────────────────────────────────── */
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en", includedLanguages: "en,ar", autoDisplay: false },
    "google_translate_element",
  );
}

(function () {
  var sc = document.createElement("script");
  sc.src =
    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.head.appendChild(sc);
})();

var currentLang = "en";
var toggleBtn = document.getElementById("lang-toggle");

function setCookieAndReload(lang) {
  // Google Translate بيقرأ اللغة من الـ cookie اسمها googtrans
  var cookieVal = lang === "ar" ? "/en/ar" : "/en/en";
  // نكتب الـ cookie على الـ domain الحالي
  document.cookie = "googtrans=" + cookieVal + "; path=/";
  document.cookie =
    "googtrans=" + cookieVal + "; path=/; domain=" + location.hostname;
  location.reload();
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", function () {
    var newLang = currentLang === "en" ? "ar" : "en";
    setCookieAndReload(newLang);
  });
}

// عند تحميل الصفحة: اقرأ الـ cookie وحدّث نص الزرار
(function () {
  var match = document.cookie.match(/googtrans=\/en\/(\w+)/);
  if (match && match[1] === "ar") {
    currentLang = "ar";
    if (toggleBtn) toggleBtn.textContent = "en";
  }
})();

// ===== SUBSCRIBE MODAL =====
setTimeout(function () {
  var subModal = document.getElementById("subscribeModal");
  if (subModal) subModal.classList.add("active");
}, 10000);

function closeSubscribeModal() {
  var subModal = document.getElementById("subscribeModal");
  if (subModal) subModal.classList.remove("active");
}

var subModalEl = document.getElementById("subscribeModal");
if (subModalEl) {
  subModalEl.addEventListener("click", function (e) {
    if (e.target === this) {
      closeSubscribeModal();
    }
  });
}

/* ── Dropdowns ────────────────────────────────────── */
function toggleDesktopDropdown(e) {
  e.stopPropagation();
  document.getElementById("desktopDropdown")?.classList.toggle("active");
}

function toggleMobileDropdown(e) {
  e.stopPropagation();
  document.getElementById("mobileDropdown")?.classList.toggle("active");
}

// Close dropdowns on outside click
document.addEventListener("click", (e) => {
  document.querySelectorAll(".dropdown").forEach((d) => {
    if (!d.contains(e.target)) d.classList.remove("active");
  });
});
