// ============================================================
// CARE AT HOME - Lab Diagnosis JavaScript
// ============================================================

// ─── DRAG & DROP ───────────────────────────────────────────
const dz = document.getElementById("dz");
if (dz) {
  dz.addEventListener("dragover", (e) => {
    e.preventDefault();
    dz.classList.add("over");
  });
  dz.addEventListener("dragleave", () => dz.classList.remove("over"));
  dz.addEventListener("drop", (e) => {
    e.preventDefault();
    dz.classList.remove("over");
    handleFiles(e.dataTransfer.files);
  });
}

const uploaded = [];

// ─── SIDEBAR / MOBILE MENU FUNCTIONS ───────────────────────
function showsidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.querySelector(".menu-overlay");
  if (sidebar && overlay) {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");
  }
}

function hidesidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.querySelector(".menu-overlay");
  if (sidebar && overlay) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
}

// Close sidebar on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hidesidebar();
    closeModal();
  }
});

// Close sidebar when clicking outside
document.addEventListener("click", (e) => {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.querySelector(".menu-overlay");
  const menuBtn = document.querySelector(".menu-btn");

  if (sidebar && sidebar.classList.contains("active")) {
    if (!sidebar.contains(e.target) && (!menuBtn || !menuBtn.contains(e.target))) {
      hidesidebar();
    }
  }
});

// ─── HANDLE FILES ────────────────────────────────────────
function handleFiles(files) {
  if (!files || !files.length) return;
  Array.from(files).forEach((file) => {
    uploaded.push(file);
    const ext = file.name.split(".").pop().toLowerCase();
    const isPdf = ext === "pdf";
    const isImg = ["jpg", "jpeg", "png", "webp"].includes(ext);
    const icCls = isPdf ? "ic-p" : isImg ? "ic-i" : "ic-d";
    const icon = isPdf ? "ti-file-type-pdf" : isImg ? "ti-photo" : "ti-file-text";
    const sz = (file.size / 1024 / 1024).toFixed(2);
    const id = "f" + Date.now() + Math.random().toString(36).slice(2, 5);
    const div = document.createElement("div");
    div.className = "fi";
    div.id = id;
    div.innerHTML = '<div class="fi-ic ' + icCls + '"><i class="ti ' + icon + '"></i></div>' +
      '<div class="fi-meta">' +
      '<div class="fi-name">' + esc(file.name) + '</div>' +
      '<div class="fi-sz">' + sz + ' MB</div>' +
      '<div class="prog"><div class="prog-f" id="p' + id + '" style="width:0%"></div></div>' +
      '</div>' +
      '<span class="fi-st st-u" id="s' + id + '">Loading...</span>' +
      '<button class="fi-del" onclick="removeFile(\'' + id + '\')"><i class="ti ti-x"></i></button>';
    document.getElementById("fileList").appendChild(div);
    let w = 0;
    const t = setInterval(() => {
      w += Math.random() * 30;
      if (w >= 100) {
        w = 100;
        clearInterval(t);
        const s = document.getElementById("s" + id);
        if (s) {
          s.className = "fi-st st-ok";
          s.textContent = "Ready";
        }
      }
      const p = document.getElementById("p" + id);
      if (p) p.style.width = Math.min(w, 100).toFixed(0) + "%";
    }, 120);
  });
  dz.classList.add("has");
  document.getElementById("dzTxt").textContent = uploaded.length + " file" + (uploaded.length > 1 ? "s" : "") + " selected";
  document.getElementById("anBtn").disabled = false;
}

function removeFile(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
  if (!document.getElementById("fileList").children.length) {
    uploaded.length = 0;
    dz.classList.remove("has");
    document.getElementById("dzTxt").textContent = "No Files Selected";
    document.getElementById("anBtn").disabled = true;
    document.getElementById("spinner").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("report").innerHTML = "";
  }
}

function clearAll() {
  document.getElementById("fileList").innerHTML = "";
  uploaded.length = 0;
  dz.classList.remove("has");
  document.getElementById("dzTxt").textContent = "No Files Selected";
  document.getElementById("fileInput").value = "";
  document.getElementById("anBtn").disabled = true;
  document.getElementById("spinner").style.display = "none";
  document.getElementById("report").style.display = "none";
  document.getElementById("report").innerHTML = "";
}

function saveFiles() {
  if (!uploaded.length) {
    toast("No files", "Upload a file first.", "info");
    return;
  }
  uploaded.forEach((f) => {
    const url = URL.createObjectURL(f);
    const a = document.createElement("a");
    a.href = url;
    a.download = f.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  toast("Saved!", uploaded.length + " file(s) downloaded.", "success");
}

// ─── CBC GENERATOR ───────────────────────────────────────
function rnd(min, max, d) {
  d = d || 1;
  return parseFloat((Math.random() * (max - min) + min).toFixed(d));
}

function genCBC() {
  const wbc = rnd(3.5, 12.5);
  const rbc = rnd(3.8, 6.2, 2);
  const hgb = rnd(10.5, 18, 1);
  const hct = rnd(32, 54, 1);
  const mcv = rnd(72, 102, 1);
  const mch = rnd(24, 34, 1);
  const mchc = rnd(30, 37, 1);
  const plt = rnd(90, 420, 0);
  const neut = rnd(40, 80, 1);
  const lymp = rnd(15, 50, 1);
  const mono = rnd(2, 12, 1);
  const eos = rnd(0, 8, 1);
  const baso = rnd(0, 2, 1);

  const st = function(v, lo, hi) { return v < lo ? "low" : v > hi ? "high" : "normal"; };

  const wbcS = st(wbc, 4.5, 11);
  const rbcS = st(rbc, 3.8, 5.9);
  const hgbS = st(hgb, 12, 17.5);
  const hctS = st(hct, 36, 53);
  const mcvS = st(mcv, 80, 100);
  const mchS = st(mch, 27, 33);
  const mchcS = st(mchc, 32, 36);
  const pltS = st(plt, 150, 400);
  const neutS = st(neut, 50, 70);
  const lympS = st(lymp, 20, 40);
  const monoS = st(mono, 2, 8);
  const eosS = st(eos, 1, 4);

  const abn = [wbcS, rbcS, hgbS, hctS, mcvS, mchS, mchcS, pltS, neutS, lympS, monoS, eosS].filter((s) => s !== "normal").length;
  const overall = abn >= 4 ? "Urgent Review" : abn >= 1 ? "Attention Needed" : "Normal";
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const note = function(s, nTxt, hTxt, lTxt) {
    return s === "high" ? hTxt : s === "low" ? lTxt : nTxt;
  };

  return {
    overall: overall,
    date: date,
    urgent: abn >= 4,
    urgentMsg: abn >= 4 ? "Multiple CBC parameters significantly abnormal. Please consult a physician promptly." : "",
    tests: ["Complete Blood Count (CBC)", "White Blood Cell Differential", "Red Cell Indices"],
    summary: overall === "Normal"
      ? "All CBC parameters are within normal reference ranges as of " + date + ". No evidence of anemia, infection, or platelet abnormality."
      : "CBC shows " + abn + " abnormal parameter(s). " + (hgbS === "low" ? "Anemia indicated. " : "") + (wbcS === "high" ? "Possible infection/inflammation. " : "") + "Follow-up with a physician is recommended.",
    findings: [
      { s: wbcS, l: "WBC - White Blood Cells", v: wbc + " K/uL", r: "4.5-11.0 K/uL", t: note(wbcS, "WBC within normal range.", "Leukocytosis - may indicate bacterial infection or inflammation.", "Leukopenia - possible viral infection or bone marrow suppression.") },
      { s: rbcS, l: "RBC - Red Blood Cells", v: rbc + " M/uL", r: "3.8-5.9 M/uL", t: note(rbcS, "RBC count normal.", "Elevated RBC - possible dehydration or polycythemia.", "Low RBC - possible anemia. Iron/B12 studies recommended.") },
      { s: hgbS, l: "HGB - Hemoglobin", v: hgb + " g/dL", r: "12.0-17.5 g/dL", t: note(hgbS, "Hemoglobin within normal limits.", "Elevated hemoglobin - possible dehydration.", "Hemoglobin low - anemia present. Further classification needed.") },
      { s: hctS, l: "HCT - Hematocrit", v: hct + "%", r: "36-53%", t: note(hctS, "Hematocrit normal.", "Elevated hematocrit.", "Low hematocrit - consistent with anemia.") },
      { s: mcvS, l: "MCV - Mean Corpuscular Volume", v: mcv + " fL", r: "80-100 fL", t: note(mcvS, "MCV normal (normocytic).", "Macrocytosis - check B12/folate.", "Microcytosis - possible iron deficiency or thalassemia.") },
      { s: mchS, l: "MCH - Mean Corp. Hemoglobin", v: mch + " pg", r: "27-33 pg", t: note(mchS, "MCH normal.", "High MCH.", "Low MCH - review iron studies.") },
      { s: mchcS, l: "MCHC - Corp. Hgb Concentration", v: mchc + " g/dL", r: "32-36 g/dL", t: note(mchcS, "MCHC normal.", "High MCHC - possible spherocytosis.", "Low MCHC - possible iron deficiency.") },
      { s: pltS, l: "PLT - Platelets", v: plt + " K/uL", r: "150-400 K/uL", t: note(pltS, "Platelet count normal.", "Thrombocytosis - assess for underlying cause.", "Thrombocytopenia - bleeding risk increased. Avoid NSAIDs.") },
      { s: neutS, l: "NEUT - Neutrophils", v: neut + "%", r: "50-70%", t: note(neutS, "Neutrophils normal.", "Neutrophilia - may suggest bacterial infection.", "Neutropenia - increased infection susceptibility.") },
      { s: lympS, l: "LYMPH - Lymphocytes", v: lymp + "%", r: "20-40%", t: note(lympS, "Lymphocytes normal.", "Lymphocytosis - possible viral infection.", "Low lymphocytes - possible immunosuppression.") },
      { s: monoS, l: "MONO - Monocytes", v: mono + "%", r: "2-8%", t: note(monoS, "Monocytes normal.", "Monocytosis - possible chronic infection.", "Low monocytes - usually not significant.") },
      { s: eosS, l: "EOS - Eosinophils", v: eos + "%", r: "1-4%", t: note(eosS, "Eosinophils normal.", "Eosinophilia - possible allergy or parasitic infection.", "Low eosinophils - usually not significant.") },
      { s: baso <= 1 ? "normal" : "high", l: "BASO - Basophils", v: baso + "%", r: "0-1%", t: baso <= 1 ? "Basophils normal." : "Elevated basophils - possible allergic response." }
    ],
    recs: [
      abn === 0 ? "All CBC parameters normal. Continue routine annual checkups." : "Follow up with your physician within 1-2 weeks to discuss results.",
      hgbS === "low" || rbcS === "low" ? "Anemia detected - request iron studies (ferritin, TIBC) and vitamin B12/folate levels." : "Maintain a balanced diet rich in iron and B12 to support healthy blood production.",
      wbcS === "high" ? "Elevated WBC - a CRP/ESR test may help identify infection or inflammation." : "Maintain good hygiene and keep vaccinations up to date.",
      pltS === "low" ? "Low platelets - avoid NSAIDs and contact sports until further evaluation." : "Platelet count healthy. Stay well-hydrated.",
      "Always consult a licensed physician or hematologist before making any medical decisions."
    ]
  };
}

// ─── START ANALYSIS ──────────────────────────────────────
async function startAnalysis() {
  if (!uploaded.length) return;
  const sp = document.getElementById("spinner");
  const rp = document.getElementById("report");
  sp.style.display = "block";
  rp.style.display = "none";
  rp.innerHTML = "";
  document.getElementById("anBtn").disabled = true;
  await new Promise((r) => setTimeout(r, 1800 + Math.random() * 1000));
  sp.style.display = "none";
  document.getElementById("anBtn").disabled = false;
  renderReport(genCBC());
}

// ─── RENDER REPORT ───────────────────────────────────────
function renderReport(d) {
  const cfg = {
    "Normal": { bg: "#f0fdf4", c: "#16a34a", br: "#86efac", ic: "ti-circle-check" },
    "Attention Needed": { bg: "#fefce8", c: "#ca8a04", br: "#fde047", ic: "ti-alert-triangle" },
    "Urgent Review": { bg: "#fef2f2", c: "#dc2626", br: "#fca5a5", ic: "ti-alert-octagon" }
  };
  const s = cfg[d.overall] || cfg["Attention Needed"];
  const dc = { high: "#dc2626", low: "#ca8a04", info: "#3b82f6", normal: "#1a1a2e" };
  const dotC = { high: "#ef4444", low: "#f59e0b", normal: "#22c55e", info: "#3b82f6" };
  const arr = { high: " Up", low: " Down", normal: " OK", info: "" };

  const findings = d.findings.map((f) => {
    return '<div class="finding">' +
      '<div class="f-dot" style="background:' + (dotC[f.s] || "#9ca3af") + '"></div>' +
      '<div class="f-in">' +
      '<div class="f-top">' +
      '<span class="f-lbl">' + f.l + '</span>' +
      '<div class="f-vals">' +
      '<span class="f-val" style="color:' + (dc[f.s] || "#1a1a2e") + '">' + f.v + '<span style="font-size:.6rem">' + (arr[f.s] || "") + '</span></span>' +
      '<span class="f-ref">' + f.r + '</span>' +
      '</div></div>' +
      '<div class="f-txt">' + f.t + '</div>' +
      '</div></div>';
  }).join("");

  const recs = d.recs.map((r) => {
    return '<div class="rec"><i class="ti ti-circle-check"></i><span>' + r + '</span></div>';
  }).join("");

  const tags = d.tests.map((t) => '<span class="tag">' + t + '</span>').join("");

  const rep = document.getElementById("report");
  rep.innerHTML = '<div class="rep-card">' +
    '<div class="rep-banner" style="background:' + s.bg + ';border-bottom:1.5px solid ' + s.br + '">' +
    '<i class="ti ' + s.ic + '" style="color:' + s.c + '"></i>' +
    '<div style="flex:1"><div class="rep-lbl" style="color:' + s.c + '">Overall Status</div><div class="rep-val" style="color:' + s.c + '">' + d.overall + '</div></div>' +
    '<div style="text-align:right"><div style="font-size:.65rem;color:#9ca3af">Report Date</div><div style="font-size:.75rem;font-weight:600;color:#1a1a2e">' + d.date + '</div></div>' +
    '</div>' +
    '<div class="rep-body">' +
    (d.urgent ? '<div class="urgent"><i class="ti ti-alert-octagon"></i><p><strong>Urgent:</strong> ' + d.urgentMsg + '</p></div>' : '') +
    '<div class="sec-t"><i class="ti ti-file-description"></i> Clinical Summary</div>' +
    '<div class="summary">' + d.summary + '</div>' +
    '<div class="sec-t"><i class="ti ti-flask"></i> Tests Analyzed</div>' +
    '<div class="tags">' + tags + '</div>' +
    '<div class="sec-t"><i class="ti ti-microscope"></i> CBC Parameters - Full Results</div>' +
    '<div class="findings">' + findings + '</div>' +
    '<div class="sec-t"><i class="ti ti-heart-rate-monitor"></i> Recommendations</div>' +
    '<div class="recs">' + recs + '</div>' +
    '<div class="legend">' +
    '<span style="font-size:.68rem;font-weight:600;color:var(--txt2)">Legend:</span>' +
    '<span class="leg-i"><span class="leg-dot" style="background:#22c55e"></span>Normal OK</span>' +
    '<span class="leg-i"><span class="leg-dot" style="background:#ef4444"></span>High Up</span>' +
    '<span class="leg-i"><span class="leg-dot" style="background:#f59e0b"></span>Low Down</span>' +
    '<span class="leg-i"><span class="leg-dot" style="background:#3b82f6"></span>Info</span>' +
    '</div>' +
    '<div class="rep-acts">' +
    '<button class="btn-print" onclick="window.print()"><i class="ti ti-printer"></i> Print</button>' +
    '<button class="btn-dl" onclick="saveTxt()"><i class="ti ti-download"></i> Save (.txt)</button>' +
    '<button class="btn-new" onclick="clearAll()"><i class="ti ti-refresh"></i> New Analysis</button>' +
    '</div>' +
    '<div class="disc">This report is for informational purposes only. Always consult a qualified healthcare professional.</div>' +
    '</div></div>';
  rep.style.display = "block";
  window._rep = d;
  rep.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── SAVE TXT ────────────────────────────────────────────
function saveTxt() {
  const d = window._rep;
  if (!d) return;
  const lines = [
    "CARE AT HOME - CBC BLOOD ANALYSIS REPORT",
    "=".repeat(45),
    "Date: " + d.date,
    "Status: " + d.overall,
    "",
    "SUMMARY",
    "-".repeat(20),
    d.summary,
    "",
    "TESTS: " + d.tests.join(", "),
    "",
    "CBC PARAMETERS",
    "-".repeat(20)
  ];
  d.findings.forEach((f) => {
    const fl = { high: "[HIGH]", low: "[LOW]", normal: "[NORMAL]", info: "[INFO]" }[f.s] || "[INFO]";
    lines.push(fl + " " + f.l);
    lines.push("  Result: " + f.v + "  |  Reference: " + f.r);
    lines.push("  Note: " + f.t);
    lines.push("");
  });
  lines.push("RECOMMENDATIONS");
  lines.push("-".repeat(20));
  d.recs.forEach((r) => lines.push("- " + r));
  if (d.urgent) {
    lines.push("");
    lines.push("URGENT: " + d.urgentMsg);
  }
  lines.push("");
  lines.push("=".repeat(45));
  lines.push("Disclaimer: For informational purposes only. Consult a physician.");

  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "CBC_Report_" + Date.now() + ".txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ─── FILTER TESTS ──────────────────────────────────────
function filterTests(btn, cat) {
  document.querySelectorAll(".fbtn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".tc").forEach((card) => {
    const c = card.dataset.cat || "";
    card.style.display = cat === "all" || c === cat ? "" : "none";
  });
}

// ─── VIEW DETAILS DATA ─────────────────────────────────
const DETAILS = [
  {
    name: "Complete Blood Count (CBC)",
    cat: "Blood Analysis",
    date: "Jun 10, 2026",
    status: "Normal",
    sc: { bg: "#f0fdf4", c: "#16a34a", br: "#86efac" },
    desc: "Measures the components of your blood - red cells, white cells, and platelets.",
    vals: [
      { l: "Red Blood Cells", v: "4.8 M/uL", r: "4.2-5.4", s: "normal" },
      { l: "Hemoglobin", v: "14.2 g/dL", r: "12.0-16.0", s: "normal" },
      { l: "Hematocrit", v: "42%", r: "37-47%", s: "normal" },
      { l: "White Blood Cells", v: "6.8 K/uL", r: "4.5-11.0", s: "normal" },
      { l: "Platelets", v: "250 K/uL", r: "150-400", s: "normal" }
    ],
    note: "All blood count parameters within normal reference ranges. No anemia or infection detected."
  },
  {
    name: "Fasting Blood Sugar",
    cat: "Sugar Analysis",
    date: "Jun 10, 2026",
    status: "High",
    sc: { bg: "#fef2f2", c: "#dc2626", br: "#fca5a5" },
    desc: "Measures blood glucose after at least 8 hours of fasting. Key diabetes screening test.",
    vals: [
      { l: "Fasting Glucose", v: "126 mg/dL", r: "70-100", s: "high" },
      { l: "HbA1c (estimated)", v: "~6.4%", r: "<5.7%", s: "high" }
    ],
    note: "Glucose 126 mg/dL meets the diagnostic threshold for diabetes mellitus. Repeat testing and physician consultation strongly recommended."
  },
  {
    name: "Total Cholesterol",
    cat: "Lipid Panel",
    date: "Jun 8, 2026",
    status: "Normal",
    sc: { bg: "#f0fdf4", c: "#16a34a", br: "#86efac" },
    desc: "Lipid panel measuring fats in your blood to assess cardiovascular risk.",
    vals: [
      { l: "Total Cholesterol", v: "185 mg/dL", r: "<200", s: "normal" },
      { l: "LDL", v: "110 mg/dL", r: "<130", s: "normal" },
      { l: "HDL", v: "52 mg/dL", r: ">40", s: "normal" },
      { l: "Triglycerides", v: "115 mg/dL", r: "<150", s: "normal" }
    ],
    note: "Lipid profile within healthy ranges. Maintain balanced diet and regular exercise."
  },
  {
    name: "Liver Function Test (LFT)",
    cat: "Liver Analysis",
    date: "Jun 8, 2026",
    status: "Normal",
    sc: { bg: "#f0fdf4", c: "#16a34a", br: "#86efac" },
    desc: "Measures liver enzymes and proteins to evaluate liver health.",
    vals: [
      { l: "ALT", v: "28 U/L", r: "7-40", s: "normal" },
      { l: "AST", v: "24 U/L", r: "10-40", s: "normal" },
      { l: "Total Bilirubin", v: "0.8 mg/dL", r: "0.2-1.2", s: "normal" },
      { l: "Albumin", v: "4.2 g/dL", r: "3.5-5.0", s: "normal" }
    ],
    note: "All liver enzymes within normal limits. No signs of liver inflammation or damage."
  },
  {
    name: "Kidney Function Test (KFT)",
    cat: "Kidney Analysis",
    date: "Jun 5, 2026",
    status: "High",
    sc: { bg: "#fef2f2", c: "#dc2626", br: "#fca5a5" },
    desc: "Measures substances filtered by the kidneys to assess kidney function.",
    vals: [
      { l: "Creatinine", v: "1.4 mg/dL", r: "0.6-1.2", s: "high" },
      { l: "BUN", v: "22 mg/dL", r: "7-20", s: "high" },
      { l: "eGFR", v: "72 mL/min", r: ">90", s: "low" },
      { l: "Uric Acid", v: "6.1 mg/dL", r: "3.5-7.2", s: "normal" }
    ],
    note: "Elevated creatinine and reduced eGFR suggest mild kidney impairment. Follow-up within 3 months recommended."
  },
  {
    name: "Thyroid Stimulating Hormone (TSH)",
    cat: "Hormone Analysis",
    date: "Jun 12, 2026",
    status: "Pending",
    sc: { bg: "#f5f3ff", c: "#6a51ff", br: "#c4baff" },
    desc: "TSH regulates thyroid hormone production. Primary screening test for thyroid disorders.",
    vals: [
      { l: "TSH", v: "Pending", r: "0.4-4.0 mIU/L", s: "info" },
      { l: "Free T4", v: "Pending", r: "0.8-1.8 ng/dL", s: "info" }
    ],
    note: "Results being processed by the lab. Expected within 24-48 hours."
  }
];

function viewDetails(i) {
  const d = DETAILS[i];
  if (!d) return;
  const vc = { high: "#dc2626", low: "#ca8a04", normal: "#1a1a2e", info: "#6a51ff" };
  const ar = { high: " Up", low: " Down", normal: " OK", info: "" };
  const rows = d.vals.map((v) => {
    return '<div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:.4rem;padding:.6rem .8rem;border-bottom:1px solid #f3f4f6;font-size:.75rem;align-items:center">' +
      '<span style="color:#66686c">' + v.l + '</span>' +
      '<span style="font-weight:700;color:' + (vc[v.s] || "#1a1a2e") + '">' + v.v + '<span style="font-size:.6rem">' + (ar[v.s] || "") + '</span></span>' +
      '<span style="color:#9ca3af;font-size:.65rem">' + v.r + '</span>' +
      '</div>';
  }).join("");

  openModal(
    "Details: " + d.name,
    '<div style="background:' + d.sc.bg + ';border:1.5px solid ' + d.sc.br + ';border-radius:10px;padding:.75rem 1rem;display:flex;justify-content:space-between;align-items:center;margin-bottom:.9rem">' +
    '<span style="font-weight:800;color:' + d.sc.c + ';font-size:.95rem">' + d.status + '</span>' +
    '<span style="font-size:.7rem;color:#9ca3af">' + d.date + '</span>' +
    '</div>' +
    '<p style="font-size:.78rem;color:#66686c;line-height:1.7;margin-bottom:.9rem">' + d.desc + '</p>' +
    '<div style="font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--p);margin-bottom:.4rem">Test Values</div>' +
    '<div style="border:1px solid var(--b);border-radius:10px;overflow:hidden;margin-bottom:.9rem">' +
    '<div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:.4rem;padding:.5rem .8rem;background:#f9fafb;font-size:.62rem;font-weight:700;text-transform:uppercase;color:#9ca3af">' +
    '<span>Parameter</span><span>Result</span><span>Reference</span>' +
    '</div>' + rows + '</div>' +
    '<div style="font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--p);margin-bottom:.4rem">Clinical Notes</div>' +
    '<div style="background:#f9f9ff;border-left:3px solid var(--p);border-radius:0 9px 9px 0;padding:.8rem .95rem;font-size:.78rem;color:#1a1a2e;line-height:1.75">' + d.note + '</div>'
  );
}

// ─── QUICK ACTIONS ───────────────────────────────────────
function qaModal(a) {
  const m = {
    "Full Report": [
      "Full Medical Report",
      "Your complete report covers all 24 tests (Jun 5-12, 2026). Overall: <strong>Attention Needed</strong>. 18 normal, 4 need follow-up."
    ],
    "Compare Results": [
      "Compare Results",
      "Blood Glucose: 98 to 112 to <strong style=\"color:var(--r)\">126 mg/dL Up</strong><br>Creatinine: 1.0 to 1.2 to <strong style=\"color:var(--r)\">1.4 mg/dL Up</strong><br>Cholesterol: 200 to 192 to <strong style=\"color:var(--g)\">185 mg/dL Down</strong><br>Hemoglobin: 13.8 to 14.0 to <strong style=\"color:var(--g)\">14.2 g/dL OK</strong>"
    ],
    "Follow-up Schedule": [
      "Follow-up Schedule",
      "<strong>1 week:</strong> Repeat fasting glucose and HbA1c<br><strong>1 month:</strong> Kidney function check<br><strong>3 months:</strong> Full metabolic panel<br><strong>TSH:</strong> Expected within 24-48 hours"
    ],
    "Share With Doctor": [
      "Share With Doctor",
      "Secure link generated:<br><code style=\"background:#f0edff;color:var(--p);padding:2px 7px;border-radius:5px;font-size:.75rem\">careathome.app/share/xyz-2026-abc</code><br><br>Link expires in 7 days."
    ],
    "Download PDF": [
      "Download PDF Report",
      "Your lab results PDF includes all values, reference ranges, status indicators, and recommendations in printable format."
    ],
    "Medical History": [
      "Medical History",
      "<strong>Jun 2026</strong> - Full panel (current)<br><strong>Mar 2026</strong> - Blood work + lipids<br><strong>Dec 2025</strong> - Routine checkup<br><strong>Sep 2025</strong> - Thyroid panel<br><br>Total: 86 tests over 24 months."
    ]
  };
  if (m[a]) {
    openModal(
      m[a][0],
      '<p style="font-size:.83rem;color:#1a1a2e;line-height:1.85">' + m[a][1] + '</p>'
    );
  }
}

// ─── MODAL ─────────────────────────────────────────────
function openModal(title, body) {
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const overlay = document.getElementById("overlay");

  if (modalTitle) modalTitle.innerHTML = title;
  if (modalBody) {
    modalBody.innerHTML = body +
      '<div style="display:flex;justify-content:flex-end;margin-top:1.25rem;padding-top:.9rem;border-top:1px solid var(--b)">' +
      '<button onclick="closeModal()" style="background:var(--p);border:none;border-radius:9px;padding:.55rem 1.2rem;font-size:.78rem;font-weight:700;color:#fff;cursor:pointer;display:inline-flex;align-items:center;gap:.4rem">' +
      '<i class="ti ti-circle-check"></i> Close' +
      '</button></div>';
  }
  if (overlay) overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const overlay = document.getElementById("overlay");
  if (overlay) overlay.classList.remove("open");
  document.body.style.overflow = "";
}

// ─── TOAST ─────────────────────────────────────────────
function toast(title, msg, type) {
  const c = {
    success: { bg: "#f0fdf4", br: "#86efac", c: "#16a34a", ic: "ti-circle-check" },
    info: { bg: "#eff6ff", br: "#bfdbfe", c: "#2563eb", ic: "ti-info-circle" },
    error: { bg: "#fef2f2", br: "#fca5a5", c: "#dc2626", ic: "ti-alert-circle" }
  }[type] || { bg: "#eff6ff", br: "#bfdbfe", c: "#2563eb", ic: "ti-info-circle" };

  const el = document.createElement("div");
  el.className = "toast";
  el.style.cssText = "background:" + c.bg + ";border:1.5px solid " + c.br;
  el.innerHTML = '<i class="ti ' + c.ic + '" style="color:' + c.c + ';font-size:1.1rem;flex-shrink:0;margin-top:1px"></i>' +
    '<div><div style="font-size:.78rem;font-weight:700;color:#1a1a2e;margin-bottom:1px">' + title + '</div>' +
    '<div style="font-size:.72rem;color:#66686c;line-height:1.6">' + msg + '</div></div>' +
    '<button onclick="this.parentNode.remove()" style="background:none;border:none;cursor:pointer;color:#9ca3af;font-size:1rem;margin-left:.2rem">x</button>';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

// ─── HELPERS ───────────────────────────────────────────
function esc(s) {
  return s.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[m]);
}

function translatePage(e) {
  e.preventDefault();
  window.open("https://translate.google.com/translate?sl=en&tl=ar&u=" + encodeURIComponent(location.href), "_blank");
}

function openSidebar() {
  const sb = document.getElementById("navSidebar");
  if (sb) sb.classList.add("active");
}

function closeSidebar() {
  const sb = document.getElementById("navSidebar");
  if (sb) sb.classList.remove("active");
}

function toggleFaq(element) {
  const item = element.parentElement;
  const isActive = item.classList.contains("active");
  document.querySelectorAll(".faq-item").forEach((faq) => faq.classList.remove("active"));
  if (!isActive) item.classList.add("active");
}
