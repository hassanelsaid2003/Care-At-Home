/* ═══════════════════════════════════════════
   payment.js — Care at Home · Pro & Max
   All features: plan switch, billing toggle,
   live card preview, CVC flip, validation,
   loading state, confirmation page, toasts
═══════════════════════════════════════════ */

const PLANS = {
  pro: {
    name: "Pro plan",
    badge: "PRO",
    badgeClass: "badge-pro",
    btnClass: "pro",
    cardClass: "cf-pro",
    monthly: {
      price: "$20",
      label: "$20.00/month + tax",
      period: "Monthly",
      save: "Save 17%",
    },
    yearly: {
      price: "$200",
      label: "$200.00/year + tax",
      period: "Annually",
      save: "Save 17%",
    },
    included: [
      { t: "Health dashboard", d: "real-time vitals overview" },
      { t: "3 care providers", d: "add your family's doctors" },
      { t: "Medication reminders", d: "smart daily alerts" },
      { t: "Monthly health reports", d: "PDF export" },
      { t: "Chat support", d: "response within 2 hours" },
      { t: "Mobile app", d: "iOS & Android" },
    ],
  },
  max: {
    name: "Max plan",
    badge: "MAX",
    badgeClass: "badge-max",
    btnClass: "max",
    cardClass: "cf-max",
    monthly: {
      price: "$200",
      label: "$200.00/month + tax",
      period: "Monthly",
      save: "Save 19%",
    },
    yearly: {
      price: "$1,200",
      label: "$1,200.00/year + tax",
      period: "Annually",
      save: "Save 19%",
    },
    included: [
      { t: "Everything in Pro", d: "all Pro features included" },
      { t: "Unlimited providers", d: "entire care network covered" },
      { t: "AI health assistant", d: "24/7 symptom & advice AI" },
      { t: "Priority nurse on-call", d: "< 15 min response time" },
      { t: "Weekly specialist visits", d: "home or video call" },
      { t: "Advanced analytics", d: "predictive health insights" },
      { t: "Family accounts", d: "up to 6 members" },
      { t: "Dedicated care manager", d: "personal health coordinator" },
    ],
  },
};

let currentPlan = document.body.dataset.plan || "pro";
let currentBilling = "yearly";
let currentBrand = "VISA";

/* ── PLAN SWITCH ── */
function switchPlan(p) {
  currentPlan = p;
  document.getElementById("btn-pro").classList.toggle("active", p === "pro");
  document.getElementById("btn-max").classList.toggle("active", p === "max");
  updateIncluded();
  applyState();
}

/* ── BILLING TOGGLE ── */
function setBilling(b) {
  currentBilling = b;
  document
    .getElementById("card-monthly")
    .classList.toggle("active", b === "monthly");
  document
    .getElementById("card-yearly")
    .classList.toggle("active", b === "yearly");
  applyState();
}

/* ── WHAT'S INCLUDED ── */
function updateIncluded() {
  const p = PLANS[currentPlan];
  const titleEl = document.getElementById("inc-title");
  const listEl = document.getElementById("inc-list");
  if (!titleEl || !listEl) return;

  titleEl.textContent =
    "What's included in " + (currentPlan === "pro" ? "Pro" : "Max");
  const cls = currentPlan === "pro" ? "pro-check" : "max-check";
  listEl.innerHTML = p.included
    .map(
      (i) =>
        `<div class="inc-item">
      <div class="inc-check ${cls}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <span><b>${i.t}</b> — ${i.d}</span>
    </div>`,
    )
    .join("");
}

/* ── APPLY ALL STATE ── */
function applyState() {
  const plan = PLANS[currentPlan];
  const billing = plan[currentBilling];

  // Header
  document.getElementById("plan-title").textContent = plan.name;
  const badge = document.getElementById("plan-badge");
  badge.textContent = plan.badge;
  badge.className = "plan-badge " + plan.badgeClass;

  // Pricing cards
  document.getElementById("monthly-price").textContent = plan.monthly.label;
  document.getElementById("yearly-price").textContent = plan.yearly.label;
  const sb = document.getElementById("save-badge");
  sb.textContent = plan.yearly.save;
  sb.className = "save-badge" + (currentPlan === "max" ? " gold" : "");

  // Order details
  document.getElementById("order-plan-name").textContent = plan.name;
  document.getElementById("order-period").textContent = billing.period;
  document.getElementById("order-amount").innerHTML =
    billing.price + "<small>Incl. tax</small>";
  document.getElementById("subtotal").textContent = billing.price;
  document.getElementById("total").textContent = billing.price;
  document.getElementById("renew-amount").textContent = billing.label;

  // Subscribe button
  document.getElementById("sub-btn").className = "sub-btn " + plan.btnClass;

  // Summary (right panel)
  const vplan = document.getElementById("v-plan");
  if (vplan) vplan.textContent = currentPlan === "pro" ? "Pro" : "Max";
  const vbill = document.getElementById("v-billing");
  if (vbill)
    vbill.textContent = currentBilling === "yearly" ? "Yearly" : "Monthly";
  const vtotal = document.getElementById("v-total");
  if (vtotal) vtotal.textContent = billing.price;

  refreshCardStyle();
}

/* ── CARD BRAND DETECTION ── */
function detectBrand(num) {
  const n = num.replace(/\s/g, "");
  if (/^4/.test(n)) return "VISA";
  if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return "MC";
  if (/^3[47]/.test(n)) return "AMEX";
  return "VISA";
}

/* ── REFRESH CARD COLOUR ── */
function refreshCardStyle() {
  const flipper = document.getElementById("flipper");
  if (!flipper) return;
  const raw = (document.getElementById("card-number")?.value || "").replace(
    /\s/g,
    "",
  );
  let cc = PLANS[currentPlan].cardClass;
  if (raw) {
    const b = detectBrand(raw);
    cc = b === "MC" ? "cf-mc" : b === "AMEX" ? "cf-amex" : cc;
  }
  flipper.className =
    flipper.className.replace(/cf-\S+/g, "").trim() + " " + cc;
}

/* ── CARD FLIP (CVC focus) ── */
function flipCard(show) {
  document.getElementById("flipper")?.classList.toggle("flipped", show);
}

/* ── FORMAT CARD NUMBER ── */
function formatCardNumber(input) {
  let v = input.value.replace(/\D/g, "").substring(0, 16);
  let out = "";
  for (let i = 0; i < v.length; i++) {
    if (i && i % 4 === 0) out += " ";
    out += v[i];
  }
  input.value = out;
  currentBrand = detectBrand(v);

  const map = { mc: "MC", visa: "VISA", amex: "AMEX" };
  ["mc", "visa", "amex"].forEach((id) => {
    document
      .getElementById("logo-" + id)
      ?.classList.toggle("dim", v.length > 0 && map[id] !== currentBrand);
  });

  updateCard();
  refreshCardStyle();
  if (v.length > 0) clearError("card-number");
}

/* ── FORMAT EXPIRY ── */
function formatExpiry(input) {
  let v = input.value.replace(/\D/g, "").substring(0, 4);
  input.value = v.length > 2 ? v.slice(0, 2) + " / " + v.slice(2) : v;
  updateCard();
  if (v.length >= 4) clearError("card-expiry");
}

/* ── CVC INPUT (password dots) ── */
function onCvcInput(input) {
  const raw = input.value.replace(/\D/g, "");
  input.value = raw;
  const dots =
    "•".repeat(raw.length) || (currentBrand === "AMEX" ? "••••" : "•••");
  const el = document.getElementById("visa-cvc");
  if (el) el.textContent = dots;
  if (raw.length > 0) clearError("card-cvc");
}

/* ── UPDATE LIVE CARD DISPLAY ── */
function updateCard() {
  const raw = (document.getElementById("card-number")?.value || "").replace(
    /\s/g,
    "",
  );
  const name = document.getElementById("cardholder-name")?.value || "•••• ••••";
  const expiry = document.getElementById("card-expiry")?.value || "MM/YY";

  let display = "•••• •••• •••• ••••";
  if (raw) {
    const p = raw.padEnd(16, "•");
    display =
      p.slice(0, 4) +
      " " +
      p.slice(4, 8) +
      " " +
      p.slice(8, 12) +
      " " +
      p.slice(12, 16);
  }

  const brandNames = { VISA: "VISA", MC: "MASTERCARD", AMEX: "AMEX" };
  const el = (id) => document.getElementById(id);
  if (el("visa-number")) el("visa-number").textContent = display;
  if (el("visa-name")) el("visa-name").textContent = name || "•••• ••••";
  if (el("visa-expiry")) el("visa-expiry").textContent = expiry || "MM/YY";
  if (el("visa-brand"))
    el("visa-brand").textContent = brandNames[detectBrand(raw)] || "VISA";
  if (el("visa-sig")) el("visa-sig").textContent = name || "•••• ••••";
}

/* ── VALIDATION ── */
function showError(fieldId, msg) {
  const input = document.getElementById(fieldId);
  if (input) {
    input.classList.add("error");
    input.classList.remove("valid");
  }
  const err = document.getElementById("err-" + fieldId);
  if (err) {
    err.textContent = "⚠ " + msg;
    err.classList.add("show");
  }
}

function clearError(fieldId) {
  const input = document.getElementById(fieldId);
  if (input) {
    input.classList.remove("error");
    input.classList.add("valid");
  }
  const err = document.getElementById("err-" + fieldId);
  if (err) err.classList.remove("show");
}

function validateForm() {
  let valid = true;

  // Name
  const name = document.getElementById("cardholder-name").value.trim();
  if (name.length < 2) {
    showError("cardholder-name", "Enter the cardholder's full name");
    valid = false;
  } else clearError("cardholder-name");

  // Card number
  const num = document.getElementById("card-number").value.replace(/\s/g, "");
  if (num.length < 16) {
    showError("card-number", "Card number must be 16 digits");
    valid = false;
  } else clearError("card-number");

  // Expiry
  const expRaw = document
    .getElementById("card-expiry")
    .value.replace(/[\s\/]/g, "");
  if (expRaw.length < 4) {
    showError("card-expiry", "Enter a valid expiry date (MM/YY)");
    valid = false;
  } else {
    const mo = parseInt(expRaw.slice(0, 2));
    const yr = parseInt("20" + expRaw.slice(2));
    if (mo < 1 || mo > 12 || new Date(yr, mo - 1) < new Date()) {
      showError("card-expiry", "This card has expired");
      valid = false;
    } else clearError("card-expiry");
  }

  // CVC
  const cvcLen = currentBrand === "AMEX" ? 4 : 3;
  if (document.getElementById("card-cvc").value.trim().length < cvcLen) {
    showError("card-cvc", `Security code must be ${cvcLen} digits`);
    valid = false;
  } else clearError("card-cvc");

  // Terms
  if (!document.getElementById("terms").checked) {
    showToast("Please accept the terms to continue", "error");
    valid = false;
  }

  return valid;
}

/* ── SUBSCRIBE ── */
function handleSubscribe() {
  if (!validateForm()) return;
  const btn = document.getElementById("sub-btn");
  btn.disabled = true;
  btn.innerHTML = '<div class="spinner"></div> Processing payment…';
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = "🔒 Subscribe now";
    showConfirmation();
  }, 2200);
}

/* ── CONFIRMATION PAGE ── */
function showConfirmation() {
  const plan = PLANS[currentPlan];
  const billing = plan[currentBilling];
  const num = document.getElementById("card-number").value.replace(/\s/g, "");
  const masked = "•••• •••• •••• " + (num.slice(-4) || "••••");

  document.getElementById("confirm-plan").textContent = plan.name;
  document.getElementById("confirm-billing").textContent = billing.period;
  document.getElementById("confirm-card").textContent = masked;
  document.getElementById("confirm-amount").textContent = billing.price;

  document.getElementById("main-app").style.display = "none";
  document.getElementById("confirm-page").style.display = "flex";
}

function closeConfirmation() {
  document.getElementById("confirm-page").style.display = "none";
  document.getElementById("main-app").style.display = "block";
  showToast("Welcome to " + PLANS[currentPlan].name + "! 🎉", "success");
}

/* ── TOAST ── */
function showToast(msg, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast " + type;
  toast.innerHTML = `<span style="font-size:14px">${type === "success" ? "✅" : "❌"}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("hiding");
    setTimeout(() => toast.remove(), 220);
  }, 3000);
}

/* ── INIT ── */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-" + currentPlan)?.classList.add("active");
  document.getElementById("sub-btn").addEventListener("click", handleSubscribe);
  ["cardholder-name", "card-cvc"].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", () => {
      if (document.getElementById(id)?.value.trim()) clearError(id);
    });
  });
  updateIncluded();
  applyState();
});

/* ── MOBILE CARD PREVIEW (shows on ≤880px instead of right panel) ── */
function updateMobileCard() {
  const raw = (document.getElementById("card-number")?.value || "").replace(
    /\s/g,
    "",
  );
  const name =
    document.getElementById("cardholder-name")?.value || "Hassan Elsaid";
  const expiry = document.getElementById("card-expiry")?.value || "MM/YY";

  const mini = document.getElementById("mobile-card-mini");
  const mNum = document.getElementById("mobile-num");
  const mName = document.getElementById("mobile-name");
  const mDet = document.getElementById("mobile-detail");
  const mBr = document.getElementById("mobile-brand");
  if (!mini) return;

  // colour
  const brand = detectBrand(raw);
  const baseClass = PLANS[currentPlan].cardClass.replace("cf-", "");
  const colorClass = raw
    ? brand === "MC"
      ? "mc"
      : brand === "AMEX"
        ? "amex"
        : baseClass
    : baseClass;
  mini.className = "mobile-card-mini " + colorClass;

  // number display
  const masked =
    raw.length > 0
      ? "•••• •••• •••• " + raw.padEnd(16, "•").slice(12, 16)
      : "•••• •••• •••• ••••";
  if (mNum) mNum.textContent = masked;
  if (mName) mName.textContent = name || "Hassan Elsaid";
  if (mDet) mDet.textContent = "Expires " + (expiry || "MM/YY");
  if (mBr)
    mBr.textContent = { VISA: "VISA", MC: "MC", AMEX: "AMEX" }[brand] || "VISA";
}

