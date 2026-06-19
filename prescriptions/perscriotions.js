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
var currentLang = "en";
var toggleBtn = document.getElementById("lang-toggle");

toggleBtn.addEventListener("click", function () {
  if (currentLang === "en") {
    changeLanguage("ar");
    currentLang = "ar";
    toggleBtn.textContent = "en";
  } else {
    changeLanguage("en");
    currentLang = "en";
    toggleBtn.textContent = "ar";
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

/* ══════════════════════════════════════════════
   SCROLL REVEAL ANIMATIONS
   عناصر فيها [data-animate] بتظهر بحركة لما تدخل الشاشة
   ══════════════════════════════════════════════ */
(function () {
  var animatedItems = document.querySelectorAll("[data-animate]");
  if (!animatedItems.length) return;

  // تأخير مرحلي عن طريق data-delay (بالميلي ثانية)
  animatedItems.forEach(function (el) {
    var delay = el.getAttribute("data-delay");
    if (delay) {
      el.style.transitionDelay = delay + "ms";
    }
  });

  var revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");

          // لو العنصر فيه عداد رقمي جواه، شغّل العداد
          var counter = entry.target.querySelector
            ? entry.target.querySelector("[data-count]")
            : null;
          if (entry.target.hasAttribute("data-count")) {
            counter = entry.target;
          }
          var countersInside = entry.target.querySelectorAll
            ? entry.target.querySelectorAll("[data-count]")
            : [];
          countersInside.forEach(animateCounter);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  animatedItems.forEach(function (el) {
    revealObserver.observe(el);
  });
})();

/* ══════════════════════════════════════════════
   ANIMATED COUNTERS (الإحصائيات في سكشن How It Works)
   ══════════════════════════════════════════════ */
function animateCounter(el) {
  if (el.dataset.counted === "true") return;
  el.dataset.counted = "true";

  var target = parseInt(el.getAttribute("data-count"), 10) || 0;
  var duration = 1400;
  var startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = Math.min((timestamp - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(step);
}

/* ══════════════════════════════════════════════
   COPY TO CLIPBOARD (أرقام التواصل والإيميل)
   ══════════════════════════════════════════════ */
(function () {
  var copyEls = document.querySelectorAll(".copy-value[data-copy]");
  if (!copyEls.length) return;

  copyEls.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      var value = el.getAttribute("data-copy");

      function showToast() {
        var toast = el.querySelector(".copy-toast");
        if (!toast) {
          toast = document.createElement("span");
          toast.className = "copy-toast";
          toast.textContent = "Copied!";
          el.appendChild(toast);
        }
        toast.classList.add("show");
        clearTimeout(el._copyTimeout);
        el._copyTimeout = setTimeout(function () {
          toast.classList.remove("show");
        }, 1400);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(value)
          .then(showToast)
          .catch(function () {
            // fallback لو الكليبورد اتمنع
            window.location.href = el.closest("a") ? el.closest("a").href : "#";
          });
      } else {
        showToast();
      }
    });
  });
})();

/* ══════════════════════════════════════════════
   NEED HELP — CONTACT FORM (Call / Message)
   ══════════════════════════════════════════════ */
(function () {
  var form = document.getElementById("needHelpForm");
  if (!form) return;

  // ---- إعدادات التواصل الخاصة بالعيادة ----
  var CONTACT_PHONE = "+2012310378575"; //
  var CONTACT_EMAIL = "za9hl00l@gmail.com"; //
  var CONTACT_WHATSAPP = "201035207858"; //

  var tabs = form.parentElement.querySelectorAll(".contact-tab");
  var messageOnlyFields = form.querySelectorAll(".message-only");
  var emailInput = document.getElementById("hf-email");
  var submitBtn = form.querySelector(".submit-btn");
  var submitBtnText = form.querySelector(".submit-btn-text");
  var submitBtnIcon = submitBtn.querySelector("i");

  var currentMode = "call"; // call | message

  function setMode(mode) {
    currentMode = mode;

    tabs.forEach(function (tab) {
      var isActive = tab.getAttribute("data-tab") === mode;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    var isMessage = mode === "message";
    messageOnlyFields.forEach(function (field) {
      field.hidden = !isMessage;
    });

    if (emailInput) {
      if (isMessage) {
        emailInput.setAttribute("required", "required");
      } else {
        emailInput.removeAttribute("required");
        clearFieldError(emailInput);
      }
    }

    if (isMessage) {
      submitBtnIcon.className = "fa-solid fa-paper-plane";
      submitBtnText.textContent = "Send Message Now";
    } else {
      submitBtnIcon.className = "fa-solid fa-phone";
      submitBtnText.textContent = "Request A Call Now";
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      setMode(tab.getAttribute("data-tab"));
    });
  });

  // ---- فاليديشن ----
  function showFieldError(input) {
    var group = input.closest(".form-group");
    if (group) group.classList.add("error");
  }
  function clearFieldError(input) {
    var group = input.closest(".form-group");
    if (group) group.classList.remove("error");
  }

  function isValidPhone(value) {
    var digits = value.replace(/[^\d]/g, "");
    return digits.length >= 10;
  }
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateForm() {
    var valid = true;
    var nameInput = document.getElementById("hf-name");
    var phoneInput = document.getElementById("hf-phone");

    [nameInput, phoneInput].forEach(clearFieldError);
    if (emailInput) clearFieldError(emailInput);

    if (!nameInput.value.trim()) {
      showFieldError(nameInput);
      valid = false;
    }
    if (!isValidPhone(phoneInput.value)) {
      showFieldError(phoneInput);
      valid = false;
    }
    if (currentMode === "message" && emailInput) {
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        showFieldError(emailInput);
        valid = false;
      }
    }
    return valid;
  }

  // إزالة علامة الخطأ أول ما المستخدم يبدأ يكتب
  form.querySelectorAll("input, textarea").forEach(function (field) {
    field.addEventListener("input", function () {
      clearFieldError(field);
    });
  });

  // ---- الإرسال الفعلي ----
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    var name = document.getElementById("hf-name").value.trim();
    var phone = document.getElementById("hf-phone").value.trim();
    var specialtySelect = document.getElementById("hf-specialty");
    var specialty =
      specialtySelect.options[specialtySelect.selectedIndex].text !==
      "Select Specialty"
        ? specialtySelect.options[specialtySelect.selectedIndex].text
        : "";

    submitBtn.classList.add("is-loading");

    setTimeout(function () {
      if (currentMode === "call") {
        // طلب اتصال: نفتح واتساب للعيادة برسالة جاهزة فيها بيانات المريض
        var waText =
          "New Call Request\n" +
          "Name: " +
          name +
          "\n" +
          "Phone: " +
          phone +
          (specialty ? "\nSpecialty: " + specialty : "");
        var waUrl =
          "https://wa.me/" +
          CONTACT_WHATSAPP +
          "?text=" +
          encodeURIComponent(waText);
        window.open(waUrl, "_blank");
      } else {
        // إرسال رسالة: نفتح برنامج الإيميل برسالة جاهزة
        var email = document.getElementById("hf-email").value.trim();
        var messageField = document.getElementById("hf-message");
        var message = messageField ? messageField.value.trim() : "";

        var subject =
          "Message From " + name + (specialty ? " — " + specialty : "");
        var body =
          "Name: " +
          name +
          "\n" +
          "Phone: " +
          phone +
          "\n" +
          "Email: " +
          email +
          (specialty ? "\nSpecialty: " + specialty : "") +
          "\n\nMessage:\n" +
          (message || "—");

        var mailUrl =
          "mailto:" +
          CONTACT_EMAIL +
          "?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(body);
        window.location.href = mailUrl;
      }

      submitBtn.classList.remove("is-loading");
      submitBtn.classList.add("is-success");
      var originalText = submitBtnText.textContent;
      submitBtnText.textContent =
        currentMode === "call" ? "Opening WhatsApp..." : "Opening Email...";

      setTimeout(function () {
        submitBtn.classList.remove("is-success");
        submitBtnText.textContent = originalText;
        form.reset();
        setMode(currentMode);
      }, 2200);
    }, 600);
  });

  // الحالة الابتدائية
  setMode("call");
})();
