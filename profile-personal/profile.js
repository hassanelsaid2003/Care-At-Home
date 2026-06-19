/* ══════════════ SIDEBAR ══════════════ */
function showsidebar() {
  document.querySelector(".sidebar").classList.add("active");
}
function hidesidebar() {
  document.querySelector(".sidebar").classList.remove("active");
}

/* ══════════════ MODAL ══════════════ */
function closeModal(e) {
  if (e.target === document.getElementById("infoModal")) closeModalBtn();
}
function closeModalBtn() {
  document.getElementById("infoModal").classList.remove("open");
}

/* ══════════════ DATA ══════════════ */
const DATA = {
  op1: {
    type: "operation",
    title: "Open Heart Surgery",
    hospital: "Kasr Al-Aini Hospital - Cairo",
    flag: "./image/Flag_of_Egypt.svg.png",
    doctor: "Dr. Ahmed Mostafa Al-Najjar",
    date: "15 Jan 2025",
    time: "10:00 AM",
    duration: "6 hours",
    cost: "45,000 EGP",
    room: "Operating Room No. 3",
    status: "done-op",
    statusText: "Surgery completed successfully",
    statusIcon: "check_circle",
    notes:
      "Surgery was completed successfully. Patient requires monthly follow-up for 6 months.",
  },
  op2: {
    type: "operation",
    title: "Appendectomy",
    hospital: "Mansoura University Hospital",
    flag: "./image/Flag_of_Egypt.svg.png",
    doctor: "Dr. Mohamed Sami Abdullah",
    date: "3 Mar 2025",
    time: "2:00 PM",
    duration: "1.5 hours",
    cost: "8,500 EGP",
    room: "Operating Room No. 7",
    status: "done-op",
    statusText: "Surgery completed successfully",
    statusIcon: "check_circle",
    notes:
      "Simple and successful surgery. Discharge after 24 hours of monitoring.",
  },
  op3: {
    type: "operation",
    title: "Cervical Disc Surgery",
    hospital: "Sheikh Zayed Specialized Hospital",
    flag: "./image/Flag_of_Egypt.svg.png",
    doctor: "Dr. Tarek Abdulaziz Hussein",
    date: "20 Apr 2025",
    time: "8:00 AM",
    duration: "3 hours",
    cost: "22,000 EGP",
    room: "Operating Room No. 1",
    status: "done-op",
    statusText: "Surgery completed successfully",
    statusIcon: "check_circle",
    notes:
      "Significant improvement after surgery. 3 physical therapy sessions required for full recovery.",
  },
  op4: {
    type: "operation",
    title: "Cataract Surgery",
    hospital: "National Eye Institute - Cairo",
    flag: "./image/Flag_of_Egypt.svg.png",
    doctor: "Dr. Sami Ibrahim Al-Shafi",
    date: "10 Jun 2025",
    time: "12:00 PM",
    duration: "45 minutes",
    cost: "12,000 EGP",
    room: "Laser Suite",
    status: "ongoing",
    statusText: "Upcoming appointment - awaiting surgery",
    statusIcon: "schedule",
    notes:
      "Surgery will use modern Phaco technique. Driving is not allowed after the procedure.",
  },
  ses1: {
    type: "session",
    title: "Physical Therapy Session",
    hospital: "Tanta University Hospital",
    flag: "./image/Flag_of_Egypt.svg.png",
    doctor: "Dr. Rania Kamal Yousef",
    date: "5 Feb 2025",
    time: "11:00 AM",
    duration: "60 minutes",
    cost: "350 EGP",
    sessions: "Session 3 of 10",
    status: "ongoing",
    statusText: "Sessions ongoing - 7 sessions remaining",
    statusIcon: "pending",
    notes:
      "Noticeable improvement in spine mobility. Daily 30-minute walks recommended.",
  },
  ses2: {
    type: "session",
    title: "Chemotherapy Session",
    hospital: "National Cancer Institute",
    flag: "./image/Flag_of_Egypt.svg.png",
    doctor: "Dr. Hisham Fouad Al-Rifai",
    date: "18 Feb 2025",
    time: "9:00 AM",
    duration: "4 hours",
    cost: "3,200 EGP",
    sessions: "Session 2 of 6",
    status: "ongoing",
    statusText: "Protocol ongoing - 4 sessions remaining",
    statusIcon: "pending",
    notes:
      "Good response to treatment. Increase fluids and avoid crowded places.",
  },
  ses3: {
    type: "session",
    title: "Dialysis Session",
    hospital: "Kidney & Urology Hospital",
    flag: "./image/Flag_of_Egypt.svg.png",
    doctor: "Dr. Amr Abdulrahman Al-Sayed",
    date: "22 Feb 2025",
    time: "7:00 AM",
    duration: "4 hours",
    cost: "1,800 EGP",
    sessions: "Regular weekly session",
    status: "ongoing",
    statusText: "Regular sessions - every week",
    statusIcon: "autorenew",
    notes: "Creatinine levels are stable. Low-potassium diet is required.",
  },
  ses4: {
    type: "session",
    title: "Psychiatry Session",
    hospital: "Abbassia Mental Health Hospital",
    flag: "./image/Flag_of_Egypt.svg.png",
    doctor: "Dr. Noha Mohamed Al-Taher",
    date: "1 Mar 2025",
    time: "3:00 PM",
    duration: "50 minutes",
    cost: "500 EGP",
    sessions: "Session 1 of 8",
    status: "healed",
    statusText: "All sessions completed successfully",
    statusIcon: "sentiment_satisfied",
    notes:
      "Great improvement in mental health. Continue meditation and exercise.",
  },
  don1: {
    type: "donation",
    title: "Children Hospital Fund",
    hospital: "Abu Al-Reesh Children Hospital - Cairo",
    flag: "./image/Flag_of_Egypt.svg.png",
    amount: "500 EGP",
    goal: "50,000 EGP",
    raised: "47,200 EGP",
    date: "12 Jan 2025",
    beneficiary: "Cancer-stricken children (under 10 years)",
    purpose: "Providing medical monitoring devices for ICU",
    status: "healed",
    statusText: "✅ Healed - all beneficiary children have recovered",
    statusIcon: "favorite",
    notes:
      "Your donation helped purchase a monitor for 12 children. Campaign completed successfully!",
  },
  don2: {
    type: "donation",
    title: "Medical Equipment Fund",
    hospital: "57357 Children Cancer Hospital",
    flag: "./image/Flag_of_Egypt.svg.png",
    amount: "750 EGP",
    goal: "120,000 EGP",
    raised: "115,800 EGP",
    date: "3 Feb 2025",
    beneficiary: "Children with leukemia",
    purpose: "Purchasing digital blood pressure monitors and care tools",
    status: "healed",
    statusText: "✅ Healed - 8 children recovered thanks to this equipment",
    statusIcon: "favorite",
    notes: "Hospital 57357 thanks you. 3 medical devices were fully funded.",
  },
  don3: {
    type: "donation",
    title: "Cancer Research Support",
    hospital: "National Cancer Institute - Cairo",
    flag: "./image/Flag_of_Egypt.svg.png",
    amount: "400 EGP",
    goal: "200,000 EGP",
    raised: "182,000 EGP",
    date: "20 Mar 2025",
    beneficiary: "Breast and colon cancer patients",
    purpose: "Funding scientific research for a new treatment protocol",
    status: "ongoing",
    statusText: "🔬 Research ongoing - initial results are positive",
    statusIcon: "science",
    notes:
      "Research is in clinical trials phase. Results will be published in 2026.",
  },
  don4: {
    type: "donation",
    title: "Elderly Care Fund",
    hospital: "Al-Haram University Hospital",
    flag: "./image/Flag_of_Egypt.svg.png",
    amount: "300 EGP",
    goal: "30,000 EGP",
    raised: "29,500 EGP",
    date: "5 Apr 2025",
    beneficiary: "Elderly over 70 years without a guardian",
    purpose: "Providing daily meals and medicine for elderly patients",
    status: "healed",
    statusText: "✅ Completed - 45 elderly benefit monthly",
    statusIcon: "elderly",
    notes:
      "Your donation funds a lunch for an elderly person every day for a full month.",
  },
  don5: {
    type: "donation",
    title: "Eye Surgery Fund",
    hospital: "National Eye Institute",
    flag: "./image/Flag_of_Egypt.svg.png",
    amount: "250 EGP",
    goal: "80,000 EGP",
    raised: "61,000 EGP",
    date: "18 May 2025",
    beneficiary: "Low-income glaucoma patients",
    purpose: "Performing free glaucoma surgeries for low-income patients",
    status: "ongoing",
    statusText: "⏳ Campaign ongoing - still needs support",
    statusIcon: "visibility",
    notes:
      "Campaign reached 76% of goal. 4 patients are waiting for the campaign to complete their surgeries.",
  },
  don6: {
    type: "donation",
    title: "Orphan Support Campaign",
    hospital: "Benha University Hospital",
    flag: "./image/Flag_of_Egypt.svg.png",
    amount: "250 EGP (of 800 EGP)",
    goal: "800 EGP",
    raised: "250 EGP",
    date: "1 Jun 2025",
    beneficiary: "Orphan children in care homes - Qalyubia Governorate",
    purpose:
      "Providing periodic medical check-ups and vaccinations for orphans",
    status: "ongoing",
    statusText: "🔄 Donation ongoing - 550 EGP remaining for the goal",
    statusIcon: "child_care",
    notes:
      "You donated 250 EGP so far. You can donate the remaining amount to complete the campaign.",
  },
};

/* ══════════════ OPEN MODAL ══════════════ */
function openModal(id) {
  const d = DATA[id];
  if (!d) return;
  const typeLabel = {
    operation: "Surgical Operation",
    session: "Treatment Session",
    donation: "Donation",
  };
  const typeCls = { operation: "op", session: "ses", donation: "don" };
  const typeIcon = {
    operation: "medical_services",
    session: "healing",
    donation: "volunteer_activism",
  };
  let extraRows = "";
  if (d.type === "operation") {
    extraRows = `<div class="modal-row"><span class="material-symbols-outlined">person</span><strong>Surgeon:</strong>${d.doctor}</div><div class="modal-row"><span class="material-symbols-outlined">calendar_today</span><strong>Date & Time:</strong>${d.date} at ${d.time}</div><div class="modal-row"><span class="material-symbols-outlined">timer</span><strong>Duration:</strong>${d.duration}</div><div class="modal-row"><span class="material-symbols-outlined">meeting_room</span><strong>Operating Room:</strong>${d.room}</div><div class="modal-row"><span class="material-symbols-outlined">payments</span><strong>Total Cost:</strong><span style="color:var(--primary);font-weight:700;">${d.cost}</span></div><div class="modal-row"><span class="material-symbols-outlined">local_hospital</span><strong>Hospital:</strong>${d.hospital}</div>`;
  } else if (d.type === "session") {
    extraRows = `<div class="modal-row"><span class="material-symbols-outlined">person</span><strong>Specialist:</strong>${d.doctor}</div><div class="modal-row"><span class="material-symbols-outlined">calendar_today</span><strong>Date & Time:</strong>${d.date} at ${d.time}</div><div class="modal-row"><span class="material-symbols-outlined">timer</span><strong>Session Length:</strong>${d.duration}</div><div class="modal-row"><span class="material-symbols-outlined">repeat</span><strong>Progress:</strong>${d.sessions}</div><div class="modal-row"><span class="material-symbols-outlined">payments</span><strong>Cost Per Session:</strong><span style="color:var(--primary);font-weight:700;">${d.cost}</span></div><div class="modal-row"><span class="material-symbols-outlined">local_hospital</span><strong>Hospital:</strong>${d.hospital}</div>`;
  } else {
    const pct =
      Math.round(
        (parseInt(d.raised.replace(/[^0-9]/g, "")) /
          parseInt(d.goal.replace(/[^0-9]/g, ""))) *
          100,
      ) || 0;
    extraRows = `<div class="modal-row"><span class="material-symbols-outlined">volunteer_activism</span><strong>Your Donation:</strong><span style="color:var(--green);font-weight:700;">${d.amount}</span></div><div class="modal-row"><span class="material-symbols-outlined">flag</span><strong>Campaign Goal:</strong>${d.goal}</div><div class="modal-row"><span class="material-symbols-outlined">trending_up</span><strong>Amount Raised:</strong>${d.raised}</div><div style="padding:0 14px 10px;"><div style="height:8px;background:#ede9ff;border-radius:99px;overflow:hidden;"><div style="height:100%;width:${pct}%;background:linear-gradient(90deg,#6c47ff,#3d1fa8);border-radius:99px;"></div></div><p style="font-size:.72rem;color:var(--text-soft);margin-top:5px;">${pct}% of goal reached</p></div><div class="modal-row"><span class="material-symbols-outlined">calendar_today</span><strong>Donation Date:</strong>${d.date}</div><div class="modal-row"><span class="material-symbols-outlined">people</span><strong>Beneficiary:</strong>${d.beneficiary}</div><div class="modal-row"><span class="material-symbols-outlined">info</span><strong>Purpose:</strong>${d.purpose}</div><div class="modal-row"><span class="material-symbols-outlined">local_hospital</span><strong>Hospital:</strong>${d.hospital}</div>`;
  }
  document.getElementById("modalContent").innerHTML =
    `<div class="modal-header"><img src="${d.flag}" alt=""><div class="modal-header-text"><h2>${d.title}</h2><p>${d.hospital}</p></div></div><span class="modal-type-badge ${typeCls[d.type]}"><span class="material-symbols-outlined">${typeIcon[d.type]}</span>${typeLabel[d.type]}</span>${extraRows}<div class="modal-row" style="align-items:flex-start;background:#faf9ff;border-radius:10px;padding:12px 14px;"><span class="material-symbols-outlined" style="margin-top:0;">lightbulb</span><div><strong style="display:block;margin-bottom:5px;font-size:.82rem;">Doctor's Notes</strong><span style="font-size:.84rem;color:var(--text-mid);line-height:1.6;">${d.notes}</span></div></div><div class="modal-status ${d.status}"><span class="material-symbols-outlined">${d.statusIcon}</span>${d.statusText}</div>`;
  document.getElementById("infoModal").classList.add("open");
}

/* ══════════════ NOTIFICATIONS ══════════════ */
const NOTIFICATIONS = [
  {
    id: 1,
    type: "appt",
    icon: "event",
    title: "upcoming appointment",
    body: "Cardiology follow-up on Jun 24 at 10:00 AM",
    time: "2h ago",
    unread: true,
  },
  {
    id: 2,
    type: "rx",
    icon: "medication",
    title: "prescription refill due",
    body: "Metformin 500mg — refill in 5 days",
    time: "5h ago",
    unread: true,
  },
  {
    id: 3,
    type: "alert",
    icon: "warning",
    title: "blood sugar alert",
    body: "Your HbA1c is 6.8% — follow-up recommended",
    time: "1d ago",
    unread: true,
  },
  {
    id: 4,
    type: "don",
    icon: "volunteer_activism",
    title: "donation confirmed",
    body: "Eye Surgery Fund — 250 EGP received",
    time: "2d ago",
    unread: false,
  },
  {
    id: 5,
    type: "appt",
    icon: "local_hospital",
    title: "surgery reminder",
    body: "Cataract surgery scheduled for Jul 10",
    time: "3d ago",
    unread: false,
  },
];

function renderNotifications() {
  const list = document.getElementById("notifList");
  if (!list) return;
  list.innerHTML = NOTIFICATIONS.map(
    (n) => `
    <div class="notif-item ${n.unread ? "unread" : ""}" data-id="${n.id}" onclick="markRead(${n.id})">
      <div class="ni-icon ${n.type}"><span class="material-symbols-outlined">${n.icon}</span></div>
      <div class="notif-body">
        <h4>${n.title}</h4>
        <p>${n.body}</p>
        <span class="notif-time">${n.time}</span>
      </div>
      ${n.unread ? '<div class="unread-dot"></div>' : ""}
    </div>
  `,
  ).join("");
  updateBadge();
}

function updateBadge() {
  const badge = document.getElementById("notifBadge");
  const count = NOTIFICATIONS.filter((n) => n.unread).length;
  if (badge) {
    badge.textContent = count;
    badge.style.display = count ? "flex" : "none";
  }
}

function markRead(id) {
  const n = NOTIFICATIONS.find((x) => x.id === id);
  if (n) {
    n.unread = false;
    renderNotifications();
  }
}

function markAllRead() {
  NOTIFICATIONS.forEach((n) => (n.unread = false));
  renderNotifications();
}

function toggleNotif(e) {
  e.stopPropagation();
  const panel = document.getElementById("notifPanel");
  panel.classList.toggle("open");
}

/* ══════════════ DOM READY ══════════════ */
document.addEventListener("DOMContentLoaded", () => {
  /* close notif panel on outside click */
  document.addEventListener("click", (e) => {
    const panel = document.getElementById("notifPanel");
    const btn = document.getElementById("notifBtn");
    if (
      panel &&
      !panel.contains(e.target) &&
      e.target !== btn &&
      !btn.contains(e.target)
    ) {
      panel.classList.remove("open");
    }
  });

  /* render notifications */
  renderNotifications();

  /* ── ring carousel ── */
  const transactions = [
    {
      title: "egypt",
      by: "by hassan elsaid",
      percent: 70,
      flag: "./image/Flag_of_Egypt.svg.png",
    },
    {
      title: "usa",
      by: "by dr. john",
      percent: 50,
      flag: "https://flagcdn.com/w80/us.png",
    },
    {
      title: "france",
      by: "by dr. pierre",
      percent: 80,
      flag: "https://flagcdn.com/w80/fr.png",
    },
  ];
  let idx = 0;
  const titleDiv = document.querySelector(".tit h3");
  const byDiv = document.querySelector(".tit p");
  const percentDiv = document.querySelector(".number p");
  const flagImg = document.getElementById("transFlag");
  const ringCircle = document.getElementById("ringCircle");
  const CIRC = 2 * Math.PI * 30;

  function setRing(p) {
    if (ringCircle) ringCircle.style.strokeDashoffset = CIRC - (p / 100) * CIRC;
  }
  function animateText(el, cls) {
    el.classList.remove("slide-in-left", "slide-in-right");
    void el.offsetWidth;
    el.classList.add(cls);
  }
  function updateTransaction(i, dir = "next") {
    const cls = dir === "next" ? "slide-in-right" : "slide-in-left";
    const t = transactions[i];
    animateText(titleDiv, cls);
    animateText(byDiv, cls);
    animateText(percentDiv, cls);
    titleDiv.textContent = t.title;
    byDiv.textContent = t.by;
    percentDiv.textContent = t.percent + "%";
    if (flagImg) flagImg.src = t.flag;
    setRing(t.percent);
  }
  updateTransaction(idx);
  document.querySelector(".circle .arrow")?.addEventListener("click", (e) => {
    e.preventDefault();
    if (idx > 0) {
      idx--;
      updateTransaction(idx, "prev");
    }
  });
  document
    .querySelector(".circle a:nth-child(2)")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      if (idx < transactions.length - 1) {
        idx++;
        updateTransaction(idx, "next");
      }
    });

  /* ── clickable cards ── */
  document.querySelectorAll(".clickable-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const id = card.dataset.id;
      if (id) openModal(id);
    });
  });

  /* ── tabs ── */
  const tabLinks = document.querySelectorAll(".about .street a");
  const panels = {
    all: document.getElementById("tab-all"),
    operations: document.getElementById("tab-operations"),
    sessions: document.getElementById("tab-sessions"),
    donations: document.getElementById("tab-donations"),
  };
  function showTab(key) {
    Object.values(panels).forEach((p) => {
      if (p) p.style.display = "none";
    });
    if (panels[key]) panels[key].style.display = "block";
  }
  tabLinks.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      tabLinks.forEach((t) => t.classList.remove("active-tab"));
      tab.classList.add("active-tab");
      showTab(tab.dataset.tab || "all");
    });
  });
  showTab("all");

  /* ── scroll on hover ── */
  document.querySelectorAll(".meme").forEach((meme) => {
    meme.style.overflowY = "hidden";
    meme.addEventListener("mouseenter", () => (meme.style.overflowY = "auto"));
    meme.addEventListener(
      "mouseleave",
      () => (meme.style.overflowY = "hidden"),
    );
  });
});

/* ══════════════ GOOGLE TRANSLATE ══════════════ */
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en", includedLanguages: "en,ar" },
    "google_translate_element",
  );
}
function changeLanguage(lang) {
  const s = document.querySelector(".goog-te-combo");
  if (s) {
    s.value = lang;
    s.dispatchEvent(new Event("change"));
  }
}
const scr = document.createElement("script");
scr.src =
  "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
document.body.appendChild(scr);
let curLang = "en";
document.getElementById("lang-toggle")?.addEventListener("click", function () {
  if (curLang === "en") {
    changeLanguage("ar");
    curLang = "ar";
    this.textContent = "en";
  } else {
    changeLanguage("en");
    curLang = "en";
    this.textContent = "ar";
  }
});
