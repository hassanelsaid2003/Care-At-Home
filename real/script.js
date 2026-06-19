/* ════════════════════════════════════════════════════════════
   CARE AT HOME — MAIN SCRIPT
   ════════════════════════════════════════════════════════════ */

/* ── Preloader ───────────────────────────────────────────── */
/* Runs the full animated loading screen only on the FIRST page
   of this browser session (sessionStorage persists across page
   navigations but is cleared when the tab/browser is actually
   closed). Every other page you navigate to in the same session
   skips it instantly — no flash, no reload feeling. */
(function () {
  var preloader = document.getElementById("preloader");
  var fill = document.getElementById("preloaderBarFill");
  var percent = document.getElementById("preloaderPercent");
  if (!preloader) return;

  var SESSION_KEY = "cah_session_started";
  var alreadyVisited = false;
  try {
    alreadyVisited = sessionStorage.getItem(SESSION_KEY) === "1";
  } catch (_) {}

  if (alreadyVisited) {
    /* Not the first page this session — skip the animation entirely. */
    preloader.remove();
    document.body.classList.remove("is-loading");
    return;
  }

  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch (_) {}

  var progress = 0;
  var loaded = false;

  function setProgress(val) {
    progress = Math.min(val, 100);
    if (fill) fill.style.width = progress + "%";
    if (percent) percent.textContent = Math.round(progress) + "%";
  }

  var ticker = setInterval(function () {
    var increment =
      progress < 70 ? Math.random() * 9 + 3 : Math.random() * 2 + 0.5;
    setProgress(progress + increment);
    if (progress >= 100) clearInterval(ticker);
    if (progress >= 100 && loaded) finish();
  }, 140);

  function finish() {
    clearInterval(ticker);
    setProgress(100);
    setTimeout(function () {
      preloader.classList.add("loaded");
      document.body.classList.remove("is-loading");
      setTimeout(function () {
        preloader.remove();
      }, 700);
    }, 280);
  }

  window.addEventListener("load", function () {
    loaded = true;
    if (progress >= 100) finish();
  });

  // Safety net: never let the preloader hang forever
  setTimeout(function () {
    loaded = true;
    finish();
  }, 6000);
})();

/* ── Sidebar ─────────────────────────────────────────────── */
/* (toggleSidebar / hidesidebar defined below, with no-scroll handling) */

/* ── User Account Dropdown (Desktop / Mobile) ───────────────── */
function toggleDesktopUserDropdown(e) {
  e.stopPropagation();
  document.getElementById("desktopUserDropdown")?.classList.toggle("active");
}
function toggleMobileUserDropdown(e) {
  e.stopPropagation();
  document.getElementById("mobileUserDropdown")?.classList.toggle("active");
}

/* ── Logout (placeholder) ─────────────────────────────────── */
function logout(e) {
  if (e) e.preventDefault();
  document
    .querySelectorAll(".dropdown")
    .forEach((d) => d.classList.remove("active"));
  hidesidebar();
  alert("you have been logged out.");
  window.location.href = "#logo";
}

// Close dropdowns on outside click
document.addEventListener("click", (e) => {
  document.querySelectorAll(".dropdown").forEach((d) => {
    if (!d.contains(e.target)) d.classList.remove("active");
  });
});
function toggleSidebar() {
  const sidebar = document.getElementById("mobileSidebar");
  const overlay = document.querySelector(".sidebar-overlay");
  const menuBtn = document.getElementById("menuBtn");

  const isActive = sidebar?.classList.toggle("active");
  overlay?.classList.toggle("show");

  document.body.classList.toggle("no-scroll");

  menuBtn?.setAttribute("aria-expanded", isActive ? "true" : "false");
  sidebar?.setAttribute("aria-hidden", isActive ? "false" : "true");
}

function hidesidebar() {
  const sidebar = document.getElementById("mobileSidebar");
  const overlay = document.querySelector(".sidebar-overlay");
  const menuBtn = document.getElementById("menuBtn");

  sidebar?.classList.remove("active");
  overlay?.classList.remove("show");

  document.body.classList.remove("no-scroll");

  menuBtn?.setAttribute("aria-expanded", "false");
  sidebar?.setAttribute("aria-hidden", "true");
}
/* ── Delivery Check ──────────────────────────────────────── */
function checkDelivery(event) {
  if (event) event.preventDefault();
  var zipInput =
    document.getElementById("zipInput") ||
    document.getElementById("zipInputMobile");
  var zipError = document.getElementById("zipError");
  if (zipError) zipError.textContent = "";
  var zip = (zipInput ? zipInput.value.trim() : "").replace(/[^\d]/g, "");
  var city = "Tanta";
  var query = encodeURIComponent(
    "pharmacies and hospitals near " + zip + ", " + city + ", Egypt",
  );
  window.open(
    "https://www.google.com/maps/search/" + query + "?t=" + Date.now(),
    "_blank",
  );
}

["checkBtn", "checkBtnMobile"].forEach(function (id) {
  var btn = document.getElementById(id);
  if (btn) btn.addEventListener("click", checkDelivery);
});

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
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(sc);
})();

var currentLang = "en";
var langToggleBtns = document.querySelectorAll(".lang-toggle");
if (langToggleBtns.length) {
  langToggleBtns.forEach(function (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var newLang = currentLang === "en" ? "ar" : "en";
      function tryToggle() {
        var select = document.querySelector(".goog-te-combo");
        if (!select) {
          setTimeout(tryToggle, 500);
          return;
        }
        select.value = newLang;
        select.dispatchEvent(new Event("change"));
        currentLang = newLang;
        var label = newLang === "en" ? "ar" : "en";
        langToggleBtns.forEach(function (b) {
          b.textContent = label;
        });
      }
      tryToggle();
    });
  });
}

/* ── Subscribe Modal ─────────────────────────────────────── */
/* Shows once per browser session (sessionStorage), not once per
   page navigation. Once it has shown (or the page that would have
   shown it has been visited), it stays quiet until the tab/browser
   is actually closed and reopened. */
(function () {
  var SUB_KEY = "cah_subscribe_shown";
  var alreadyShown = false;
  try {
    alreadyShown = sessionStorage.getItem(SUB_KEY) === "1";
  } catch (_) {}

  if (alreadyShown) return;

  setTimeout(function () {
    var modal = document.getElementById("subscribeModal");
    if (modal) modal.classList.add("active");
    try {
      sessionStorage.setItem(SUB_KEY, "1");
    } catch (_) {}
  }, 10000);
})();

function closeSubscribeModal() {
  var modal = document.getElementById("subscribeModal");
  if (modal) modal.classList.remove("active");
}

var subscribeModal = document.getElementById("subscribeModal");
if (subscribeModal) {
  subscribeModal.addEventListener("click", function (e) {
    if (e.target === this) closeSubscribeModal();
  });
}

/* ── Scroll Progress Bar ─────────────────────────────────── */
(function () {
  var bar = document.createElement("div");
  bar.className = "scroll-progress-bar";
  document.body.prepend(bar);
  window.addEventListener(
    "scroll",
    function () {
      var scrolled = window.scrollY;
      var total = document.documentElement.scrollHeight - window.innerHeight;
      var pct = total > 0 ? (scrolled / total) * 100 : 0;
      bar.style.width = pct.toFixed(1) + "%";
    },
    { passive: true },
  );
})();

/* ── Nav Shrink on Scroll ────────────────────────────────── */
(function () {
  var nav = document.querySelector("header .nav-bar nav");
  if (!nav) return;
  window.addEventListener(
    "scroll",
    function () {
      nav.classList.toggle("scrolled", window.scrollY > 60);
    },
    { passive: true },
  );
})();

/* ── Scroll Reveal ───────────────────────────────────────── */
(function () {
  var revealEls = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale, [data-reveal], " +
      ".dlivery .box, .cards1, .disease, .div, .boxing, " +
      ".diagnosis .diagn, .pharmacies .pharmacy, .got, .treatment, .see, .providers",
  );
  if (!revealEls.length) return;
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
  );

  revealEls.forEach(function (el) {
    var hasReveal =
      el.classList.contains("reveal") ||
      el.classList.contains("reveal-left") ||
      el.classList.contains("reveal-right") ||
      el.classList.contains("reveal-scale") ||
      el.hasAttribute("data-reveal");
    if (!hasReveal) el.classList.add("reveal");
    io.observe(el);
  });
})();

/* ── Stagger children ────────────────────────────────────── */
(function () {
  var staggerGroups = [
    { parent: ".dev", child: ".div" },
    { parent: ".pepere", child: ".cards1" },
    { parent: ".diseases", child: ".disease" },
    { parent: ".container", child: ".content" },
  ];
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var children = entry.target._staggerChildren;
        if (!children) return;
        children.forEach(function (child, i) {
          setTimeout(function () {
            child.style.opacity = "1";
            child.style.transform = "translateY(0)";
          }, i * 80);
        });
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.06 },
  );

  staggerGroups.forEach(function (group) {
    var parent = document.querySelector(group.parent);
    if (!parent) return;
    var children = parent.querySelectorAll(group.child);
    if (!children.length) return;
    children.forEach(function (child) {
      child.style.opacity = "0";
      child.style.transform = "translateY(28px)";
      child.style.transition =
        "opacity .55s cubic-bezier(.22,.61,.36,1), transform .55s cubic-bezier(.22,.61,.36,1)";
    });
    parent._staggerChildren = Array.from(children);
    io.observe(parent);
  });
})();

/* ── Counter Animation ───────────────────────────────────── */
function animateCounter(el, target, duration) {
  var start = 0;
  var step = (target / duration) * 16;
  var current = 0;
  var suffix = el.getAttribute("data-suffix") || "";
  var timer = setInterval(function () {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current) + suffix;
  }, 16);
}
(function () {
  var counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var target = parseFloat(entry.target.getAttribute("data-count"));
        animateCounter(entry.target, target, 1200);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach(function (el) {
    io.observe(el);
  });
})();

/* ── Card Tilt ───────────────────────────────────────────── */
(function () {
  var cards = document.querySelectorAll(".cards1, .div, .boxing");
  cards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      var y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
      card.style.transform =
        "translateY(-6px) rotateX(" + y + "deg) rotateY(" + x + "deg)";
    });
    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });
})();

/* ── Horizontal drag scroll ──────────────────────────────── */
(function () {
  var hScrollers = document.querySelectorAll(".diseases, .pepere, .dev");
  hScrollers.forEach(function (el) {
    var isDown = false,
      startX,
      scrollL;
    el.addEventListener("mousedown", function (e) {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollL = el.scrollLeft;
      el.style.cursor = "grabbing";
    });
    el.addEventListener("mouseleave", function () {
      isDown = false;
      el.style.cursor = "";
    });
    el.addEventListener("mouseup", function () {
      isDown = false;
      el.style.cursor = "";
    });
    el.addEventListener("mousemove", function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollL - (x - startX) * 1.4;
    });
  });
})();

/* ── Carousel Arrows & Dots ──────────────────────────────── */
(function () {
  var configs = [
    { trackId: "pepereScroll", itemSelector: ".cards1" },
    { trackId: "diseasesScroll", itemSelector: ".disease" },
    { trackId: "devScroll", itemSelector: ".div" },
  ];

  configs.forEach(function (cfg) {
    var track = document.getElementById(cfg.trackId);
    if (!track) return;

    var wrapper = track.closest(".scroll-wrapper");
    var leftArrow = wrapper
      ? wrapper.querySelector(".scroll-arrow--left")
      : null;
    var rightArrow = wrapper
      ? wrapper.querySelector(".scroll-arrow--right")
      : null;
    var dotsContainer = document.querySelector(
      '.scroll-dots[data-dots-for="' + cfg.trackId + '"]',
    );
    var dots = dotsContainer
      ? Array.from(dotsContainer.querySelectorAll(".scroll-dot"))
      : [];

    function getItems() {
      return Array.from(track.querySelectorAll(cfg.itemSelector));
    }

    function getStep() {
      var items = getItems();
      if (!items.length) return track.clientWidth;
      var item = items[0];
      var style = window.getComputedStyle(track);
      var gap = parseFloat(style.columnGap || style.gap || 0) || 0;
      return item.getBoundingClientRect().width + gap;
    }

    function maxScroll() {
      return track.scrollWidth - track.clientWidth;
    }

    function updateArrows() {
      if (!leftArrow || !rightArrow) return;
      var max = maxScroll();
      var atStart = track.scrollLeft <= 2;
      var atEnd = track.scrollLeft >= max - 2;
      leftArrow.classList.toggle("is-hidden", atStart || max <= 2);
      rightArrow.classList.toggle("is-hidden", atEnd || max <= 2);
    }

    function updateDots() {
      if (!dots.length) return;
      var max = maxScroll();
      var ratio = max > 0 ? track.scrollLeft / max : 0;
      var activeIndex = Math.round(ratio * (dots.length - 1));
      dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === activeIndex);
      });
    }

    function scrollByStep(dir) {
      track.scrollBy({ left: dir * getStep(), behavior: "smooth" });
    }

    if (leftArrow)
      leftArrow.addEventListener("click", function () {
        scrollByStep(-1);
      });
    if (rightArrow)
      rightArrow.addEventListener("click", function () {
        scrollByStep(1);
      });

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        var max = maxScroll();
        var target = dots.length > 1 ? (max * i) / (dots.length - 1) : 0;
        track.scrollTo({ left: target, behavior: "smooth" });
      });
    });

    track.addEventListener(
      "scroll",
      function () {
        updateArrows();
        updateDots();
      },
      { passive: true },
    );

    window.addEventListener("resize", function () {
      updateArrows();
      updateDots();
    });

    // Initial state (after layout settles)
    setTimeout(function () {
      updateArrows();
      updateDots();
    }, 300);
  });
})();

/* ── Chatbase ────────────────────────────────────────────── */
(function () {
  if (
    !window.chatbase ||
    (typeof window.chatbase === "function" &&
      window.chatbase("getState") !== "initialized")
  ) {
    window.chatbase = (...args) => {
      if (!window.chatbase.q) window.chatbase.q = [];
      window.chatbase.q.push(args);
    };
    window.chatbase = new Proxy(window.chatbase, {
      get(t, p) {
        if (p === "q") return t.q;
        return (...a) => t(p, ...a);
      },
    });
  }
  var onLoad = function () {
    var sc = document.createElement("script");
    sc.src = "https://www.chatbase.co/embed.min.js";
    sc.id = "ekZM4RmgBAVxeETvwY49B";
    document.body.appendChild(sc);
  };
  if (document.readyState === "complete") onLoad();
  else window.addEventListener("load", onLoad);
})();

/* ═══════════════════════════════════════════════════════════════
   ACCESSIBILITY MODULE v4 — Care At Home
   • TTS reads EVERYTHING: headings, links, paragraphs, buttons,
     images, inputs, landmarks, list items, divs with text
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  var ROOT = document.documentElement;
  var SYNTH = window.speechSynthesis || null;

  /* ─── localStorage ───────────────────────────────────────── */
  var STORE_KEY = "cah_a11y4";
  var DEF = {
    fontSize: 100,
    contrast: false,
    dyslexia: false,
    cursor: false,
    links: false,
    noAnim: false,
    focus: false,
    speed: 0.88,
    pitch: 1.0,
    tts: false,
  };
  var CFG = Object.assign({}, DEF);
  try {
    var _s = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    CFG = Object.assign({}, DEF, _s);
  } catch (_) {}
  function persist() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(CFG));
    } catch (_) {}
  }

  /* ─── ARIA live region ───────────────────────────────────── */
  var liveEl = document.getElementById("a11y-live");
  function announce(txt) {
    if (!liveEl) return;
    liveEl.textContent = "";
    setTimeout(function () {
      liveEl.textContent = txt;
    }, 80);
  }

  /* ═══════════════════════════════════════════════════════════
     TTS ENGINE — reads EVERYTHING
     ═══════════════════════════════════════════════════════════ */
  var ttsOn = false;
  /* lastDescribedEl declared in onHover scope below */
  var readTimer = null; /* debounce */

  /* Cached voices map — populated once voiceschanged fires */
  var _voices = { ar: null, en: null };

  function loadVoices() {
    if (!SYNTH) return;
    var vv = SYNTH.getVoices();
    /* Arabic — prefer local (on-device) */
    _voices.ar =
      vv.find(function (v) {
        return v.lang.startsWith("ar") && v.localService;
      }) ||
      vv.find(function (v) {
        return v.lang.startsWith("ar");
      }) ||
      null;
    /* English — prefer local (on-device) */
    _voices.en =
      vv.find(function (v) {
        return v.lang === "en-US" && v.localService;
      }) ||
      vv.find(function (v) {
        return v.lang.startsWith("en") && v.localService;
      }) ||
      vv.find(function (v) {
        return v.lang.startsWith("en");
      }) ||
      null;
  }

  /* Detect if text is primarily Arabic (>30% Arabic chars) */
  function isArabic(txt) {
    var arabicChars = (txt.match(/[\u0600-\u06FF]/g) || []).length;
    return arabicChars / txt.length > 0.25;
  }

  /* Split mixed text into segments — alternating AR / EN */
  function splitBilingual(txt) {
    /* regex: run of Arabic+spaces vs run of Latin+spaces */
    var segments = [];
    var ar =
      "[\u0600-\u06FF\u0660-\u0669\u200c-\u200f\u202a-\u202e،؛؟\u0621-\u064a\u0640\u064b-\u0652]";
    var re = new RegExp(
      "([" +
        ar.slice(1, -1) +
        "\\s\u064b-\u065f\u0670\u06d4-\u06d6]+|[^" +
        ar.slice(1, -1) +
        "]+)",
      "g",
    );
    var m;
    while ((m = re.exec(txt)) !== null) {
      var seg = m[0].trim();
      if (!seg) continue;
      var hasAr = /[\u0600-\u06FF]/.test(seg);
      segments.push({ text: seg, lang: hasAr ? "ar" : "en" });
    }
    return segments;
  }

  function rawSpeak(txt) {
    if (!SYNTH || !txt || !txt.trim()) return;
    SYNTH.cancel();

    /* If voices not loaded yet, do a quick reload */
    if (!_voices.ar && !_voices.en) loadVoices();

    var clean = txt.trim();
    var segs = splitBilingual(clean);

    /* Queue utterances; each gets correct voice + lang */
    segs.forEach(function (seg, idx) {
      var u = new SpeechSynthesisUtterance(seg.text);
      var isAr = seg.lang === "ar";

      u.voice = isAr
        ? _voices.ar || _voices.en || null
        : _voices.en || _voices.ar || null;
      u.lang = isAr ? "ar-SA" : "en-US";
      u.rate = isAr
        ? +CFG.speed || 0.88
        : Math.min(1.4, +CFG.speed * 1.1 || 1.0);
      u.pitch = +CFG.pitch || 1.0;

      /* cancel later segments if page changes — only mark first cancel */
      if (idx === 0)
        u.onstart = function () {
          /* started */
        };
      SYNTH.speak(u);
    });
  }

  function speak(txt) {
    clearTimeout(readTimer);
    readTimer = setTimeout(function () {
      rawSpeak(txt);
    }, 70);
  }

  /* ── Pure text of a node — strips hidden children, icons, arrows ── */
  function visibleText(el) {
    /* collect text from text-nodes only, skip aria-hidden children */
    var parts = [];
    el.childNodes.forEach(function (node) {
      if (node.nodeType === 3) {
        /* text node */
        var t = node.textContent.replace(/\s+/g, " ").trim();
        if (t) parts.push(t);
      } else if (node.nodeType === 1) {
        if (node.getAttribute("aria-hidden") === "true") return;
        var cs = window.getComputedStyle(node);
        if (cs.display === "none" || cs.visibility === "hidden") return;
        var inner = visibleText(node);
        if (inner) parts.push(inner);
      }
    });
    var joined = parts.join(" ").replace(/\s+/g, " ").trim();
    /* strip decorative symbols */
    joined = joined
      .replace(/[▼▶◀►◄→←↓↑]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    return joined.length > 200 ? joined.slice(0, 200) + "…" : joined;
  }

  /* ── State suffix (pressed / expanded / disabled) ─────────── */
  function stateSfx(el) {
    var parts = [];
    var p = el.getAttribute("aria-pressed");
    var x = el.getAttribute("aria-expanded");
    var c = el.getAttribute("aria-checked");
    var d =
      el.hasAttribute("disabled") ||
      el.getAttribute("aria-disabled") === "true";
    if (p === "true") parts.push("مفعّل");
    if (p === "false") parts.push("غير مفعّل");
    if (x === "true") parts.push("مفتوح");
    if (x === "false") parts.push("مغلق");
    if (c === "true") parts.push("محدد");
    if (c === "false") parts.push("غير محدد");
    if (d) parts.push("معطّل");
    return parts.length ? " — " + parts.join("، ") : "";
  }

  /* ── Master describe() — handles EVERY element type ──────── */
  function describe(el) {
    if (!el || el.nodeType !== 1) return "";
    if (el.getAttribute("aria-hidden") === "true") return "";
    try {
      var cs = window.getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return "";
    } catch (_) {}

    var tag = el.tagName.toLowerCase();
    var aria = (el.getAttribute("aria-label") || "").trim();
    var role = (el.getAttribute("role") || "").trim();
    var alt = (el.getAttribute("alt") || "").trim();
    var ttl = (el.getAttribute("title") || "").trim();
    var ph = (el.getAttribute("placeholder") || "").trim();
    /* always collect visible text — used by all branches */
    var txt = visibleText(el);

    /* ── LINK ──────────────────────────────────────────────── */
    if (tag === "a" || role === "link") {
      /* aria-label wins (we set descriptive ones on all links); always
         fall back to a generic label so a link is never silently skipped */
      var label = aria || txt || ttl || "رابط";
      return label + stateSfx(el);
    }

    /* ── BUTTON ─────────────────────────────────────────────── */
    if (tag === "button" || role === "button") {
      return (aria || txt || ttl || "زر") + stateSfx(el);
    }

    /* ── IMAGE ─────────────────────────────────────────────── */
    if (tag === "img") {
      var d = aria || alt || ttl;
      return d ? "صورة: " + d : "";
    }

    /* ── INPUT ─────────────────────────────────────────────── */
    if (tag === "input") {
      var itype = (el.type || "text").toLowerCase();
      if (itype === "hidden") return "";
      var iFor = el.id
        ? document.querySelector('label[for="' + el.id + '"]')
        : null;
      var iLbl = iFor ? visibleText(iFor) : aria || ph || ttl || "";
      var typeNames = {
        text: "حقل نصي",
        email: "حقل بريد إلكتروني",
        password: "حقل كلمة مرور",
        number: "حقل رقمي",
        search: "حقل بحث",
        tel: "حقل هاتف",
        url: "حقل رابط",
        date: "حقل تاريخ",
        checkbox: "مربع اختيار",
        radio: "زر اختيار",
        range: "شريط تمرير",
        submit: "زر إرسال",
        reset: "زر إعادة",
        button: "زر",
      };
      var iVal =
        el.value && itype !== "password" ? "، القيمة: " + el.value : "";
      return (
        (typeNames[itype] || "حقل إدخال") +
        (iLbl ? ": " + iLbl : "") +
        iVal +
        stateSfx(el)
      );
    }

    /* ── SELECT ─────────────────────────────────────────────── */
    if (tag === "select") {
      var sFor = el.id
        ? document.querySelector('label[for="' + el.id + '"]')
        : null;
      var sLbl = sFor ? visibleText(sFor) : aria || ttl || "قائمة اختيار";
      var sChosen =
        el.options && el.options[el.selectedIndex]
          ? el.options[el.selectedIndex].text
          : "";
      return "قائمة: " + sLbl + (sChosen ? "، المختار: " + sChosen : "");
    }

    /* ── TEXTAREA ───────────────────────────────────────────── */
    if (tag === "textarea") {
      var tFor = el.id
        ? document.querySelector('label[for="' + el.id + '"]')
        : null;
      var tLbl = tFor ? visibleText(tFor) : aria || ph || ttl || "حقل نص";
      return "حقل نص: " + tLbl;
    }

    /* ── HEADINGS h1-h6 ─────────────────────────────────────── */
    if (/^h[1-6]$/.test(tag)) {
      var htxt = aria || txt;
      return htxt ? "عنوان " + tag[1] + ": " + htxt : "";
    }

    /* ── PARAGRAPH ─────────────────────────────────────────── */
    if (tag === "p") {
      var ptxt = aria || txt;
      return ptxt || "";
    }

    /* ── LIST ITEM ─────────────────────────────────────────── */
    if (tag === "li") {
      return aria || txt || "";
    }

    /* ── TABLE CELL ─────────────────────────────────────────── */
    if (tag === "td" || tag === "th") {
      return aria || txt || "";
    }

    /* ── LABEL ─────────────────────────────────────────────── */
    if (tag === "label") {
      return aria || txt || "";
    }

    /* ── SPAN / DIV: read only if has direct text or aria-label ── */
    if (tag === "span" || tag === "div") {
      if (aria) return aria;
      /* collect text from direct text-node children only */
      var direct = "";
      el.childNodes.forEach(function (n) {
        if (n.nodeType === 3) {
          var t = n.textContent
            .replace(/\s+/g, " ")
            .trim()
            .replace(/[▼▶◀►◄→←↓↑]/g, "");
          if (t) direct += t + " ";
        }
      });
      return direct.trim() || "";
    }

    /* ── LANDMARKS: read section name, not full content ────── */
    var landmarks = {
      nav: "قسم التنقل",
      header: "ترويسة الصفحة",
      footer: "ذيل الصفحة",
      main: "المحتوى الرئيسي",
      section: "قسم",
      article: "مقالة",
      aside: "محتوى جانبي",
    };
    if (landmarks[tag]) {
      var lmTxt = aria || ttl;
      if (!lmTxt) {
        var lmH = el.querySelector("h1,h2,h3,h4,h5,h6");
        lmTxt = lmH ? visibleText(lmH) : "";
      }
      return landmarks[tag] + (lmTxt ? ": " + lmTxt : "");
    }

    return aria || "";
  }

  /* ── Hover reader ────────────────────────────────────────────
     Track the LAST TEXT spoken — not the element.
     This way hovering over a child (icon) then the parent (link)
     always reads the link because the text is different.
  ─────────────────────────────────────────────────────────────── */
  var lastSpokenText = "";

  function onHover(e) {
    if (!ttsOn) return;

    var t = e.target;
    if (!t || !t.tagName) return;

    /* If the pointer is anywhere on/inside a link, button, or form
       control — even a wrapping <li>/<span> around it, not just the
       <a> itself — that element's name always wins, spoken instantly
       with no debounce. This is what makes "hover a link → hear its
       name right away" reliable no matter which exact sub-node the
       browser reports as e.target. */
    var interactiveEl = t.closest
      ? t.closest("a,button,[role='button'],[role='link'],input,select,textarea")
      : null;
    if (interactiveEl && interactiveEl.getAttribute("aria-hidden") !== "true") {
      var dInt = describe(interactiveEl);
      if (dInt) {
        if (dInt !== lastSpokenText) {
          lastSpokenText = dInt;
          rawSpeak(dInt);
        }
        return;
      }
    }

    /* Otherwise fall back to the heading/text tree-walk */
    var node = t;
    var best = null;

    while (node && node !== document.documentElement) {
      if (!node.tagName) {
        node = node.parentElement;
        continue;
      }
      if (node.getAttribute("aria-hidden") === "true") {
        node = node.parentElement;
        continue;
      }

      var ntag = node.tagName.toLowerCase();
      var d = describe(node);

      if (d) {
        var isHeading = /^h[1-6]$/.test(ntag);
        var pri = isHeading ? 2 : 3;
        if (!best || pri < best.pri) best = { desc: d, pri: pri };
      }
      node = node.parentElement;
    }

    if (!best) return;
    /* Skip only consecutive identical text (prevents repeat while wiggling inside same element) */
    if (best.desc === lastSpokenText) return;
    lastSpokenText = best.desc;
    speak(best.desc);
  }

  /* Clear on every mouseleave from an interactive element so the next enter always reads */
  function onMouseLeave(e) {
    if (!ttsOn) return;
    var t = e.target;
    if (!t || !t.tagName) return;
    var tag = t.tagName.toLowerCase();
    if (tag === "a" || tag === "button" || tag === "li" || tag === "input") {
      lastSpokenText = "";
    }
  }

  /* ── Focus reader ────────────────────────────────────────── */
  function onFocus(e) {
    if (!ttsOn) return;
    var d = describe(e.target);
    /* if the focused element gives nothing, try immediate parent */
    if (!d && e.target.parentElement) d = describe(e.target.parentElement);
    /* Focus targets are virtually always interactive (links/buttons/
       inputs) — speak immediately so Tab-then-Enter never races a
       debounced timer against the click's navigation. */
    if (d) rawSpeak(d);
  }

  /* ── Does this <a> actually navigate away (vs. an in-page hook
     like a dropdown trigger or logout button)? ──────────────── */
  function isRealNavLink(a) {
    if (!a || a.tagName.toLowerCase() !== "a") return false;
    var tgt = a.getAttribute("target");
    if (tgt && tgt !== "_self") return false; /* opens elsewhere — current page never unloads */
    var raw = a.getAttribute("href") || "";
    if (!raw) return false;
    if (raw.charAt(0) === "#") return false; /* in-page anchor, no unload */
    if (/^javascript:/i.test(raw)) return false;
    if (/^(mailto|tel):/i.test(raw)) return false;
    return true;
  }

  /* ── Click reader ────────────────────────────────────────── */
  function onClick(e) {
    if (!ttsOn) return;
    var el = e.target.closest("a,button,[role='button'],[role='link'],input,select,textarea");
    if (!el) return;
    var d = describe(el);
    if (!d) return;

    /* Real navigational links: the browser starts tearing down the page
       the instant it navigates, which kills any pending/debounced speech
       before it can play. So: prevent the default nav, speak right away,
       then navigate ourselves once the announcement has had time to start. */
    if (isRealNavLink(el) && !(e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1)) {
      e.preventDefault();
      rawSpeak(d);
      var dest = el.href;
      setTimeout(function () {
        window.location.href = dest;
      }, 700);
      return;
    }

    /* Buttons & non-navigating links (dropdown triggers, logout, "#"
       placeholders): nothing tears the page down, so just speak now. */
    rawSpeak(d);
  }

  /* ── Enable / Disable TTS ────────────────────────────────── */
  function updateTTSBtn(on) {
    var btn = document.getElementById("a11y-tts-btn");
    if (!btn) return;
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    var lbl = btn.querySelector(".a11y-btn-label");
    var ico = btn.querySelector(".a11y-tts-ico");
    if (lbl) lbl.textContent = on ? "إيقاف القارئ" : "تشغيل القارئ";
    if (ico)
      ico.className = on
        ? "fa-solid fa-microphone a11y-tts-ico"
        : "fa-solid fa-play a11y-tts-ico";
  }

  function enableTTS() {
    if (!SYNTH) {
      announce("متصفحك لا يدعم قراءة الشاشة");
      return;
    }
    ttsOn = true;
    CFG.tts = true;
    lastSpokenText = "";
    document.addEventListener("mouseover", onHover, true);
    document.addEventListener("mouseleave", onMouseLeave, true);
    document.addEventListener("focusin", onFocus, true);
    document.addEventListener("click", onClick, true);
    updateTTSBtn(true);
    announce("تم تشغيل قارئ الشاشة");
    setTimeout(function () {
      rawSpeak("تم تشغيل قارئ الشاشة. حرّك المؤشر فوق أي عنصر لسماع وصفه.");
    }, 300);
    persist();
  }

  function disableTTS() {
    ttsOn = false;
    CFG.tts = false;
    clearTimeout(readTimer);
    SYNTH && SYNTH.cancel();
    lastSpokenText = "";
    document.removeEventListener("mouseover", onHover, true);
    document.removeEventListener("mouseleave", onMouseLeave, true);
    document.removeEventListener("focusin", onFocus, true);
    document.removeEventListener("click", onClick, true);
    updateTTSBtn(false);
    announce("تم إيقاف قارئ الشاشة");
    persist();
  }

  /* ═══════════════════════════════════════════════════════════
     FONT SIZE
     ═══════════════════════════════════════════════════════════ */
  function setFont(n) {
    CFG.fontSize = Math.min(200, Math.max(70, n));
    ROOT.style.fontSize = CFG.fontSize + "%";
    var lbl = document.getElementById("a11y-font-lbl");
    if (lbl) lbl.textContent = CFG.fontSize + "%";
    announce("حجم الخط " + CFG.fontSize + " بالمئة");
    persist();
  }

  /* ═══════════════════════════════════════════════════════════
     VISUAL TOGGLES
     ═══════════════════════════════════════════════════════════ */
  var CSS_CLASSES = {
    contrast: "a11y-hc",
    dyslexia: "a11y-dys",
    cursor: "a11y-cur",
    links: "a11y-lnk",
    noAnim: "a11y-na",
    focus: "a11y-foc",
  };

  function toggleVisual(key, btnId, onMsg, offMsg) {
    CFG[key] = !CFG[key];
    ROOT.classList.toggle(CSS_CLASSES[key], CFG[key]);
    var b = document.getElementById(btnId);
    if (b) b.setAttribute("aria-pressed", CFG[key] ? "true" : "false");
    announce(CFG[key] ? onMsg : offMsg);
    persist();
  }

  /* ═══════════════════════════════════════════════════════════
     APPLY SAVED STATE ON BOOT
     ═══════════════════════════════════════════════════════════ */
  function applyAll() {
    ROOT.style.fontSize = CFG.fontSize + "%";
    var fl = document.getElementById("a11y-font-lbl");
    if (fl) fl.textContent = CFG.fontSize + "%";

    Object.keys(CSS_CLASSES).forEach(function (k) {
      ROOT.classList.toggle(CSS_CLASSES[k], !!CFG[k]);
    });

    var spEl = document.getElementById("a11y-speed");
    var spLb = document.getElementById("a11y-speed-lbl");
    if (spEl) {
      spEl.value = CFG.speed;
      spEl.style.setProperty("--fill", ((CFG.speed - spEl.min) / (spEl.max - spEl.min)) * 100 + "%");
    }
    if (spLb) spLb.textContent = (+CFG.speed).toFixed(1) + "×";

    var piEl = document.getElementById("a11y-pitch");
    var piLb = document.getElementById("a11y-pitch-lbl");
    if (piEl) {
      piEl.value = CFG.pitch;
      piEl.style.setProperty("--fill", ((CFG.pitch - piEl.min) / (piEl.max - piEl.min)) * 100 + "%");
    }
    if (piLb) piLb.textContent = (+CFG.pitch).toFixed(1) + "×";

    [
      ["a11y-contrast", "contrast"],
      ["a11y-dyslexia", "dyslexia"],
      ["a11y-cursor", "cursor"],
      ["a11y-links", "links"],
      ["a11y-noanim", "noAnim"],
      ["a11y-focus", "focus"],
    ].forEach(function (p) {
      var b = document.getElementById(p[0]);
      if (b) b.setAttribute("aria-pressed", CFG[p[1]] ? "true" : "false");
    });

    updateTTSBtn(!!CFG.tts);
    if (CFG.tts) enableTTS();
  }

  /* ═══════════════════════════════════════════════════════════
     PANEL OPEN / CLOSE
     ═══════════════════════════════════════════════════════════ */
  var panel = document.getElementById("a11y-panel");
  var fabBtn = document.getElementById("a11y-widget-btn");
  var backdrop = document.getElementById("a11y-backdrop");

  function openPanel() {
    if (!panel) return;
    panel.classList.add("a11y-open");
    panel.setAttribute("aria-hidden", "false");
    if (backdrop) backdrop.classList.add("a11y-open");
    document.body.classList.add("no-scroll");
    if (fabBtn) fabBtn.setAttribute("aria-expanded", "true");
    setTimeout(function () {
      var cl = document.getElementById("a11y-close");
      if (cl) cl.focus();
    }, 60);
  }
  function closePanel() {
    if (!panel) return;
    panel.classList.remove("a11y-open");
    panel.setAttribute("aria-hidden", "true");
    if (backdrop) backdrop.classList.remove("a11y-open");
    document.body.classList.remove("no-scroll");
    if (fabBtn) fabBtn.setAttribute("aria-expanded", "false");
    if (fabBtn) fabBtn.focus();
  }

  if (backdrop) backdrop.addEventListener("click", closePanel);

  if (fabBtn)
    fabBtn.addEventListener("click", function () {
      panel && panel.classList.contains("a11y-open")
        ? closePanel()
        : openPanel();
    });

  var clBtn = document.getElementById("a11y-close");
  if (clBtn) clBtn.addEventListener("click", closePanel);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel && panel.classList.contains("a11y-open"))
      closePanel();
  });

  if (panel) {
    panel.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var ff = Array.from(
        panel.querySelectorAll("button:not([disabled]), input, [tabindex='0']"),
      );
      if (!ff.length) return;
      var first = ff[0],
        last = ff[ff.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════
     WIRE ALL CONTROLS
     ═══════════════════════════════════════════════════════════ */

  /* TTS toggle */
  var ttsBtnEl = document.getElementById("a11y-tts-btn");
  if (ttsBtnEl)
    ttsBtnEl.addEventListener("click", function () {
      ttsOn ? disableTTS() : enableTTS();
    });

  /* stop */
  var stopEl = document.getElementById("a11y-stop-btn");
  if (stopEl)
    stopEl.addEventListener("click", function () {
      clearTimeout(readTimer);
      SYNTH && SYNTH.cancel();
      announce("توقفت القراءة");
    });

  /* speed */
  var spEl2 = document.getElementById("a11y-speed");
  if (spEl2)
    spEl2.addEventListener("input", function () {
      CFG.speed = parseFloat(this.value).toFixed(2);
      this.style.setProperty("--fill", ((this.value - this.min) / (this.max - this.min)) * 100 + "%");
      var lb = document.getElementById("a11y-speed-lbl");
      if (lb) lb.textContent = (+CFG.speed).toFixed(1) + "×";
      persist();
    });

  /* pitch */
  var piEl2 = document.getElementById("a11y-pitch");
  if (piEl2)
    piEl2.addEventListener("input", function () {
      CFG.pitch = parseFloat(this.value).toFixed(2);
      this.style.setProperty("--fill", ((this.value - this.min) / (this.max - this.min)) * 100 + "%");
      var lb = document.getElementById("a11y-pitch-lbl");
      if (lb) lb.textContent = (+CFG.pitch).toFixed(1) + "×";
      persist();
    });

  /* font */
  var fInc = document.getElementById("a11y-finc");
  var fDec = document.getElementById("a11y-fdec");
  if (fInc)
    fInc.addEventListener("click", function () {
      setFont(CFG.fontSize + 10);
    });
  if (fDec)
    fDec.addEventListener("click", function () {
      setFont(CFG.fontSize - 10);
    });

  /* visual toggles */
  [
    [
      "a11y-contrast",
      "contrast",
      "تم تفعيل التباين العالي",
      "تم إلغاء التباين العالي",
    ],
    [
      "a11y-dyslexia",
      "dyslexia",
      "تم تفعيل خط عسر القراءة",
      "تم إلغاء خط عسر القراءة",
    ],
    [
      "a11y-cursor",
      "cursor",
      "تم تفعيل المؤشر الكبير",
      "تم إلغاء المؤشر الكبير",
    ],
    ["a11y-links", "links", "تم إبراز الروابط", "تم إلغاء إبراز الروابط"],
    ["a11y-noanim", "noAnim", "تم إيقاف الحركات", "تم تفعيل الحركات"],
    ["a11y-focus", "focus", "تم تفعيل تمييز التركيز", "تم إلغاء التمييز"],
  ].forEach(function (m) {
    var b = document.getElementById(m[0]);
    if (b)
      b.addEventListener("click", function () {
        toggleVisual(m[1], m[0], m[2], m[3]);
      });
  });

  /* reset */
  var resetEl = document.getElementById("a11y-reset");
  if (resetEl)
    resetEl.addEventListener("click", function () {
      if (ttsOn) disableTTS();
      clearTimeout(readTimer);
      SYNTH && SYNTH.cancel();
      CFG = Object.assign({}, DEF);
      Object.values(CSS_CLASSES).forEach(function (c) {
        ROOT.classList.remove(c);
      });
      ROOT.style.fontSize = "";
      applyAll();
      persist();
      announce("تم إعادة ضبط جميع الإعدادات");
    });

  /* ═══════════════════════════════════════════════════════════
     BOOT
     ═══════════════════════════════════════════════════════════ */
  function boot() {
    loadVoices(); /* cache voice references */
    applyAll();
  }

  if (SYNTH) {
    /* Chrome/Edge: getVoices() is async on first load */
    if (SYNTH.getVoices().length > 0) {
      boot();
    } else {
      SYNTH.addEventListener(
        "voiceschanged",
        function () {
          loadVoices();
          applyAll();
        },
        { once: true },
      );
      applyAll(); /* still apply visual state immediately */
    }
    /* Also re-cache on subsequent voiceschanged (some browsers fire multiple times) */
    SYNTH.addEventListener("voiceschanged", loadVoices);
  } else {
    applyAll();
  }
});

/* ═══════════════════════════════════════════════════════════════
   SCROLL TO TOP — floating button
   Appears once the page is scrolled down a bit, hidden at the top.
   Hidden from tab order + screen readers while invisible so it
   never grabs keyboard focus or gets announced when off-screen.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  var btn = document.getElementById("scrollTopBtn");
  if (!btn) return;

  var SHOW_AFTER = 320; /* px scrolled before the button appears */
  var visible = false;

  function setVisible(v) {
    if (v === visible) return;
    visible = v;
    btn.classList.toggle("is-visible", v);
    if (v) {
      btn.removeAttribute("tabindex");
      btn.removeAttribute("aria-hidden");
    } else {
      btn.setAttribute("tabindex", "-1");
      btn.setAttribute("aria-hidden", "true");
    }
  }

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    setVisible(y > SHOW_AFTER);
  }

  /* starts hidden */
  btn.setAttribute("tabindex", "-1");
  btn.setAttribute("aria-hidden", "true");

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); /* in case the page loads already scrolled down */

  window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
})();

/* ═══════════════════════════════════════════════════════════════
   FLOATING "SPEAK TO A DOCTOR" CTA
   Mirrors the original hero button (same href/aria-label) and
   appears once that hero button scrolls out of view, so the two
   never show on screen at the same time.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  var floatBtn = document.getElementById("floatingDoctorBtn");
  var originalBtn = document.querySelector(".botn1 a");
  if (!floatBtn) return;

  var visible = false;
  function setVisible(v) {
    if (v === visible) return;
    visible = v;
    floatBtn.classList.toggle("is-visible", v);
    if (v) {
      floatBtn.removeAttribute("tabindex");
      floatBtn.removeAttribute("aria-hidden");
    } else {
      floatBtn.setAttribute("tabindex", "-1");
      floatBtn.setAttribute("aria-hidden", "true");
    }
  }

  /* starts hidden */
  floatBtn.setAttribute("tabindex", "-1");
  floatBtn.setAttribute("aria-hidden", "true");

  if (originalBtn && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        setVisible(!entries[0].isIntersecting);
      },
      { threshold: 0 },
    );
    io.observe(originalBtn);
  } else {
    /* fallback for older browsers / missing hero button: same
       threshold the scroll-to-top button uses */
    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY || document.documentElement.scrollTop || 0;
        setVisible(y > 320);
      },
      { passive: true },
    );
  }
})();
