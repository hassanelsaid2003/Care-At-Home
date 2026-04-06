function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,ar",
    },
    "google_translate_element",
  );
}

function changeLanguage(lang) {
  var select = document.querySelector(".goog-te-combo");
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event("change"));
  }
}

// تحميل سكريبت جوجل تلقائياً
var script = document.createElement("script");
script.src =
  "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
document.body.appendChild(script);

// منطق تبديل اللغة بزر واحد
var currentLang = "EN";
var toggleBtn = document.getElementById("lang-toggle");

toggleBtn.addEventListener("click", function () {
  if (currentLang === "EN") {
    changeLanguage("AR");
    currentLang = "AR";
    toggleBtn.textContent = "EN";
  } else {
    changeLanguage("EN");
    currentLang = "EN";
    toggleBtn.textContent = "AR";
  }
});
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
