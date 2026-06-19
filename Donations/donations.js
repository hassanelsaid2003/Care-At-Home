/* ══ Google Translate ══════════════════════════════════ */
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en", includedLanguages: "en,ar" },
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

var script = document.createElement("script");
script.src =
  "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
document.body.appendChild(script);

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

/* ══ Animate rings on scroll ══════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  document
    .querySelectorAll(".don-card")
    .forEach((card) => observer.observe(card));

  /* ── Quick amount selector ── */
  const amountInput = document.getElementById("number");
  const qaButtons = document.querySelectorAll(".qa-btn");

  qaButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      qaButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (amountInput) amountInput.value = btn.dataset.amount;
    });
  });

  /* Clear active state when user types manually */
  if (amountInput) {
    amountInput.addEventListener("input", () => {
      qaButtons.forEach((b) => b.classList.remove("active"));
    });
  }

  /* ── Donate submit button validation ── */
  const donateLink = document.querySelector(".donate-submit");
  if (donateLink) {
    donateLink.addEventListener("click", (e) => {
      e.preventDefault();
      const phone = document.getElementById("phone")?.value.trim();
      const amount = document.getElementById("number")?.value.trim();
      if (!phone || !amount) {
        showToast(
          "Please fill in your phone number and donation amount.",
          "error",
        );
        return;
      }
      /* Proceed to payment page */
      window.location.href = "../payment completed/payment completed.html";
    });
  }

  /* ── Simple toast notification ── */
  function showToast(message, type = "info") {
    const existing = document.querySelector(".don-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "don-toast";
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: ${type === "error" ? "#ef4444" : "#6a51ff"};
      color: #fff;
      padding: 14px 28px;
      border-radius: 30px;
      font-family: Poppins, sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      box-shadow: 0 8px 24px rgba(0,0,0,0.18);
      z-index: 9999;
      opacity: 0;
      transition: all 0.35s ease;
      pointer-events: none;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(-50%) translateY(0)";
    });

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(10px)";
      setTimeout(() => toast.remove(), 350);
    }, 3000);
  }
});

/* ══ Sidebar ══════════════════════════════════════════ */
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

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hidesidebar();
});

/* ══ Patient Story Modal ══════════════════════════════ */
const patientStories = [
  {
    before:
      "He was 7 years old when he was diagnosed with leukemia. His condition was rapidly deteriorating and his family could not afford the ongoing cost of chemotherapy sessions.",
    journey:
      "He began an intensive chemotherapy program at Hospital 57357 that lasted several months, with regular blood tests and continuous monitoring by a dedicated pediatric oncology team.",
    after:
      "Alhamdulillah, he is now in the recovery phase. His hair is growing back, and he has returned to playing with his friends. Regular follow-ups continue to maintain his stability.",
  },
  {
    before:
      "He was suffering from severe arterial narrowing and a weakened heart muscle. His condition required urgent surgical intervention before complications became life-threatening.",
    journey:
      "He underwent a lengthy open-heart surgery followed by an intensive recovery period under close observation in the cardiac intensive care unit.",
    after:
      "By the grace of God, the operation was a success. He is now gradually recovering and has begun returning to normal daily activities under continuous medical supervision.",
  },
  {
    before:
      "After a serious accident, he lost the ability to move entirely and had been bedridden for a long time with little hope of improvement.",
    journey:
      "He began an intensive physical and rehabilitation therapy program with daily sessions focused on muscle strengthening and regaining balance, supervised by specialist therapists.",
    after:
      "He can now walk with the aid of a walker and his condition improves week by week. He is working hard to regain full independence.",
  },
  {
    before:
      "A family struggling with a chronically ill child faced tremendous difficulty affording the monthly cost of medications and essential medical supplies.",
    journey:
      "Thanks to donations, they began receiving a consistent monthly supply of medications and medical supplies without any interruption to treatment.",
    after:
      "The condition is now stable and treatment continues regularly. This has significantly relieved the family of a heavy financial and emotional burden.",
  },
  {
    before:
      "She was born two months premature and weighed far below normal. She needed immediate incubator care to stabilize her respiratory condition.",
    journey:
      "She spent several weeks in the neonatal intensive care unit under precise monitoring by a dedicated team of nurses and pediatric specialists.",
    after:
      "Alhamdulillah, her weight is increasing and her condition has stabilized. She has begun breathing normally and is close to going home.",
  },
  {
    before:
      "He suffered from serious dental problems that affected his speech and self-confidence, and could not afford the cost of treatment and dental restoration.",
    journey:
      "He underwent comprehensive dental cleaning, treatment, and restoration across several clinic visits under the supervision of a dental care team.",
    after:
      "He has fully regained his smile and his confidence. He can now laugh and speak freely in front of others without any embarrassment.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const storyOverlay = document.getElementById("storyOverlay");
  const closeBtn = document.getElementById("storyClose");
  const cards = document.querySelectorAll(".main1 .imag");

  if (!storyOverlay) return;

  function openStory(card, story) {
    const img = card.querySelector("img");
    const tag = card.querySelector(".story-tag");
    const title = card.querySelector("h2");

    const storyImg = document.getElementById("storyImg");
    storyImg.src = img.src;
    storyImg.alt = img.alt;
    document.getElementById("storyTag").textContent = tag
      ? tag.textContent
      : "";
    document.getElementById("storyTitle").textContent = title
      ? title.textContent
      : "";
    document.getElementById("storyBefore").textContent = story.before;
    document.getElementById("storyJourney").textContent = story.journey;
    document.getElementById("storyAfter").textContent = story.after;

    storyOverlay.classList.add("active");
    document.body.classList.add("no-scroll");
  }

  function closeStory() {
    storyOverlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  cards.forEach((card, i) => {
    const imgWrap = card.querySelector(".img");
    const story = patientStories[i];
    if (!imgWrap || !story) return;
    imgWrap.addEventListener("click", () => openStory(card, story));
  });

  closeBtn?.addEventListener("click", closeStory);
  storyOverlay.addEventListener("click", (e) => {
    if (e.target === storyOverlay) closeStory();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeStory();
  });
});
