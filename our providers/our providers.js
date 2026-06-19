// ─── Google Translate ───
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,ar",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element",
  );
}

function changeLanguage(lang) {
  var select = document.querySelector(".goog-te-combo");
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event("change"));
  } else {
    // لو السكريبت لسه محملش، نستنى شوية
    setTimeout(() => changeLanguage(lang), 500);
  }
}

// تحميل سكريبت جوجل بعد ما الـ DOM يكون جاهز
document.addEventListener("DOMContentLoaded", function () {
  var script = document.createElement("script");
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);

  // ─── Language Toggle ───
  var currentLang = "en";
  var toggleBtn = document.getElementById("lang-toggle");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      if (currentLang === "en") {
        changeLanguage("ar");
        currentLang = "ar";
        toggleBtn.textContent = "en";
        document.body.setAttribute("dir", "rtl");
      } else {
        changeLanguage("en");
        currentLang = "en";
        toggleBtn.textContent = "ar";
        document.body.setAttribute("dir", "ltr");
      }
    });
  }
});

// ─── Sidebar Logic ───
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

// ESC يقفل
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hidesidebar();
});

// لو ضغط بره السايدبار
if (overlay) {
  overlay.addEventListener("click", hidesidebar);
}
