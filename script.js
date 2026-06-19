/* ════════════════════════════════════════════════════════════
   CARE AT HOME — MAIN SCRIPT
   ════════════════════════════════════════════════════════════ */

/* ── Preloader ───────────────────────────────────────────── */
(function () {
  var preloader = document.getElementById("preloader");
  var fill = document.getElementById("preloaderBarFill");
  var percent = document.getElementById("preloaderPercent");
  if (!preloader) return;

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

/* ── Dropdown Desktop ────────────────────────────────────── */
function toggleDesktopDropdown(e) {
  e.stopPropagation();
  document.getElementById("desktopDropdown")?.classList.toggle("active");
}

/* ── Dropdown Mobile ─────────────────────────────────────── */
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
function toggleSidebar() {
  const sidebar = document.getElementById("mobileSidebar");
  const overlay = document.querySelector(".sidebar-overlay");

  sidebar?.classList.toggle("active");
  overlay?.classList.toggle("show");

  document.body.classList.toggle("no-scroll");
}

function hidesidebar() {
  const sidebar = document.getElementById("mobileSidebar");
  const overlay = document.querySelector(".sidebar-overlay");

  sidebar?.classList.remove("active");
  overlay?.classList.remove("show");

  document.body.classList.remove("no-scroll");
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
var toggleBtn = document.getElementById("lang-toggle");
if (toggleBtn) {
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
      toggleBtn.textContent = newLang === "en" ? "ar" : "en";
    }
    tryToggle();
  });
}

/* ── Subscribe Modal ─────────────────────────────────────── */
setTimeout(function () {
  var modal = document.getElementById("subscribeModal");
  if (modal) modal.classList.add("active");
}, 10000);

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

/* ── Back to top button ─────────────────────────────────── */
(function () {
  var btn = document.getElementById("backToTopBtn");
  if (!btn) return;

  var SHOW_AFTER_PX = 400;

  function toggleVisibility() {
    if (window.scrollY > SHOW_AFTER_PX) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  }

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
