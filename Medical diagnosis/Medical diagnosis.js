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
// ===== DATA =====
// ===== EXPANDED SYMPTOMS MAP =====
const symptomsMap = {
  head: [
    "Headache", "Severe throbbing migraine", "Dizziness / vertigo",
    "Brain fog / poor concentration", "Neck stiffness", "Fever & chills",
    "Visual disturbances / blurred vision", "Ear ringing (tinnitus)",
    "Eye pain / pressure", "Fainting or near-fainting", "Sudden confusion",
    "Facial numbness or tingling", "Sensitivity to light (photophobia)",
    "Sensitivity to sound (phonophobia)", "Nausea with headache",
    "One-sided weakness", "Slurred speech", "Sudden worst headache of life",
  ],
  neck: [
    "Sore / painful throat", "Difficulty swallowing (dysphagia)",
    "Swollen / tender lymph nodes", "Hoarse or changed voice",
    "Neck stiffness / rigidity", "Pain on head turning", "Lumps in neck",
    "Throat tightness or choking sensation", "Ear pain (referred)",
    "Fever with sore throat", "White patches on tonsils", "Bad breath",
    "Postnasal drip", "Persistent cough from throat",
    "Pain radiating down arm", "Numbness in hands from neck",
  ],
  chest: [
    "Chest pain (sharp or pressure)", "Shortness of breath", "Heart palpitations",
    "Persistent or chronic cough", "Pain on deep breathing", "Night sweats",
    "Arm, shoulder, or jaw pain", "Wheezing", "Chest tightness",
    "Coughing up blood (haemoptysis)", "Rapid heartbeat", "Irregular heartbeat",
    "Fatigue with exertion", "Ankle swelling", "Bluish lips or fingernails",
    "Fever with cough", "Pleuritic chest pain (worse on movement)",
  ],
  abdomen: [
    "Nausea & vomiting", "Diffuse stomach / abdominal pain",
    "Heartburn / acid reflux / regurgitation", "Diarrhoea",
    "Constipation", "Abdominal bloating / distension",
    "Right lower quadrant pain", "Left lower quadrant pain", "Loss of appetite",
    "Blood in stool / dark tarry stools", "Unexplained weight loss",
    "Jaundice (yellow skin / eyes)", "Abdominal rigidity / guarding",
    "Rectal pain or bleeding", "Pain after eating", "Early satiety",
    "Excessive flatulence", "Fever with abdominal pain",
  ],
  arm: [
    "Shoulder pain", "Finger or hand numbness / tingling",
    "Swollen or warm joints", "Muscle weakness in arm",
    "Limited shoulder / elbow range of motion", "Elbow pain (lateral or medial)",
    "Wrist pain or stiffness", "Tingling down the arm",
    "Morning joint stiffness (>1 hour)", "Pain worse at night",
    "Clicking or popping joints", "Forearm pain",
    "Trigger finger (locking)", "Hand tremor",
    "Bruising easily", "Arm coldness / pallor",
  ],
  pelvis: [
    "Lower back pain", "Burning / painful urination (dysuria)",
    "Pelvic or lower abdominal pain", "Groin pain",
    "Hip pain (lateral or inguinal)", "Urinary frequency or urgency",
    "Bladder incontinence / leakage", "Sciatica — shooting leg pain",
    "Pain radiating to buttock", "Blood in urine (haematuria)",
    "Cloudy or foul-smelling urine", "Testicular / ovarian pain",
    "Pain during intercourse", "Irregular menstruation",
    "Constipation with pelvic pressure", "Tailbone (coccyx) pain",
    "Hip stiffness in morning", "Femoral nerve pain",
  ],
  leg: [
    "Knee pain (front, medial, or lateral)", "Ankle swelling or oedema",
    "Leg cramps (at rest or on exertion)", "Difficulty walking / limping",
    "Visible varicose or spider veins", "Heel / plantar foot pain",
    "Leg numbness or tingling", "Shin pain (anterior)", "Calf tightness or pain",
    "Calf redness, warmth, and swelling", "Knee swelling / effusion",
    "Flat feet / arch pain", "Thigh pain", "Hip-to-knee radiating pain",
    "Leg fatigue after short walks", "Skin discolouration on leg",
    "Non-healing leg ulcer", "Leg heaviness",
  ],
};

// ===== EXPANDED DIAGNOSIS MAP (5 conditions per region) =====
const diagnosisMap = {
  head: [
    {
      name: "Tension Headache",
      pct: 74,
      level: "low",
      desc: "The most prevalent headache type — a bilateral, non-pulsating pressure or tightening sensation, often described as a band around the head. Associated with stress, posture, and fatigue.",
      tags: ["Very Common", "Treatable", "Self-care"],
    },
    {
      name: "Migraine",
      pct: 62,
      level: "moderate",
      desc: "A complex neurological disorder characterised by unilateral pulsating headache lasting 4–72 hours, frequently accompanied by nausea, vomiting, and severe photophobia or phonophobia.",
      tags: ["Neurological", "Recurrent", "Specialist care"],
    },
    {
      name: "Cluster Headache",
      pct: 28,
      level: "moderate",
      desc: "Extremely severe unilateral orbital pain occurring in episodic clusters. Often described as the most painful primary headache; associated with ipsilateral lacrimation and nasal congestion.",
      tags: ["Severe", "Cyclical", "Specialist care"],
    },
    {
      name: "Hypertensive Headache",
      pct: 22,
      level: "high",
      desc: "Occipital headache provoked by severely elevated blood pressure (≥180/120 mmHg). A warning sign of hypertensive urgency or crisis requiring immediate medical assessment.",
      tags: ["Urgent", "Monitor BP", "Emergency possible"],
    },
    {
      name: "Meningitis",
      pct: 8,
      level: "high",
      desc: "Inflammation of the meninges characterised by the classical triad of severe headache, neck rigidity, and fever. A medical emergency — bacterial meningitis carries significant mortality if untreated.",
      tags: ["Emergency", "Infectious", "Hospital required"],
    },
  ],
  neck: [
    {
      name: "Acute Tonsillitis",
      pct: 76,
      level: "low",
      desc: "Inflammation of the palatine tonsils, most commonly caused by Group A Streptococcus or viral pathogens. Presents with severe sore throat, odynophagia, tonsillar exudate, and cervical lymphadenopathy.",
      tags: ["Infection", "Common", "Antibiotics if bacterial"],
    },
    {
      name: "Laryngopharyngeal Reflux (LPR)",
      pct: 55,
      level: "low",
      desc: "Silent reflux in which gastric acid reaches the larynx and pharynx, causing chronic throat clearing, hoarseness, globus sensation, and posterior pharyngeal irritation without classic heartburn.",
      tags: ["Digestive", "Lifestyle change", "Manageable"],
    },
    {
      name: "Laryngitis",
      pct: 48,
      level: "low",
      desc: "Inflammation of the laryngeal mucosa and vocal cords causing hoarseness or complete aphonia. Acute forms are usually viral and self-limiting; chronic cases may relate to reflux or vocal misuse.",
      tags: ["Viral", "Self-limiting", "Voice rest"],
    },
    {
      name: "Cervical Spondylosis",
      pct: 35,
      level: "moderate",
      desc: "Age-related degenerative changes in the cervical spine — disc dehydration, osteophyte formation, and facet joint arthritis — causing chronic neck pain, stiffness, and sometimes radiculopathy.",
      tags: ["Degenerative", "Chronic", "Physiotherapy"],
    },
    {
      name: "Cervical Disc Herniation",
      pct: 18,
      level: "high",
      desc: "Extrusion of nucleus pulposus through the annulus fibrosus into the spinal canal, compressing cervical nerve roots (radiculopathy) or the spinal cord itself (myelopathy). May cause radiating arm pain, numbness, and weakness.",
      tags: ["Imaging required", "Specialist", "Surgery possible"],
    },
  ],
  chest: [
    {
      name: "Musculoskeletal Chest Pain",
      pct: 68,
      level: "low",
      desc: "Chest pain arising from the thoracic wall — muscles, intercostal nerves, ribs, or costal cartilage. Characteristically reproduced or worsened by palpation, movement, or position change. Includes costochondritis and Tietze syndrome.",
      tags: ["Common", "Self-limiting", "Monitor"],
    },
    {
      name: "GERD / Acid Reflux",
      pct: 54,
      level: "low",
      desc: "Gastro-oesophageal reflux disease causing retrosternal burning, regurgitation, and sometimes atypical chest pain that can closely mimic cardiac pain. Symptoms typically worse after meals, bending, or lying down.",
      tags: ["Digestive", "Lifestyle", "PPI therapy"],
    },
    {
      name: "Community-Acquired Pneumonia",
      pct: 32,
      level: "moderate",
      desc: "Infection of the lung parenchyma causing consolidation, productive cough (often purulent or blood-tinged), pleuritic chest pain, fever, and dyspnoea. Streptococcus pneumoniae is the most common bacterial pathogen.",
      tags: ["Infection", "Antibiotics", "CXR required"],
    },
    {
      name: "Angina Pectoris",
      pct: 24,
      level: "high",
      desc: "Episodic chest pressure or tightness caused by myocardial ischaemia due to coronary artery disease. Stable angina is predictably triggered by exertion; unstable angina occurs at rest and constitutes an acute coronary syndrome.",
      tags: ["Urgent", "Cardiac", "ECG required"],
    },
    {
      name: "Pulmonary Embolism",
      pct: 10,
      level: "high",
      desc: "Obstruction of the pulmonary arterial tree by thrombus, causing acute onset dyspnoea, pleuritic chest pain, haemoptysis, and haemodynamic instability in severe cases. Risk factors include immobility, DVT, malignancy, and thrombophilia.",
      tags: ["Emergency", "CT-PA required", "Anticoagulation"],
    },
  ],
  abdomen: [
    {
      name: "Irritable Bowel Syndrome (IBS)",
      pct: 70,
      level: "low",
      desc: "A functional gastrointestinal disorder defined by recurrent abdominal pain related to defaecation and associated with altered stool frequency or form. No structural or biochemical abnormality is detectable; pathogenesis involves gut–brain axis dysregulation.",
      tags: ["Functional", "Chronic", "Dietary management"],
    },
    {
      name: "Acute Gastroenteritis",
      pct: 58,
      level: "low",
      desc: "Inflammatory condition of the GI tract most commonly caused by norovirus, rotavirus, or bacterial pathogens (Salmonella, Campylobacter). Presents with nausea, vomiting, diarrhoea, cramping, and sometimes low-grade fever.",
      tags: ["Infection", "Self-limiting", "Hydration"],
    },
    {
      name: "Peptic Ulcer Disease",
      pct: 42,
      level: "moderate",
      desc: "Mucosal ulceration in the stomach or duodenum secondary to H. pylori infection or NSAID use, causing epigastric burning pain that is characteristically relieved by food (duodenal) or worsened by it (gastric). Complications include haemorrhage and perforation.",
      tags: ["H. pylori testing", "PPI + antibiotics", "Endoscopy"],
    },
    {
      name: "Acute Cholecystitis",
      pct: 25,
      level: "moderate",
      desc: "Acute inflammation of the gallbladder, typically precipitated by a gallstone obstructing the cystic duct. Presents with severe right upper quadrant pain, fever, nausea, and a positive Murphy's sign. Requires urgent surgical evaluation.",
      tags: ["Surgery likely", "Ultrasound required", "Urgent"],
    },
    {
      name: "Acute Appendicitis",
      pct: 15,
      level: "high",
      desc: "Acute inflammation of the vermiform appendix, presenting classically with periumbilical pain migrating to the right iliac fossa (McBurney's point), accompanied by fever, anorexia, and rebound tenderness. Perforation leads to peritonitis.",
      tags: ["Surgical Emergency", "CT required", "Immediate care"],
    },
  ],
  arm: [
    {
      name: "Rotator Cuff Tendinopathy",
      pct: 65,
      level: "low",
      desc: "Degenerative or inflammatory changes in the rotator cuff tendons — most often supraspinatus — causing anterolateral shoulder pain, painful arc (60–120°), and weakness, particularly with overhead activities.",
      tags: ["Overuse", "Physiotherapy", "Common"],
    },
    {
      name: "Lateral Epicondylitis (Tennis Elbow)",
      pct: 52,
      level: "low",
      desc: "Tendinopathy of the common extensor origin at the lateral humeral epicondyle, causing localised tenderness and pain radiating down the forearm, provoked by gripping or wrist extension. Despite the name, non-tennis activities are the most frequent cause.",
      tags: ["Overuse", "Rest & PT", "Common in adults"],
    },
    {
      name: "Carpal Tunnel Syndrome",
      pct: 44,
      level: "moderate",
      desc: "Compression of the median nerve at the wrist within the carpal tunnel, causing nocturnal paraesthesia, numbness in the lateral three-and-a-half digits, thenar wasting in advanced cases, and a positive Phalen's or Tinel's sign.",
      tags: ["Nerve compression", "Splinting", "Surgery if severe"],
    },
    {
      name: "Bursitis",
      pct: 32,
      level: "moderate",
      desc: "Acute or chronic inflammation of a bursa — most commonly subacromial, olecranon, or trochanteric — causing localised pain, swelling, and tenderness aggravated by direct pressure or specific joint movements.",
      tags: ["Inflammatory", "NSAID + PT", "Injection if needed"],
    },
    {
      name: "Rheumatoid Arthritis",
      pct: 18,
      level: "high",
      desc: "A chronic systemic autoimmune disease with symmetrical synovitis of small and large joints — especially MCPs, PIPs, and wrists — causing morning stiffness exceeding one hour, joint destruction, and extra-articular manifestations including nodules, vasculitis, and anaemia.",
      tags: ["Autoimmune", "DMARD therapy", "Rheumatologist"],
    },
  ],
  pelvis: [
    {
      name: "Non-Specific Low Back Pain",
      pct: 74,
      level: "low",
      desc: "Lumbosacral pain without a specific structural or neurological cause, attributable to muscle strain, ligamentous sprain, or facet joint irritation. The most common cause of disability worldwide, usually self-limiting within 4–6 weeks.",
      tags: ["Very common", "Exercise & mobility", "Self-care"],
    },
    {
      name: "Urinary Tract Infection (UTI)",
      pct: 55,
      level: "moderate",
      desc: "Bacterial infection of the lower urinary tract (cystitis) causing dysuria, urinary frequency, urgency, suprapubic discomfort, and cloudy or malodorous urine. Escherichia coli accounts for approximately 85% of community-acquired cases.",
      tags: ["E. coli most common", "Antibiotics", "Urine culture"],
    },
    {
      name: "Lumbar Disc Herniation",
      pct: 40,
      level: "moderate",
      desc: "Prolapse of the nucleus pulposus through the annulus fibrosus, most commonly at L4/L5 or L5/S1, compressing the traversing nerve root and causing dermatomal leg pain (sciatica), paraesthesia, and motor weakness.",
      tags: ["MRI required", "Physio first", "Surgery if failing"],
    },
    {
      name: "Pelvic Inflammatory Disease (PID)",
      pct: 22,
      level: "moderate",
      desc: "Ascending polymicrobial infection of the upper female genital tract — uterus, fallopian tubes, and ovaries — most commonly caused by Chlamydia trachomatis and Neisseria gonorrhoeae. Presents with bilateral lower abdominal pain, vaginal discharge, and cervical motion tenderness.",
      tags: ["STI-related", "Antibiotics", "Gynaecologist"],
    },
    {
      name: "Kidney Stone (Urolithiasis)",
      pct: 16,
      level: "high",
      desc: "Calculi forming in the renal collecting system that cause colicky loin-to-groin pain of sudden onset as they migrate down the ureter. Associated with haematuria, nausea, vomiting, and sometimes superimposed urinary tract infection.",
      tags: ["Imaging required", "Urology referral", "Pain management"],
    },
  ],
  leg: [
    {
      name: "Patellofemoral Pain Syndrome",
      pct: 64,
      level: "low",
      desc: "Anterior knee pain arising from abnormal patellofemoral contact stress, worsened by activities that load the joint in flexion — stairs, squatting, prolonged sitting (cinema sign). Common in young active individuals and runners.",
      tags: ["Overuse", "Physiotherapy", "VMO strengthening"],
    },
    {
      name: "Achilles Tendinopathy",
      pct: 50,
      level: "low",
      desc: "Degenerative tendinopathy of the Achilles tendon causing posterior heel and lower calf pain, morning stiffness, and localised tendon thickening. Predominantly an overuse injury exacerbated by sudden increases in training load.",
      tags: ["Overuse", "Eccentric exercises", "Load management"],
    },
    {
      name: "Varicose Veins / Chronic Venous Insufficiency",
      pct: 42,
      level: "low",
      desc: "Incompetence of saphenous vein valves causing venous reflux, resulting in visible tortuous veins, leg heaviness, aching, oedema, and skin changes. In advanced stages, venous hypertension leads to lipodermatosclerosis and venous ulceration.",
      tags: ["Vascular", "Compression therapy", "Ablation possible"],
    },
    {
      name: "Meniscal Tear",
      pct: 30,
      level: "moderate",
      desc: "Tearing of the medial or lateral fibrocartilaginous meniscus, typically following a twisting injury in younger patients or degeneratively in older adults. Presents with joint line tenderness, knee swelling, mechanical locking or clicking, and a positive McMurray's test.",
      tags: ["MRI required", "Orthopaedic review", "Possible arthroscopy"],
    },
    {
      name: "Deep Vein Thrombosis (DVT)",
      pct: 14,
      level: "high",
      desc: "Formation of a thrombus within the deep venous system — most commonly the calf or femoral veins — causing unilateral leg swelling, erythema, warmth, and calf tenderness. The primary danger is proximal propagation and embolisation to the pulmonary circulation.",
      tags: ["Urgent", "D-dimer + Doppler", "Anticoagulation"],
    },
  ],
};

// ===== RECOMMENDATIONS MAP =====
const recMap = {
  low: [
    { icon: "fa-bed",           text: "Rest and avoid strenuous activity for 24–48 hours to help your body recover." },
    { icon: "fa-droplet",       text: "Stay well-hydrated and maintain a balanced diet to support immune function." },
    { icon: "fa-pills",         text: "Over-the-counter medications may relieve mild symptoms — follow dosage instructions carefully." },
    { icon: "fa-calendar-check",text: "Monitor your symptoms. If they worsen or persist beyond 3 days, consult a doctor." },
  ],
  moderate: [
    { icon: "fa-user-doctor",      text: "Schedule an appointment with a primary care physician within the next 24–48 hours." },
    { icon: "fa-flask",            text: "A blood panel, urine test, or imaging may help identify the underlying cause of your symptoms." },
    { icon: "fa-clipboard-list",   text: "Keep a symptom diary noting when symptoms occur, their intensity, and any triggers." },
    { icon: "fa-triangle-exclamation", text: "If symptoms suddenly worsen or new severe symptoms appear, seek immediate medical care." },
  ],
  high: [
    { icon: "fa-ambulance",    text: "Seek medical attention urgently. Do not delay if you experience severe or rapidly worsening symptoms." },
    { icon: "fa-hospital",     text: "Visit an emergency room or urgent care if you have chest pain, difficulty breathing, or fainting." },
    { icon: "fa-phone",        text: "Call emergency services (123) immediately if you suspect a heart attack, stroke, or severe allergic reaction." },
    { icon: "fa-shield-halved",text: "Do not drive yourself. Have someone accompany you to the hospital or call for assistance." },
  ],
};

// ===== EXPANDED DISEASE ARTICLES =====
const diseaseArticles = {
  // ── HEAD ──
  "Tension Headache": {
    overview: "Tension-type headache (TTH) is the most prevalent primary headache disorder, affecting up to 78% of the general population at some point in their lives. It manifests as a bilateral, non-pulsating pressure or tightening sensation — classically described as a band or vice around the head — of mild-to-moderate intensity that does not worsen with routine physical activity.",
    causes: "Pathophysiology involves peripheral sensitisation of pericranial myofascial tissues and, in chronic forms, central sensitisation. Key triggers include psychosocial stress, poor cervical posture, prolonged static work, inadequate sleep, dehydration, eyestrain, and caffeine withdrawal. Anxiety and depression significantly increase chronification risk.",
    treatment: "Acute episodic attacks respond well to aspirin 500–1000 mg, ibuprofen 400–600 mg, or paracetamol 500–1000 mg. Caffeine combinations (e.g. paracetamol + caffeine) may enhance efficacy. Non-pharmacological approaches — physiotherapy, biofeedback, cognitive behavioural therapy, and regular aerobic exercise — are especially important in preventing chronic TTH (>15 headache days/month), where prophylactic amitriptyline 25–75 mg is the drug of choice.",
    danger: "low",
    dangerNote: "Generally benign and not dangerous. Frequent episodic TTH (10–14 days/month) carries a risk of progression to chronic TTH and medication overuse headache. Seek medical review if headaches change in character, increase in frequency, or are accompanied by neurological symptoms."
  },
  "Migraine": {
    overview: "Migraine is a chronic neurological disorder affecting approximately 1 billion people worldwide. It is characterised by recurrent attacks of moderate-to-severe unilateral pulsating headache lasting 4–72 hours, associated with nausea and/or vomiting and disabling sensitivity to light and sound. About 25–30% of sufferers experience aura — fully reversible focal neurological symptoms (visual, sensory, speech) preceding the headache by 20–60 minutes.",
    causes: "Migraine involves cortical spreading depression, trigeminovascular activation, and neuroinflammatory cascades. Genetic susceptibility is strong (first-degree relatives have a 3-fold increased risk). Common triggers include hormonal fluctuations (menstruation, oral contraceptives), sleep disturbance, stress, specific foods (tyramine-rich aged cheese, alcohol, processed meats), dehydration, bright lights, and changes in barometric pressure.",
    treatment: "Acute treatment: oral triptans (sumatriptan, rizatriptan) combined with naproxen sodium are first-line; anti-emetics (metoclopramide) address nausea and enhance analgesia. Prophylaxis is indicated when attacks are ≥4 days/month or severely disabling — options include topiramate, propranolol, amitriptyline, valproate, and the newer CGRP monoclonal antibodies (erenumab, fremanezumab). Lifestyle: regular sleep schedule, meal timing, hydration, and a migraine diary to identify personal triggers.",
    danger: "moderate",
    dangerNote: "Migraine is disabling but rarely life-threatening. Important exceptions: migraine with aura increases ischaemic stroke risk (especially in women who smoke or use oestrogen-containing contraceptives). Seek emergency care for 'thunderclap headache' (worst of your life), headache with fever, stiff neck, rash, or new onset after age 50, as these may indicate subarachnoid haemorrhage or meningitis."
  },
  "Cluster Headache": {
    overview: "Cluster headache is classified among the trigeminal autonomic cephalalgias and is considered one of the most painful conditions known to medicine. Attacks consist of excruciating unilateral orbital, supraorbital, or temporal pain lasting 15–180 minutes, occurring in clusters of 1–8 attacks per day for weeks to months, separated by pain-free remission periods.",
    causes: "The precise mechanism involves hypothalamic activation (the 'biological clock') driving trigeminovascular and cranial parasympathetic pathways. Circadian and circannual periodicity strongly implicates the hypothalamus. Alcohol precipitates attacks during cluster periods only; smoking is a major risk factor. Male sex and a family history of cluster headache increase susceptibility.",
    treatment: "Acute: 100% high-flow oxygen (12–15 L/min via non-rebreather mask for 15–20 minutes) aborts 70–80% of attacks. Subcutaneous sumatriptan 6 mg provides rapid relief within 10–15 minutes. Intranasal zolmitriptan is an alternative. Prevention during cluster period: verapamil 240–960 mg daily (drug of choice), with short-course corticosteroid bridge at cluster onset for rapid suppression. Lithium and topiramate are used in refractory chronic cluster headache.",
    danger: "moderate",
    dangerNote: "Not life-threatening but profoundly debilitating — cluster headache carries a significantly elevated risk of depression and suicidal ideation due to pain severity. All patients should be under specialist neurological care. Seek emergency review if pain character changes or neurological signs develop."
  },
  "Hypertensive Headache": {
    overview: "A hypertensive headache develops when blood pressure reaches severely elevated levels, typically defined as systolic ≥180 mmHg and/or diastolic ≥120 mmHg. The pain is characteristically bilateral, occipital, and pulsating, and may be accompanied by visual blurring, nausea, chest discomfort, or nosebleed.",
    causes: "Uncontrolled essential hypertension, abrupt discontinuation of antihypertensive medication, renal parenchymal disease, primary aldosteronism, phaeochromocytoma, pre-eclampsia, or use of sympathomimetic substances (cocaine, amphetamines) can precipitate hypertensive crisis.",
    treatment: "Hypertensive urgency (no end-organ damage): oral antihypertensives (captopril, labetalol, amlodipine) with gradual BP reduction over 24–48 hours. Hypertensive emergency (end-organ damage to brain, heart, kidneys): IV antihypertensives (labetalol, nicardipine, sodium nitroprusside) with controlled reduction of mean arterial pressure by ≤25% in the first hour. Long-term management requires regular monitoring, lifestyle modification, and adherence to prescribed medication.",
    danger: "high",
    dangerNote: "⚠️ HIGH RISK — Hypertensive crisis is a medical emergency. Uncontrolled severe hypertension can cause hypertensive encephalopathy, haemorrhagic stroke, aortic dissection, acute heart failure, or acute kidney injury. Call emergency services immediately if BP exceeds 180/120 mmHg, particularly with headache, vision change, chest pain, or neurological deficits."
  },
  "Meningitis": {
    overview: "Meningitis is inflammation of the meninges — the three protective membranes surrounding the brain and spinal cord. The classical presentation comprises the triad of severe headache, neck stiffness (meningismus), and fever. Photophobia, phonophobia, and altered consciousness are common. A petechial or purpuric rash strongly suggests meningococcal disease and demands immediate intervention.",
    causes: "Bacterial meningitis (most dangerous): Neisseria meningitidis (meningococcus), Streptococcus pneumoniae, and Listeria monocytogenes in immunocompromised or elderly patients. Viral meningitis (most common): enteroviruses, herpes simplex virus. Fungal meningitis: Cryptococcus neoformans in immunocompromised patients. TB meningitis: subacute onset in endemic areas.",
    treatment: "Bacterial meningitis: IV ceftriaxone 2g stat + IV dexamethasone (to reduce cerebral inflammation) — do not delay antibiotics for CT if clinical diagnosis is clear. Viral meningitis: supportive care; aciclovir for HSV encephalitis. Lumbar puncture for CSF analysis is essential when safe. Prevention: MenACWY, PCV13/23, and Hib vaccines are highly effective.",
    danger: "high",
    dangerNote: "⚠️ LIFE-THREATENING EMERGENCY — Bacterial meningitis carries 20–30% mortality and significant morbidity (deafness, amputation, brain damage) even with treatment. A non-blanching petechial rash with fever is meningococcal septicaemia until proven otherwise — call emergency services (123) immediately and administer IM/IV penicillin G if available without delay."
  },
  // ── NECK ──
  "Acute Tonsillitis": {
    overview: "Tonsillitis is acute inflammation of the palatine tonsils, presenting with severe pharyngeal pain, odynophagia (painful swallowing), tonsillar erythema and oedema, often with exudate or follicles, fever, and tender anterior cervical lymphadenopathy. It is among the most common reasons for primary care consultation, particularly in children and young adults.",
    causes: "Group A beta-haemolytic Streptococcus (GABHS, Strep. pyogenes) causes approximately 30–40% of cases and is the only pathogen requiring antibiotic treatment. Viral causes (Epstein-Barr virus / infectious mononucleosis, adenovirus, influenza) account for the majority. The Centor/FeverPAIN criteria help stratify bacterial probability.",
    treatment: "Viral tonsillitis: supportive — analgesics (ibuprofen, paracetamol), adequate fluid intake, and throat lozenges. Bacterial (GABHS): phenoxymethylpenicillin (penicillin V) 500 mg BID for 10 days remains first-line; amoxicillin is avoided if EBV mononucleosis is possible (risk of widespread maculopapular rash). Recurrent tonsillitis (≥7 episodes in 1 year, or ≥5 in 2 consecutive years) warrants ENT referral for consideration of tonsillectomy.",
    danger: "low",
    dangerNote: "Usually straightforward and self-limiting. Complications of untreated GABHS include peritonsillar abscess (quinsy), rheumatic fever, and post-streptococcal glomerulonephritis. Seek urgent care for: drooling, trismus, muffled 'hot potato' voice (peritonsillar abscess), or severe systemic illness."
  },
  "Laryngopharyngeal Reflux (LPR)": {
    overview: "Laryngopharyngeal reflux is a variant of gastro-oesophageal reflux disease in which gastric contents reach the larynx and pharynx. Unlike classic GERD, patients typically do not experience heartburn. The condition presents with a constellation of throat symptoms: chronic throat clearing, hoarseness or voice fatigue, globus pharyngeus, post-nasal drip sensation, and a persistent dry cough.",
    causes: "LPR results from transient relaxation of the lower oesophageal sphincter and inadequate upper oesophageal sphincter competence, allowing acidic or non-acidic gastric reflux to reach the supraglottic larynx. Contributory factors include obesity, hiatus hernia, large meals, caffeine, alcohol, smoking, and tight-fitting garments.",
    treatment: "Lifestyle modification is foundational: weight loss, elevation of the head of bed by 15–20 cm, avoiding late evening meals (within 3 hours of sleep), and eliminating trigger foods (alcohol, caffeine, fatty foods, citrus, tomato). Twice-daily proton pump inhibitor therapy (e.g. omeprazole 20–40 mg AC) for a minimum of 3–6 months. Speech therapy for vocal hygiene. Laryngoscopy to exclude malignancy in persistent cases.",
    danger: "low",
    dangerNote: "Benign when managed appropriately but chronic laryngeal acid exposure increases risk of laryngeal inflammation and vocal cord changes. Persistent hoarseness lasting more than 3 weeks, particularly in smokers aged over 45, requires laryngoscopy to exclude laryngeal cancer."
  },
  "Laryngitis": {
    overview: "Laryngitis is inflammation of the larynx causing dysphonia (hoarseness) or complete aphonia. Acute laryngitis (< 3 weeks) is almost always infectious and self-limiting; chronic laryngitis (> 3 weeks) has diverse non-infectious causes and warrants further investigation. The mucosa appears erythematous and oedematous on laryngoscopy.",
    causes: "Acute: viral upper respiratory tract infection (rhinovirus, parainfluenza, adenovirus) is the most common cause; bacterial superinfection is rare. Chronic: gastro-oesophageal reflux, vocal misuse or overuse (singers, teachers), cigarette smoking, airborne irritants, allergic rhinitis with post-nasal drip, and — importantly — laryngeal malignancy.",
    treatment: "Acute viral laryngitis: complete voice rest (no whispering), adequate hydration, steam inhalation, and analgesics. Antibiotics are not indicated for viral laryngitis. Chronic laryngitis: treat the underlying cause — acid suppression for reflux, vocal therapy for dysphonia, smoking cessation, allergy management. Any hoarseness persisting beyond 3 weeks requires laryngoscopic evaluation.",
    danger: "low",
    dangerNote: "Acute laryngitis is self-limiting and resolves within 7–14 days. Persistent hoarseness (>3 weeks) must be investigated — particularly in smokers — to exclude laryngeal carcinoma or other pathology."
  },
  "Cervical Spondylosis": {
    overview: "Cervical spondylosis encompasses the spectrum of age-related degenerative changes in the cervical spine: intervertebral disc dehydration and narrowing, osteophyte formation at the vertebral endplates, facet joint osteoarthritis, and ligamentous hypertrophy. These changes are present radiographically in over 90% of individuals older than 65 years but are symptomatic in only a proportion.",
    causes: "Primary ageing-related disc degeneration accelerated by occupational or recreational neck loading, previous cervical injury, smoking, and genetic factors. Poor posture — especially prolonged forward head position during desk work or smartphone use — is an increasingly important precipitant in younger populations.",
    treatment: "Conservative management is effective in the majority: analgesics (paracetamol, NSAIDs), cervical physiotherapy emphasising strengthening and posture correction, ergonomic modification, and judicious use of a soft cervical collar for short periods only. Cervical epidural steroid injections for radicular pain. Surgical decompression (anterior cervical discectomy and fusion, ACDF, or posterior laminectomy) for progressive myelopathy or refractory radiculopathy.",
    danger: "moderate",
    dangerNote: "Spondylosis is a chronic condition that requires monitoring. Rapidly progressive neurological deficit, loss of bladder or bowel function, or severe bilateral limb weakness indicates spinal cord compression (myelopathy) and warrants urgent neurosurgical assessment."
  },
  "Cervical Disc Herniation": {
    overview: "Cervical disc herniation occurs when the nucleus pulposus of an intervertebral disc herniates through the annulus fibrosus, most commonly at C5/C6 or C6/C7. Compression of the exiting nerve root causes radiculopathy — dermatomal arm pain, paraesthesia, and weakness. Central herniation compressing the spinal cord causes myelopathy, a far more serious condition.",
    causes: "The primary mechanism is age-related disc degeneration combined with superimposed mechanical stress (axial loading, flexion-extension injury). Acute traumatic herniation may follow whiplash or contact sports injuries. Occupational exposure to vibration, smoking, and genetic susceptibility all contribute to disc vulnerability.",
    treatment: "Radiculopathy: structured conservative management for 6–12 weeks — oral NSAIDs and short-course oral corticosteroids, physiotherapy, and transforaminal epidural steroid injections. Surgery (anterior cervical discectomy and fusion, or posterior foraminotomy) is indicated for persistent neurological deficit, intractable pain unresponsive to conservative care, or progressive weakness. Myelopathy typically requires surgical decompression.",
    danger: "high",
    dangerNote: "⚠️ High risk if myelopathy is present — cord compression without timely surgical decompression can lead to permanent tetraparesis. Seek urgent neurosurgical review for progressive weakness, gait unsteadiness, bilateral upper limb symptoms, or any bladder or bowel dysfunction."
  },
  // ── CHEST ──
  "Musculoskeletal Chest Pain": {
    overview: "Musculoskeletal chest pain — also called chest wall pain — accounts for approximately 30% of all chest pain presentations in primary care. It encompasses costochondritis (sternal cartilage inflammation), Tietze syndrome (with visible swelling), intercostal muscle strain, and rib stress fractures. The pain is typically sharp, localised, and reproducible on palpation.",
    causes: "Physical exertion, repetitive upper limb movements, coughing, direct thoracic trauma, sporting activity, or poor posture. Costochondritis is idiopathic in many cases but may follow viral respiratory illness. Tietze syndrome affects the 2nd and 3rd costal cartilages specifically.",
    treatment: "Rest from provocative activity, application of ice packs in the first 48 hours followed by heat, and regular NSAIDs (ibuprofen 400 mg TID with food) typically resolve the condition within 1–6 weeks. Intercostal nerve block or corticosteroid injection into the costochondral junction provides relief in refractory cases. Physiotherapy addresses posture and ergonomics.",
    danger: "low",
    dangerNote: "Musculoskeletal chest pain is benign. However, it is a diagnosis of exclusion — cardiac causes must be ruled out first. Immediately seek emergency evaluation if chest pain is crushing or pressure-like, radiates to the jaw or left arm, is associated with sweating or breathlessness, or occurs at rest in a patient with cardiovascular risk factors."
  },
  "GERD / Acid Reflux": {
    overview: "Gastro-oesophageal reflux disease (GERD) is defined as reflux of gastric contents causing troublesome symptoms or mucosal injury. The cardinal symptom is heartburn — a retrosternal burning sensation — often with acid regurgitation. Atypical presentations include non-cardiac chest pain, chronic cough, laryngitis, and dental erosion, making GERD a common masquerader.",
    causes: "The primary mechanism is transient lower oesophageal sphincter (LOS) relaxation, allowing gastric contents to reflux. Predisposing factors: hiatus hernia (disrupts the gastro-oesophageal junction barrier), obesity (increases intra-abdominal pressure), pregnancy, delayed gastric emptying, smoking, alcohol, dietary triggers (fat, chocolate, caffeine, citrus, mint), large meals, and recumbency after eating.",
    treatment: "Lifestyle: weight loss (most effective intervention for obese patients), elevation of bed head by 15–20 cm, avoiding food 3 hours before bed, reducing portion sizes, and eliminating identified triggers. Pharmacological: proton pump inhibitors (PPIs — omeprazole, pantoprazole, esomeprazole) taken 30 minutes before breakfast are the most effective acid-suppressive therapy. H2 receptor antagonists (famotidine) are less potent alternatives. Anti-reflux surgery (laparoscopic fundoplication) for those unwilling or unable to take lifelong medication.",
    danger: "low",
    dangerNote: "GERD is manageable with treatment. Chronic uncontrolled GERD can lead to oesophagitis, Barrett's oesophagus (intestinal metaplasia, present in 10–15% of GERD patients), and oesophageal adenocarcinoma (though absolute risk remains low). Red flag symptoms — dysphagia, odynophagia, unintentional weight loss, iron-deficiency anaemia, or haematemesis — require urgent endoscopic evaluation."
  },
  "Community-Acquired Pneumonia": {
    overview: "Pneumonia is an acute infection of the lung parenchyma characterised by consolidation and inflammatory exudate filling the alveoli. Community-acquired pneumonia (CAP) presents with productive cough (purulent or rust-coloured sputum), pleuritic chest pain, fever, rigors, dyspnoea, and focal crepitations on auscultation. The CURB-65 score (Confusion, Urea, Respiratory rate, Blood pressure, Age ≥65) guides severity assessment and site-of-care decisions.",
    causes: "Streptococcus pneumoniae is the most common bacterial cause. Atypical organisms (Mycoplasma pneumoniae, Chlamydophila pneumoniae, Legionella pneumophila) cause 15–20% of CAP, particularly in younger patients. Viral pneumonia (influenza, RSV, SARS-CoV-2) has a distinct seasonal epidemiology. Risk factors: extremes of age, smoking, COPD, immunosuppression, and chronic comorbidities.",
    treatment: "Outpatient (CURB-65 score 0–1): oral amoxicillin 500 mg TID for 5 days, with a macrolide (azithromycin, clarithromycin) added for atypical cover or used in penicillin allergy. Inpatient (CURB-65 ≥2): IV co-amoxiclav + macrolide or IV cephalosporin + macrolide. Severe CAP (ICU): broader spectrum cover including Legionella. Supportive: oxygen, IV fluids, analgesia. Pneumococcal and influenza vaccination prevent common causes.",
    danger: "moderate",
    dangerNote: "CAP mortality ranges from <1% in outpatients to 5–15% in hospitalised patients and >30% in ICU admissions. Complications include parapneumonic effusion, empyema, lung abscess, and sepsis. Seek emergency care for respiratory rate >30/min, oxygen saturations <92%, confusion, low blood pressure, or failure to improve within 48 hours of antibiotics."
  },
  "Angina Pectoris": {
    overview: "Angina pectoris is the clinical manifestation of myocardial ischaemia — inadequate coronary blood flow relative to myocardial oxygen demand. Stable angina produces predictable, exertion-triggered retrosternal chest pressure, heaviness, or tightness, often radiating to the left arm, jaw, or epigastrium, and relieved within minutes by rest or sublingual glyceryl trinitrate (GTN). Unstable angina (crescendo, rest angina, or new-onset severe angina) constitutes an acute coronary syndrome.",
    causes: "Atherosclerotic coronary artery disease is the underlying substrate in >95% of cases — progressive plaque formation narrows the arterial lumen, limiting flow reserve. Risk factors: hypertension, dyslipidaemia, type 2 diabetes mellitus, cigarette smoking, obesity, physical inactivity, and a family history of premature coronary heart disease. Non-obstructive causes include coronary vasospasm (Prinzmetal's angina), anaemia, and aortic stenosis.",
    treatment: "Acute relief: sublingual GTN 0.4 mg spray/tablet; repeat at 5-minute intervals up to 3 doses. Anti-anginal agents: beta-blockers (bisoprolol, atenolol) are first-line — they reduce heart rate and myocardial oxygen demand. Long-acting nitrates and calcium channel blockers are added for symptom control. Secondary prevention: aspirin 75 mg daily, high-intensity statin (atorvastatin 40–80 mg), ACE inhibitor, and aggressive cardiovascular risk factor modification. Revascularisation: percutaneous coronary intervention (PCI/stenting) or CABG surgery for significant coronary disease.",
    danger: "high",
    dangerNote: "⚠️ HIGH RISK — Unstable angina is a cardiac emergency with high short-term risk of MI. Call emergency services (123) immediately for: chest pain at rest lasting >20 minutes, new-onset severe angina, or worsening angina pattern. Chew 300 mg aspirin if available and not contraindicated while awaiting ambulance."
  },
  "Pulmonary Embolism": {
    overview: "Pulmonary embolism (PE) occurs when a thrombus — most commonly originating from a deep leg or pelvic vein — embolises to the pulmonary arterial tree, causing ventilation-perfusion mismatch, right ventricular strain, and in massive PE, circulatory collapse. The clinical presentation ranges from pleuritic chest pain with haemoptysis (peripheral, smaller PE) to acute haemodynamic instability and sudden death (central, massive PE).",
    causes: "Virchow's triad — venous stasis, endothelial injury, and hypercoagulability — underpins VTE pathogenesis. Acquired risk factors: prolonged immobilisation (hospitalisation, long-haul flights), recent surgery or trauma, active malignancy (particularly pancreatic, lung, colorectal), oestrogen-containing medications, obesity, pregnancy, and previous VTE. Inherited thrombophilias (Factor V Leiden, prothrombin mutation, antiphospholipid syndrome) increase lifetime risk.",
    treatment: "Haemodynamically stable: anticoagulation with apixaban or rivaroxaban (DOACs) — preferred as they require no INR monitoring. Warfarin with LMWH bridge is an alternative. Duration: 3 months for provoked PE, extended or lifelong for unprovoked or cancer-associated PE. Haemodynamically unstable (massive PE): IV systemic thrombolysis (alteplase) or catheter-directed thrombolysis/surgical embolectomy. Oxygen supplementation. CT pulmonary angiography (CTPA) is the diagnostic gold standard.",
    danger: "high",
    dangerNote: "⚠️ POTENTIALLY FATAL EMERGENCY — Massive PE carries 30–60% mortality without treatment. Call emergency services (123) immediately for: sudden onset dyspnoea, pleuritic chest pain, or haemoptysis — especially following prolonged immobilisation, recent surgery, or leg swelling. Do not delay — early anticoagulation dramatically improves outcomes."
  },
  // ── ABDOMEN ──
  "Irritable Bowel Syndrome (IBS)": {
    overview: "Irritable bowel syndrome is the most prevalent functional gastrointestinal disorder, affecting 10–15% of the global population. Defined by the Rome IV criteria as recurrent abdominal pain (≥1 day/week for the past 3 months) related to defaecation and associated with a change in stool frequency or form. IBS subtypes are classified by predominant stool pattern: IBS-C (constipation), IBS-D (diarrhoea), IBS-M (mixed), and IBS-U (unclassified).",
    causes: "IBS is a disorder of gut–brain interaction. Pathophysiological mechanisms include altered intestinal motility, visceral hypersensitivity (lowered pain thresholds in the gut), increased intestinal permeability, dysbiosis of the gut microbiome, mucosal immune activation, and central sensitisation. Psychosocial factors (anxiety, depression, adverse life events, and somatisation) significantly modulate symptom severity. Post-infectious IBS follows acute gastroenteritis in 10–30% of cases.",
    treatment: "Dietary: low-FODMAP diet (reducing fermentable oligosaccharides, disaccharides, monosaccharides, and polyols) is evidenced to improve symptoms in 50–80% of patients under dietitian supervision. Pharmacological: IBS-D — loperamide, rifaximin (non-absorbable antibiotic), eluxadoline; IBS-C — osmotic laxatives (polyethylene glycol, lactulose), linaclotide, lubiprostone. Antispasmodics (mebeverine, hyoscine) reduce abdominal pain and bloating. Gut-directed psychological therapies (CBT, gut-directed hypnotherapy) have strong evidence bases.",
    danger: "low",
    dangerNote: "IBS is a chronic but benign condition that does not increase colorectal cancer risk. However, the following 'red flag' features mandate investigation to exclude organic pathology: rectal bleeding, nocturnal symptoms, unintended weight loss, family history of colorectal cancer or IBD, iron-deficiency anaemia, or symptom onset after age 50."
  },
  "Acute Gastroenteritis": {
    overview: "Acute gastroenteritis is inflammation of the gastrointestinal tract producing a self-limiting illness characterised by the sudden onset of nausea, vomiting, diarrhoea (often watery), abdominal cramping, and sometimes fever. It is one of the most common illnesses worldwide and accounts for significant morbidity, particularly in infants, the elderly, and immunocompromised individuals.",
    causes: "Norovirus is the most common cause in adults (50% of all cases). Rotavirus predominantly affects children under 5 years. Bacterial causes — Salmonella, Campylobacter jejuni, Escherichia coli, Shigella, and Clostridioides difficile — are associated with more severe illness, bloody diarrhoea, and higher fever. Traveller's diarrhoea is most commonly caused by enterotoxigenic E. coli (ETEC). Foodborne toxins (Staphylococcus aureus, Bacillus cereus) cause rapid-onset vomiting within 1–6 hours of ingestion.",
    treatment: "Oral rehydration therapy (ORT) with glucose-electrolyte solution is the cornerstone of management for all ages — it corrects dehydration and electrolyte losses more effectively than IV fluids in mild-moderate illness. Anti-emetics (ondansetron, metoclopramide) provide symptomatic relief. Loperamide reduces stool frequency in adults with non-bloody diarrhoea. Antibiotics are indicated for: invasive bacterial gastroenteritis (ciprofloxacin, azithromycin), C. difficile colitis (vancomycin PO), immunocompromised patients, and travellers' diarrhoea when symptoms are moderate-severe.",
    danger: "low",
    dangerNote: "Most cases resolve within 3–5 days without specific treatment. Danger signs requiring urgent medical attention: signs of severe dehydration (sunken eyes, reduced skin turgor, dark urine, confusion, no urination for >8 hours), bloody diarrhoea, high fever >39°C, symptoms persisting >7 days, or inability to tolerate any oral fluids."
  },
  "Peptic Ulcer Disease": {
    overview: "Peptic ulcer disease (PUD) comprises mucosal ulcers in the stomach (gastric ulcers) and proximal duodenum (duodenal ulcers). Duodenal ulcers (DU) are approximately 4 times more common and classically cause epigastric pain relieved by eating; gastric ulcers (GU) may worsen with food. Ulcers result from an imbalance between mucosal-damaging factors (acid, pepsin, H. pylori, NSAIDs) and protective mechanisms (mucus, bicarbonate, mucosal blood flow, prostaglandins).",
    causes: "H. pylori infection — a spiral gram-negative bacterium colonising the gastric antrum — is responsible for approximately 70% of DU and 50% of GU. NSAIDs (including low-dose aspirin) are the second most common cause, impairing COX-1-mediated prostaglandin synthesis. Zollinger-Ellison syndrome (gastrinoma) causes hypersecretory ulceration. Additional risk factors: smoking, alcohol excess, physiological stress (critically ill patients), and family history.",
    treatment: "H. pylori eradication: standard 7–14 day triple therapy (PPI + clarithromycin + amoxicillin or metronidazole). Confirm eradication with urea breath test or stool antigen test ≥4 weeks post-therapy. NSAID-induced ulcers: discontinue the offending agent if clinically possible; high-dose PPI therapy for 8 weeks (gastric) or 4 weeks (duodenal); misoprostol or PPI gastroprotection if NSAIDs cannot be stopped. Surgery (laparoscopic oversew or partial gastrectomy) reserved for complications: perforation, haemorrhage not amenable to endoscopic haemostasis, or obstruction.",
    danger: "moderate",
    dangerNote: "Peptic ulcers heal reliably with appropriate medical therapy in 4–8 weeks. Life-threatening complications include: haemorrhage (haematemesis / melaena — 5–10% of ulcers; mortality 5–10%), perforation (sudden-onset severe abdominal pain with board-like rigidity — surgical emergency), and gastric outlet obstruction. Seek emergency care for any of these presentations immediately."
  },
  "Acute Cholecystitis": {
    overview: "Acute cholecystitis is acute inflammation of the gallbladder, occurring in 90–95% of cases as a result of gallstone impaction in the cystic duct (calculous cholecystitis). The obstruction causes raised intraluminal pressure, mucosal ischaemia, and secondary bacterial infection. It presents with constant right upper quadrant (RUQ) or epigastric pain radiating to the right scapula, tenderness, fever, nausea, and a positive Murphy's sign (inspiratory arrest on RUQ palpation).",
    causes: "Gallstones (cholelithiasis) are present in over 90% of cases. Risk factors for gallstones follow the '4 F's': Female, Fat (obesity), Forty (increasing age), and Fertile (pregnancy). Rapid weight loss, total parenteral nutrition, prolonged fasting, haemolytic anaemia, and ileal disease (Crohn's) predispose to stone formation. Acalculous cholecystitis (without stones) occurs in critically ill patients and carries higher mortality.",
    treatment: "Hospitalisation, IV fluid resuscitation, analgesia (NSAIDs or opioids), and antibiotic therapy (IV co-amoxiclav or ciprofloxacin + metronidazole). Definitive treatment is laparoscopic cholecystectomy — ideally performed within 72 hours of symptom onset (early surgery is now recommended over delayed interval surgery). ERCP + sphincterotomy is performed first if common bile duct stones coexist.",
    danger: "moderate",
    dangerNote: "Acute cholecystitis requires prompt hospital admission. Complications include: gangrenous cholecystitis, gallbladder perforation with bile peritonitis, empyema, and ascending cholangitis with septicaemia. Charcot's triad (RUQ pain + jaundice + fever/rigors) indicates cholangitis and constitutes an emergency. Mortality rises significantly in untreated or delayed cases."
  },
  "Acute Appendicitis": {
    overview: "Acute appendicitis is the most common surgical abdominal emergency, with a lifetime risk of approximately 7%. The appendix obstructs — by faecalith, lymphoid hyperplasia, or mucus plug — leading to distension, ischaemia, bacterial translocation, and ultimately perforation if untreated. The classical presentation (present in only 50–60% of cases) is periumbilical pain migrating to the right iliac fossa at McBurney's point, with anorexia, nausea, and fever.",
    causes: "Luminal obstruction by a faecalith is the most common precipitant. Lymphoid follicle hyperplasia (in response to enteric infection) is especially common in children. Rarely: caecal tumour, carcinoid tumour, parasites (Enterobius vermicularis), or Crohn's disease may precipitate appendicitis.",
    treatment: "Emergency appendicectomy (laparoscopic preferred) remains the definitive treatment. Prophylactic antibiotics (IV co-amoxiclav or cefazolin + metronidazole) are given perioperatively. Conservative management with IV antibiotics (amoxicillin-clavulanate or cefotaxime + metronidazole) is increasingly used for uncomplicated appendicitis in selected patients, with approximately 30% requiring appendicectomy within 5 years. Perforated appendicitis requires urgent surgery with thorough peritoneal lavage.",
    danger: "high",
    dangerNote: "⚠️ SURGICAL EMERGENCY — Perforation occurs in approximately 20–30% of cases (more commonly in children under 5 and adults over 65) and leads to peritonitis and sepsis, which carries significant mortality. Do not eat or drink if appendicitis is suspected. Seek emergency care immediately for: constant severe RIF pain, board-like abdominal rigidity, high fever, or rapid deterioration."
  },
  // ── ARM ──
  "Rotator Cuff Tendinopathy": {
    overview: "Rotator cuff tendinopathy is the most common cause of shoulder pain, encompassing a spectrum from reactive tendinopathy and tendon dysrepair to degenerative tendinopathy and partial or full-thickness cuff tears. The supraspinatus tendon is most frequently affected. It manifests as anterolateral shoulder pain, a painful arc of abduction between 60° and 120°, and weakness on resisted shoulder abduction and external rotation.",
    causes: "Intrinsic factors: age-related collagen disorganisation and poor vascularity of the critical zone of the supraspinatus. Extrinsic factors: subacromial impingement due to a hooked acromion, acromioclavicular joint osteophytes, or scapular dyskinesis. Functional overload from repetitive overhead activities (swimming, throwing, painting, carpentry) is the most common precipitant. Poor scapular stabilisation and global rotator cuff weakness compromise shoulder mechanics.",
    treatment: "Conservative: activity modification, NSAIDs for 2–4 weeks, physiotherapy focused on rotator cuff strengthening and scapular stabilisation (6–12-week structured programme). Subacromial corticosteroid injection provides short-term pain relief (4–6 weeks) facilitating rehabilitation engagement. For persistent or large tears: arthroscopic subacromial decompression and rotator cuff repair achieves good outcomes. Post-operative physiotherapy is essential for 3–6 months.",
    danger: "low",
    dangerNote: "Generally a chronic, manageable condition. A full-thickness rotator cuff tear causing significant functional limitation or progressive muscle atrophy warrants surgical assessment. Acute traumatic tear with sudden onset weakness following dislocation or fall requires urgent orthopaedic review."
  },
  "Lateral Epicondylitis (Tennis Elbow)": {
    overview: "Lateral epicondylitis — commonly known as 'tennis elbow' — is a tendinopathy of the common extensor origin at the lateral humeral epicondyle, most affecting the extensor carpi radialis brevis (ECRB). It is characterised by lateral elbow pain, point tenderness 1–2 cm distal to the epicondyle, and pain reproduced by resisted wrist extension or middle finger extension. Despite the name, only 5% of sufferers are tennis players.",
    causes: "Repetitive forearm extensor muscle activation leading to micro-tearing, failed healing response, and collagen disorganisation (tendinosis) rather than classic inflammatory tendinitis. Occupational risk factors include repetitive gripping, lifting, typing, and tool use. Age (peak incidence 35–55 years), smoking, and obesity are additional risk factors.",
    treatment: "The mainstay of treatment is a 6–12 week physiotherapy programme emphasising eccentric strengthening of wrist extensors — the most evidence-based intervention for long-term recovery. NSAIDs provide short-term pain relief. A forearm counterforce brace reduces muscle load at the epicondyle during activities. Corticosteroid injection offers immediate but short-lived relief and may impair long-term outcomes compared to physiotherapy. PRP (platelet-rich plasma) injections show promise in refractory cases. Surgery (extensor origin debridement) is reserved for cases failing 6–12 months of conservative treatment.",
    danger: "low",
    dangerNote: "Tennis elbow is a benign, self-limiting condition in most cases — 80–90% of patients recover with conservative treatment over 12–18 months. Persistent neurological symptoms (paraesthesia, weakness beyond the forearm) should prompt evaluation for posterior interosseous nerve entrapment, which may mimic or coexist with lateral epicondylitis."
  },
  "Carpal Tunnel Syndrome": {
    overview: "Carpal tunnel syndrome (CTS) is the most common peripheral nerve entrapment neuropathy, affecting 3–6% of the adult population. Compression of the median nerve within the rigid carpal tunnel at the wrist produces a characteristic symptom complex: numbness, paraesthesia, and burning pain in the median nerve distribution (thumb, index, middle, and lateral half of the ring finger), typically nocturnal and relieved by shaking the hand ('flick sign'). Advanced CTS causes thenar muscle wasting and loss of fine motor function.",
    causes: "Any process that reduces carpal tunnel volume or increases its contents: repetitive wrist flexion/extension occupations (data entry, assembly line work, hairdressing), pregnancy-related fluid retention (resolves post-partum), hypothyroidism, acromegaly, rheumatoid arthritis, gout, amyloidosis, diabetes mellitus, and obesity. Idiopathic CTS is the most common variant. Positive Tinel's sign (percussing the carpal tunnel elicits tingling) and Phalen's test (sustained wrist flexion for 60 seconds reproduces symptoms) support diagnosis. Nerve conduction studies confirm and quantify severity.",
    treatment: "Mild-moderate: nocturnal wrist splint in neutral position (6–8 weeks), combined with activity modification and treatment of underlying cause. Corticosteroid injection into the carpal tunnel provides effective temporary relief (median 3 months) and predicts surgical outcome. Definitive treatment: carpal tunnel release (open or endoscopic) decompresses the median nerve — a highly effective, low-risk procedure with >90% patient satisfaction. Symptoms should improve within 3–6 months post-surgery, though numbness resolves more slowly than pain.",
    danger: "low",
    dangerNote: "CTS is benign when treated, but long-standing untreated nerve compression leads to permanent axonal loss and irreversible thenar atrophy. Seek prompt specialist referral for: constant (not just nocturnal) symptoms, weakness of thumb opposition, or visible thenar wasting, as these indicate advancing nerve damage."
  },
  "Bursitis": {
    overview: "Bursitis is acute or chronic inflammation of a bursa — small fluid-filled sacs that reduce friction between tendons, muscles, and bony prominences. Common sites include the subacromial (shoulder), olecranon (elbow), prepatellar (knee), trochanteric (hip), and retrocalcaneal (heel) bursae. Clinically it presents as localised pain, swelling, tenderness, and warmth over the affected bursa, aggravated by direct pressure or specific movements.",
    causes: "Mechanical: repetitive pressure or friction (kneeling — prepatellar bursitis; leaning on elbows — olecranon bursitis). Overuse or sudden increase in activity. Acute trauma. Inflammatory: crystal deposition (gout — monosodium urate, pseudogout — calcium pyrophosphate), rheumatoid arthritis, spondyloarthropathies. Infectious (septic bursitis): Staphylococcus aureus is the most common pathogen, often via overlying skin abrasion or wound.",
    treatment: "Non-septic bursitis: activity modification, protective padding, aspiration if large and tense, NSAIDs, and corticosteroid injection into the bursa for recalcitrant cases. Physiotherapy to correct biomechanical abnormalities reduces recurrence. Septic bursitis: bursal aspiration and culture, oral antibiotics (dicloxacillin or cefalexin for staphylococci) or IV antibiotics for systemic illness, with surgical debridement for refractory cases.",
    danger: "low",
    dangerNote: "Non-septic bursitis is not dangerous but tends to recur if the precipitating cause is not addressed. Septic bursitis requires antibiotic treatment to prevent spread to the joint or surrounding tissues. Red flags for septic bursitis: fever, rapidly enlarging warm swelling, surrounding cellulitis, or immunocompromise — these require urgent medical assessment and aspiration."
  },
  "Rheumatoid Arthritis": {
    overview: "Rheumatoid arthritis (RA) is a chronic systemic autoimmune disease characterised by persistent symmetrical synovitis — most characteristically affecting the metacarpophalangeal (MCP) and proximal interphalangeal (PIP) joints of the hands, wrists, and metatarsophalangeal (MTP) joints of the feet. Morning stiffness lasting more than 60 minutes is a hallmark. Untreated synovitis leads to progressive cartilage erosion and juxta-articular bone destruction, causing irreversible joint deformity. Extra-articular manifestations include rheumatoid nodules, vasculitis, pleural effusion, and accelerated cardiovascular disease.",
    causes: "RA results from a complex interaction of genetic predisposition (HLA-DRB1 shared epitope alleles confer the highest risk, present in 70% of seropositive RA), environmental triggers (cigarette smoking is the most potent modifiable risk factor, doubling risk), and dysregulated innate and adaptive immunity leading to production of pathogenic autoantibodies (rheumatoid factor, anti-CCP) and synovial infiltration by activated T cells, B cells, macrophages, and fibroblast-like synoviocytes.",
    treatment: "Early aggressive treatment with a treat-to-target strategy aiming for remission or low disease activity. Conventional DMARDs: methotrexate is the anchor drug (15–25 mg/week with folic acid supplementation); hydroxychloroquine, sulfasalazine, and leflunomide are alternatives or combination partners. Biologic DMARDs (anti-TNF agents: adalimumab, etanercept; IL-6 inhibitors: tocilizumab; B-cell depletion: rituximab; co-stimulation blockade: abatacept) for inadequate DMARD response. JAK inhibitors (tofacitinib, baricitinib) are oral targeted synthetics. NSAIDs and low-dose corticosteroids bridge until DMARDs take effect. Proactive cardiovascular risk factor management is essential.",
    danger: "high",
    dangerNote: "⚠️ Requires prompt rheumatological referral and long-term specialist care. Uncontrolled RA leads to progressive joint destruction, functional disability, and a significantly elevated risk of cardiovascular disease (equivalent to type 2 diabetes). Aggressive early treatment dramatically alters the disease course and prevents disability — the 'window of opportunity' is within the first 3–6 months of onset."
  },
  // ── PELVIS ──
  "Non-Specific Low Back Pain": {
    overview: "Non-specific low back pain (LBP) is defined as pain in the lumbosacral region without a specific underlying pathological cause — accounting for approximately 90% of all LBP presentations. It is the leading global cause of years lived with disability, with a lifetime prevalence of 70–80% in developed countries. It encompasses a spectrum from acute (<6 weeks), subacute (6–12 weeks), to chronic (>12 weeks) pain, with psychosocial factors ('yellow flags') being the most important predictors of chronification.",
    causes: "Paraspinal muscle and ligament strain (most common), facet joint irritation, segmental instability, and abnormal movement patterns. Risk factors include sedentary occupations with prolonged sitting, heavy manual work with repetitive bending and twisting, vibration exposure, poor core muscle conditioning, obesity, psychological distress, low job satisfaction, and cigarette smoking. Disc degeneration is a near-universal accompaniment of ageing but has a weak correlation with pain.",
    treatment: "Active self-management is the cornerstone — staying active, avoiding bed rest (harmful), and reassurance that most episodes resolve. Paracetamol provides modest analgesia. NSAIDs (ibuprofen, naproxen) are modestly superior for acute LBP. Short-course muscle relaxants (diazepam, methocarbamol) for muscle spasm. Supervised exercise therapy (core stabilisation, McKenzie method) and physiotherapy are first-line for chronic LBP. Psychological approaches (CBT, acceptance and commitment therapy) are highly effective for chronic pain. Opioids have limited evidence and carry significant harm risks. Spinal manipulation by a physiotherapist or osteopath provides modest short-term benefit. Epidural steroid injections for radicular pain.",
    danger: "low",
    dangerNote: "The vast majority of non-specific LBP resolves within 4–6 weeks. 'Red flag' features mandating urgent investigation for serious pathology (cancer, infection, cauda equina syndrome, fracture): onset under age 20 or over 55, constant progressive pain unrelated to activity, thoracic pain, night pain, fever, unexplained weight loss, bladder or bowel dysfunction (cauda equina — emergency), bilateral or progressive leg weakness, or history of malignancy."
  },
  "Urinary Tract Infection (UTI)": {
    overview: "Urinary tract infections are among the most common bacterial infections in clinical practice, particularly affecting women (50% lifetime prevalence, versus 5–12% in men). Uncomplicated lower UTI (cystitis) presents with dysuria, urinary frequency and urgency, suprapubic discomfort, cloudy or haematuria-tinged urine, and malodour, without fever or systemic features. Upper UTI (pyelonephritis) involves the renal parenchyma, causing high fever, rigors, loin pain, and costovertebral angle tenderness with or without lower urinary symptoms.",
    causes: "E. coli accounts for 75–85% of community-acquired uncomplicated UTIs. Other pathogens: Staphylococcus saprophyticus (especially in sexually active young women), Klebsiella pneumoniae, Proteus mirabilis, and Enterococcus faecalis. Risk factors: female sex (shorter urethra, proximity of urethral meatus to rectum), sexual intercourse ('honeymoon cystitis'), spermicide use, diaphragm use, post-menopausal oestrogen deficiency, urinary catheter, structural urinary tract abnormality, diabetes mellitus, and immunosuppression.",
    treatment: "Uncomplicated cystitis: first-line — nitrofurantoin 100 mg MR BID for 5 days (avoid in renal impairment), or trimethoprim 200 mg BID for 7 days, or fosfomycin 3 g single dose. Increase fluid intake and analgesia (phenazopyridine, paracetamol). Avoid fluoroquinolones for uncomplicated cystitis (WHO reserve category). Pyelonephritis: co-amoxiclav or ciprofloxacin for 7–14 days; IV antibiotics for systemic illness or vomiting. Urine culture guides definitive therapy based on sensitivities. Recurrent UTI (≥3/year): post-coital prophylaxis, low-dose prophylactic antibiotics, or intravaginal oestrogen (post-menopausal women).",
    danger: "moderate",
    dangerNote: "Uncomplicated cystitis is easily and effectively treated. Inadequately treated or ascending infection can lead to pyelonephritis, renal abscess, or gram-negative septicaemia — particularly dangerous in the elderly, diabetics, pregnant women, and immunocompromised patients. Seek urgent care for: fever and rigors with urinary symptoms, loin pain, pregnancy, symptoms persisting beyond 3 days of antibiotics, or recurrent infections."
  },
  "Lumbar Disc Herniation": {
    overview: "Lumbar disc herniation (LDH) — also termed prolapsed intervertebral disc (PID) — occurs when the nucleus pulposus extrudes through the annulus fibrosus, most commonly at L4/L5 (L5 nerve root) or L5/S1 (S1 nerve root). Compression of the traversing nerve root generates dermatomal radiculopathy: shooting sciatic pain from the buttock down the posterior thigh and calf to the foot, paraesthesia, sensory loss, and — in severe cases — muscle weakness (foot drop at L4/L5; plantarflexion weakness at L5/S1). MRI is the investigation of choice.",
    causes: "Disc herniation results from the combination of age-related disc degeneration (dehydration and weakening of the annulus) and superimposed mechanical stress — axial loading, sustained flexion, or a twisting injury. Occupational risk factors include heavy lifting, prolonged sitting with vibration, and physically demanding work. Obesity, smoking, and genetic predisposition accelerate disc degeneration. The peak incidence is between ages 30 and 50.",
    treatment: "Non-surgical (successful in 80–90% of patients): analgesia — NSAIDs for radicular pain, short-course oral corticosteroids to reduce nerve root oedema, gabapentin or pregabalin for neuropathic pain, cautious use of weak opioids. Active physiotherapy with neural mobilisation and McKenzie extension exercises. Transforaminal or caudal epidural steroid injections provide significant short-to-medium term pain relief and may accelerate recovery. Surgical: microdiscectomy (minimally invasive) or conventional lumbar discectomy is indicated for: cauda equina syndrome (emergency), progressive motor deficit, or failure to improve after 6–12 weeks of conservative management.",
    danger: "moderate",
    dangerNote: "⚠️ Cauda equina syndrome — bilateral leg weakness, saddle anaesthesia, and loss of bladder or bowel control — is a neurosurgical emergency. Delay in decompression beyond 24–48 hours significantly worsens prognosis for sphincter recovery. Any patient with these symptoms requires emergency MRI and urgent neurosurgical review."
  },
  "Pelvic Inflammatory Disease (PID)": {
    overview: "Pelvic inflammatory disease encompasses a spectrum of upper genital tract infections in women, including endometritis, salpingitis, tubo-ovarian abscess, and pelvic peritonitis. It presents with bilateral lower abdominal and pelvic pain (often subacute), purulent cervical or vaginal discharge, dyspareunia, uterine and adnexal tenderness on bimanual examination, and cervical motion tenderness (the 'chandelier sign'). Fever is present in approximately 30–50% of cases.",
    causes: "PID is predominantly polymicrobial, initiated by sexually transmitted pathogens — Chlamydia trachomatis (most common, often asymptomatic) and Neisseria gonorrhoeae — ascending from the cervix to the upper genital tract. Vaginal anaerobes, Gardnerella vaginalis, Haemophilus influenzae, and enteric bacteria contribute, particularly in severe cases. Risk factors: multiple sexual partners, age under 25, recent IUD insertion, previous PID, and lack of barrier contraception.",
    treatment: "Outpatient (mild-moderate, BASHH/CDC guidelines): IM ceftriaxone 500 mg stat + oral doxycycline 100 mg BID + metronidazole 400 mg BID for 14 days. Inpatient (severe, TOA, pregnancy, failed outpatient): IV cefoxitin or IV clindamycin + IV gentamicin, transitioning to oral therapy. Sexual partner(s) from the preceding 6 months require testing and empirical treatment. IUD need not be removed unless symptoms fail to improve within 72 hours. Surgical drainage for tubo-ovarian abscess not responding to antibiotics.",
    danger: "moderate",
    dangerNote: "A single episode of PID can impair future fertility — salpingitis causes tubal scarring increasing ectopic pregnancy risk 6–10-fold. Recurrent episodes progressively worsen the prognosis for fertility. Complications include tubo-ovarian abscess (requiring IV antibiotics or drainage), chronic pelvic pain, and Fitz-Hugh-Curtis syndrome (perihepatitis). Seek urgent care for fever, severe pain, or rapidly deteriorating condition."
  },
  "Kidney Stone (Urolithiasis)": {
    overview: "Nephrolithiasis affects approximately 10% of the population, with a high recurrence rate (50% within 5 years). Stones most commonly form in the kidney's collecting system and cause symptoms when they obstruct the ureter, producing renal colic — episodic, extremely severe, colicky loin-to-groin pain radiating to the ipsilateral genitalia, typically accompanied by haematuria (macroscopic in 90%), nausea and vomiting, and urinary urgency. Pain fluctuates but is relentless, unlike the constant pain of AAA or appendicitis.",
    causes: "Calcium oxalate stones (70–80%): associated with hypercalciuria, hyperoxaluria, hypocitraturia, and dehydration. Calcium phosphate stones: associated with renal tubular acidosis, hyperparathyroidism. Uric acid stones (5–10%): associated with hyperuricaemia, gout, high purine diet, type 2 diabetes, and metabolic syndrome. Struvite (infection) stones: formed in the presence of urea-splitting organisms (Proteus mirabilis). Cystine stones: autosomal recessive cystinuria. Risk factors: male sex, previous stones, family history, recurrent UTI, obesity, dehydration, low calcium diet (paradoxically increases stone risk), and high animal protein intake.",
    treatment: "Acute pain management: NSAIDs (diclofenac IM or PR) are superior to opioids for renal colic and also reduce ureteric oedema. IV opioids (morphine, pethidine) for breakthrough pain. IV fluids if vomiting prevents oral intake. Alpha-blockers (tamsulosin) facilitate passage of distal ureteric stones ≤10 mm. Spontaneous passage: stones ≤4 mm pass in ~80% of cases; stones >8 mm rarely pass spontaneously. Intervention: extracorporeal shock wave lithotripsy (ESWL) for renal and proximal ureteric stones; ureteroscopy + laser lithotripsy for ureteric stones; percutaneous nephrolithotomy (PCNL) for large or complex renal stones. Prevention: high fluid intake (>2.5 L urine/day), dietary modification, and specific pharmacological prevention based on stone composition.",
    danger: "high",
    dangerNote: "⚠️ Infected obstructed kidney (stone + UTI) is a urological emergency — septicaemia can develop rapidly. Seek immediate emergency care for: loin pain with fever, rigors, or signs of sepsis. Also seek urgent care for: single kidney with obstruction, bilateral ureteric obstruction causing anuria, or pain not controlled with analgesia. Urinary decompression (JJ stent or nephrostomy) must not be delayed."
  },
  // ── LEG ──
  "Patellofemoral Pain Syndrome": {
    overview: "Patellofemoral pain syndrome (PFPS) — also called 'runner's knee' or 'anterior knee pain syndrome' — is the most common knee complaint in sport medicine, accounting for 25–40% of all knee problems. It is characterised by diffuse peripatellar or retropatellar pain, worst with activities that load the knee in flexion: descending stairs, squatting, running, kneeling, and prolonged sitting (the 'theatre sign'). It affects predominantly young active individuals, with a female:male ratio of approximately 2:1.",
    causes: "PFPS results from excessive or abnormal patellofemoral joint stress. Contributing factors include: weak or poorly activated vastus medialis oblique (VMO) muscle causing lateral patellar maltracking, tight iliotibial band and lateral retinaculum, hip abductor and external rotator weakness causing femoral internal rotation (increasing Q-angle), a high Q-angle in women, hyperpronation of the foot, and training errors (rapid increase in load or mileage). Patellar chondromalacia (cartilage softening) may develop in chronic cases.",
    treatment: "Structured physiotherapy is the most effective intervention: targeted strengthening of the VMO (straight leg raises, terminal knee extension), hip abductor and external rotator strengthening (the most evidence-based element), and quadriceps flexibility exercises. Patellar taping (McConnell technique) provides immediate pain relief during rehabilitation. Custom foot orthoses for hyperpronation. Temporary activity modification — reducing hills, stairs, and high-impact loading — allows symptoms to settle while strength improves. NSAIDs for acute pain flares. Surgery is rarely indicated.",
    danger: "low",
    dangerNote: "PFPS is not dangerous and does not damage the joint when managed appropriately. Recovery can be prolonged (typically 3–6 months). Persistent untreated PFPS with continued high loading may progress to chondral damage. Symptoms not responding to a supervised physiotherapy programme warrant MRI to exclude other pathology (meniscal tear, trochlear dysplasia, or patellar tendinopathy)."
  },
  "Achilles Tendinopathy": {
    overview: "Achilles tendinopathy is a common overuse injury affecting the Achilles tendon — the largest and strongest tendon in the body — characterised by pain, stiffness, and swelling localised to the tendon body (mid-portion tendinopathy, 2–7 cm above the calcaneal insertion) or the insertion itself (insertional tendinopathy). Morning stiffness and pain that warms up with activity but worsens with prolonged loading are characteristic features.",
    causes: "Excessive or sudden increase in mechanical load on the Achilles tendon exceeds the tendon's adaptive capacity, leading to failed healing, collagen disorganisation, and neovascularisation (tendinosis rather than true inflammation). Intrinsic risk factors: tight gastrosoleus complex, hyperpronation, weak hip and calf musculature, advancing age, male sex, obesity, and metabolic conditions (diabetes, dyslipidaemia, hyperuricaemia, fluoroquinolone use — causes acute tendinopathy). Extrinsic: rapid increase in training volume or intensity, hard running surfaces, poor footwear.",
    treatment: "Load management is fundamental — modifying but not eliminating exercise. Eccentric calf strengthening (the Alfredson heavy-load protocol: 3 sets of 15 repetitions twice daily on a step, for 12 weeks) has the strongest evidence base for mid-portion tendinopathy. Isometric exercises provide immediate pain relief and are used in the acute phase. Low-level laser therapy and extracorporeal shockwave therapy (ESWT) are evidence-based adjuncts for chronic cases. Heel raises reduce Achilles load. Corticosteroid injections are contraindicated (tendon rupture risk). PRP injections: limited evidence. Surgery (open or endoscopic tendon debridement) for severe refractory cases after 6 months of conservative treatment.",
    danger: "low",
    dangerNote: "Achilles tendinopathy is manageable but responds slowly (typically 3–6 months of rehabilitation). Sudden onset of severe posterior ankle pain following a 'crack' or feeling of being 'kicked from behind' suggests complete Achilles tendon rupture — a surgical or cast-immobilisation emergency requiring immediate orthopaedic review."
  },
  "Varicose Veins / Chronic Venous Insufficiency": {
    overview: "Varicose veins are dilated, tortuous, subcutaneous veins ≥3 mm in diameter resulting from incompetence of venous valves in the great or small saphenous venous system. They produce a spectrum of symptoms: aching, heaviness, and fatigue in the legs (worse after prolonged standing), ankle oedema, pruritus, and hyperpigmentation. Chronic venous insufficiency (CVI) represents the advanced end of the spectrum, with skin changes (lipodermatosclerosis, atrophie blanche) and ultimately venous leg ulceration in severe cases.",
    causes: "Primary varicose veins (idiopathic) result from inherited valve incompetence and vein wall weakness — strong familial aggregation, with a 90% concordance in identical twins. Secondary causes: deep vein thrombosis (post-thrombotic syndrome), pregnancy (increased pelvic venous pressure and progesterone-mediated vein wall relaxation), pelvic masses, arteriovenous fistulae. Risk factors: female sex, multiparity, prolonged standing occupations, obesity, increasing age, and previous vein surgery.",
    treatment: "Conservative: class 2 (23–32 mmHg) graduated compression stockings are the foundation of conservative management — they reduce symptoms and slow disease progression. Leg elevation when resting, weight loss, avoiding prolonged static postures, and regular walking improve venous return. Interventional: endovenous thermal ablation (laser [EVLA] or radiofrequency [RFA]) of the great saphenous vein is the current first-line treatment — superior to surgical stripping in terms of recovery, recurrence, and complications. Foam sclerotherapy (chemical ablation with polidocanol or sodium tetradecyl sulphate) for recurrent or residual varicosities and spider veins. Conventional phlebectomy (ambulatory phlebectomy) under local anaesthesia removes large varicosities.",
    danger: "low",
    dangerNote: "Uncomplicated varicose veins are not dangerous. Complications include: superficial thrombophlebitis (painful, red, cord-like thrombosed vein — treated with NSAIDs and compression, rarely requiring anticoagulation), bleeding (variceal rupture — apply firm pressure and elevate the leg), and venous leg ulceration (requires specialist wound care, compression, and usually ablation of underlying incompetent veins to heal). Seek urgent care for spontaneous variceal haemorrhage."
  },
  "Meniscal Tear": {
    overview: "The menisci are C-shaped fibrocartilaginous structures that distribute load across the tibiofemoral joint, provide joint stability, and distribute synovial fluid. Meniscal tears present with joint line tenderness, mechanical symptoms (clicking, locking, or giving way), knee swelling (typically delayed by several hours after injury, due to haemarthrosis), and restricted range of motion. The medial meniscus is more commonly torn than the lateral (3:1 ratio).",
    causes: "Acute traumatic tears: twisting or hyperflexion injury of the loaded knee — common in contact sports (football, rugby), skiing, and martial arts. The medial meniscus is vulnerable due to its attachment to the medial collateral ligament. Degenerative (horizontal cleavage) tears: in individuals over 40, minimal trauma or simple twisting movement on a degenerate meniscus. Frequently coexist with osteoarthritis. Congenital discoid lateral meniscus predisposes to tearing in young patients.",
    treatment: "Conservative: appropriate for partial, stable, or degenerative tears — rest, RICE protocol, physiotherapy (quadriceps and hip strengthening), and analgesics. Evidence suggests conservative management equals surgery for degenerative meniscal tears in middle-aged patients without mechanical symptoms. Surgical: arthroscopic partial meniscectomy (removal of torn fragment) for mechanical symptoms (locking, giving way) not responding to conservative treatment. Meniscal repair (suturing of peripheral tears with good vascularity) is preferred in young patients to preserve meniscal tissue — particularly important in reducing long-term osteoarthritis risk.",
    danger: "moderate",
    dangerNote: "A locked knee — inability to fully extend due to a displaced bucket-handle meniscal tear — requires urgent orthopaedic assessment and may need emergency arthroscopy. Untreated significant meniscal tears accelerate tibiofemoral compartment cartilage loss and predispose to early knee osteoarthritis. MRI is the gold standard for diagnosis and surgical planning."
  },
  "Deep Vein Thrombosis (DVT)": {
    overview: "Deep vein thrombosis is the formation of a thrombus within a deep vein, most commonly the calf veins (60%), popliteal vein, femoral vein, or iliac vein. Clinical presentation: unilateral leg swelling, erythema, warmth, and calf or thigh tenderness. The classic 'Homans' sign' (calf pain on dorsiflexion) has poor specificity and sensitivity and should not be relied upon clinically. However, DVT is clinically silent in approximately 50% of cases. The primary danger is proximal extension and embolisation to the pulmonary circulation, causing PE.",
    causes: "Virchow's triad: venous stasis (immobility — hospitalisation, post-operative, long-haul travel, limb casting), endothelial injury (surgery, trauma, IV drug use, catheter), and hypercoagulability (inherited thrombophilia: Factor V Leiden mutation in 5% of the general population; acquired: malignancy — especially haematological and mucin-secreting solid tumours, oestrogen-containing oral contraceptives, pregnancy and the puerperium, antiphospholipid syndrome, polycythaemia vera, myeloproliferative disorders). Previous DVT/PE increases recurrence risk 5-fold.",
    treatment: "Diagnosis: Wells score for pre-test probability + D-dimer (high sensitivity, low specificity). Compression duplex ultrasound (USS) is the first-line imaging — highly sensitive for proximal DVT. CTPA or V/Q scan for suspected PE. Anticoagulation: DOACs (apixaban or rivaroxaban — weight-adjusted loading doses then maintenance, no INR monitoring required) are now first-line for most VTE. LMWH (enoxaparin) + warfarin bridge remains standard in pregnancy (DOACs are contraindicated), malignancy (LMWH preferred), and antiphospholipid syndrome. Duration: 3 months for provoked DVT with reversible risk factor, extended therapy for unprovoked DVT (recurrence risk 30% at 5 years) or permanent risk factors. Below-knee graduated compression stockings (30–40 mmHg) reduce post-thrombotic syndrome.",
    danger: "high",
    dangerNote: "⚠️ HIGH RISK — DVT carries a 10–20% risk of symptomatic PE during the first 3 months without anticoagulation. Massive PE can be fatal. Post-thrombotic syndrome (chronic leg swelling, pain, skin changes, venous ulceration) affects up to 50% of DVT patients, with greater severity in iliofemoral DVT. Seek immediate emergency assessment for: sudden-onset dyspnoea, chest pain, haemoptysis, or haemodynamic instability in a patient with suspected DVT — do not delay anticoagulation."
  },
};

// ===== SPECIALISTS DATA =====
const specialistsMap = {
  head: [
    { name: "Dr. Ahmed Khalil",    specialty: "Neurologist",          experience: "15 years", rating: 4.9, available: true,  img: "👨‍⚕️" },
    { name: "Dr. Sara Hassan",     specialty: "Neurologist",          experience: "12 years", rating: 4.8, available: true,  img: "👩‍⚕️" },
    { name: "Dr. Karim Nour",      specialty: "Headache Specialist",  experience: "10 years", rating: 4.7, available: false, img: "👨‍⚕️" },
  ],
  neck: [
    { name: "Dr. Mona Ashraf",     specialty: "ENT Specialist",       experience: "14 years", rating: 4.9, available: true,  img: "👩‍⚕️" },
    { name: "Dr. Omar Said",       specialty: "Otolaryngologist",     experience: "11 years", rating: 4.7, available: true,  img: "👨‍⚕️" },
    { name: "Dr. Dina Fathy",      specialty: "Throat Specialist",    experience: "9 years",  rating: 4.6, available: true,  img: "👩‍⚕️" },
  ],
  chest: [
    { name: "Dr. Tarek Mansour",   specialty: "Cardiologist",         experience: "18 years", rating: 4.9, available: true,  img: "👨‍⚕️" },
    { name: "Dr. Hoda Ibrahim",    specialty: "Pulmonologist",        experience: "13 years", rating: 4.8, available: false, img: "👩‍⚕️" },
    { name: "Dr. Youssef Gamal",   specialty: "Thoracic Surgeon",     experience: "16 years", rating: 4.7, available: true,  img: "👨‍⚕️" },
  ],
  abdomen: [
    { name: "Dr. Rania Saleh",     specialty: "Gastroenterologist",   experience: "12 years", rating: 4.8, available: true,  img: "👩‍⚕️" },
    { name: "Dr. Hesham Naguib",   specialty: "General Surgeon",      experience: "17 years", rating: 4.9, available: true,  img: "👨‍⚕️" },
    { name: "Dr. Yasmine Adel",    specialty: "Gastroenterologist",   experience: "8 years",  rating: 4.6, available: true,  img: "👩‍⚕️" },
  ],
  arm: [
    { name: "Dr. Samer Fouad",     specialty: "Orthopaedic Surgeon",  experience: "14 years", rating: 4.8, available: true,  img: "👨‍⚕️" },
    { name: "Dr. Layla Hamdy",     specialty: "Rheumatologist",       experience: "10 years", rating: 4.7, available: true,  img: "👩‍⚕️" },
    { name: "Dr. Amr Shawky",      specialty: "Physical Medicine",    experience: "11 years", rating: 4.7, available: false, img: "👨‍⚕️" },
  ],
  pelvis: [
    { name: "Dr. Nadia Lotfy",     specialty: "Urologist",            experience: "13 years", rating: 4.9, available: true,  img: "👩‍⚕️" },
    { name: "Dr. Khaled Wahba",    specialty: "Spine Specialist",     experience: "15 years", rating: 4.8, available: true,  img: "👨‍⚕️" },
    { name: "Dr. Samia Rizk",      specialty: "Physiotherapist",      experience: "9 years",  rating: 4.6, available: true,  img: "👩‍⚕️" },
  ],
  leg: [
    { name: "Dr. Walid Saad",      specialty: "Vascular Surgeon",     experience: "16 years", rating: 4.9, available: true,  img: "👨‍⚕️" },
    { name: "Dr. Iman Mostafa",    specialty: "Orthopaedic Surgeon",  experience: "12 years", rating: 4.7, available: true,  img: "👩‍⚕️" },
    { name: "Dr. Mahmoud Zaki",    specialty: "Physical Therapist",   experience: "8 years",  rating: 4.6, available: false, img: "👨‍⚕️" },
  ],
};

// ===== NURSES DATA =====
const nursesData = [
  { name: "Nurse Amira Kamal", specialty: "General Home Care", experience: "7 years", rating: 4.9, available: true, shift: "Morning & Evening", img: "👩‍⚕️" },
  { name: "Nurse Hassan Badr", specialty: "Wound Care", experience: "5 years", rating: 4.8, available: true, shift: "All Shifts", img: "👨‍⚕️" },
  { name: "Nurse Nour El-Din", specialty: "Post-Op Care", experience: "9 years", rating: 4.9, available: false, shift: "Morning", img: "👩‍⚕️" },
  { name: "Nurse Maged Samy", specialty: "Elderly Care", experience: "11 years", rating: 4.7, available: true, shift: "Evening & Night", img: "👨‍⚕️" },
  { name: "Nurse Hana Tarek", specialty: "Paediatric Care", experience: "6 years", rating: 4.8, available: true, shift: "Morning", img: "👩‍⚕️" },
  { name: "Nurse Sherif Ramzy", specialty: "Chronic Disease", experience: "8 years", rating: 4.6, available: true, shift: "All Shifts", img: "👨‍⚕️" },
];

// ===== STATE =====
let currentRegion = null;
let selectedSymptoms = [];

// ===== FUNCTIONS =====
function selectRegion(region) {
  currentRegion = region;
  selectedSymptoms = [];

  // Update SVG
  document
    .querySelectorAll(".body-part")
    .forEach((el) => el.classList.remove("selected"));
  const svgEl = document.getElementById("svg-" + region);
  if (svgEl) svgEl.classList.add("selected");
  // Handle arm (two parts)
  if (region === "arm") {
    document.getElementById("svg-arm-l").classList.add("selected");
    document.getElementById("svg-arm-r").classList.add("selected");
  }

  // Update buttons
  document
    .querySelectorAll(".region-btn")
    .forEach((el) => el.classList.remove("selected"));
  const btn = document.getElementById("rbtn-" + region);
  if (btn) btn.classList.add("selected");

  // Update body label
  const labels = {
    head: "Head & Brain",
    neck: "Neck & Throat",
    chest: "Chest & Heart",
    abdomen: "Abdomen",
    arm: "Arms & Shoulders",
    pelvis: "Pelvis & Back",
    leg: "Legs & Feet",
  };
  document.getElementById("body-label").textContent = "✓ " + labels[region];
  document.getElementById("region-display").textContent = labels[region];

  // Show step 2
  document.getElementById("step2-card").classList.remove("hidden");
  document
    .getElementById("step2-card")
    .scrollIntoView({ behavior: "smooth", block: "center" });

  // Render symptoms
  const syms = symptomsMap[region] || [];
  const container = document.getElementById("symptoms-tags");
  container.innerHTML = syms
    .map(
      (s) =>
        `<button class="symptom-tag" onclick="toggleSymptom(this,'${s}')">${s}</button>`,
    )
    .join("");

  // Update step indicator
  markStep(1);

  // Hide further steps
  document.getElementById("step3-card").classList.add("hidden");
  document.getElementById("results-card").classList.remove("show");
  document.getElementById("results-card").classList.add("hidden");
}

function toggleSymptom(el, sym) {
  el.classList.toggle("selected");
  if (el.classList.contains("selected")) {
    selectedSymptoms.push(sym);
  } else {
    selectedSymptoms = selectedSymptoms.filter((s) => s !== sym);
  }
  // Update count
  const countWrap = document.getElementById("selected-count-wrap");
  const countNum = document.getElementById("selected-count-num");
  if (selectedSymptoms.length > 0) {
    countWrap.classList.remove("hidden");
    countNum.textContent = selectedSymptoms.length;
  } else {
    countWrap.classList.add("hidden");
  }
}

function goToStep3() {
  if (selectedSymptoms.length === 0) {
    alert("Please select at least one symptom to continue.");
    return;
  }
  document.getElementById("step3-card").classList.remove("hidden");
  document
    .getElementById("step3-card")
    .scrollIntoView({ behavior: "smooth", block: "center" });
  markStep(2);
}

function runAnalysis() {
  markStep(3);
  // Show loading
  document.getElementById("step3-card").classList.add("hidden");
  document.getElementById("loading-card").classList.remove("hidden");

  // Animate progress dots
  let dotIdx = 0;
  const dots = document.querySelectorAll(".p-dot");
  const dotInterval = setInterval(() => {
    dots.forEach((d) => d.classList.remove("active"));
    dots[dotIdx % dots.length].classList.add("active");
    dotIdx++;
  }, 300);

  setTimeout(() => {
    clearInterval(dotInterval);
    document.getElementById("loading-card").classList.add("hidden");
    renderResults();
  }, 2500);
}

function renderResults() {
  const conditions = diagnosisMap[currentRegion] || [];
  const severity = parseInt(document.getElementById("severity-slider").value);

  // Determine overall severity
  let overallLevel = "low";
  if (severity >= 7) overallLevel = "high";
  else if (severity >= 4) overallLevel = "moderate";

  // Result title
  const titleMap = {
    head: "Head & Neurological Assessment",
    neck: "Neck & Throat Assessment",
    chest: "Cardiac & Pulmonary Assessment",
    abdomen: "Gastrointestinal Assessment",
    arm: "Musculoskeletal Assessment",
    pelvis: "Pelvic & Spinal Assessment",
    leg: "Lower Limb Assessment",
  };
  document.getElementById("result-title").textContent =
    titleMap[currentRegion] || "Assessment Results";
  document.getElementById("res-symptoms-count").textContent =
    selectedSymptoms.length;

  // Accuracy
  const acc = Math.min(95, 65 + selectedSymptoms.length * 4);
  document.getElementById("res-accuracy").textContent = acc + "%";

  // Severity pill
  const pill = document.getElementById("sev-pill");
  pill.className = "severity-pill";
  if (overallLevel === "high") {
    pill.classList.add("sev-high");
    pill.textContent = "High";
  } else if (overallLevel === "moderate") {
    pill.classList.add("sev-moderate");
    pill.textContent = "Moderate";
  } else {
    pill.classList.add("sev-low");
    pill.textContent = "Mild";
  }

  // Conditions
  const condOut = document.getElementById("conditions-output");
  condOut.innerHTML = conditions
    .map((c) => {
      const rankClass =
        c.pct >= 65 ? "rank-high" : c.pct >= 45 ? "rank-moderate" : "rank-low";
      const barColor =
        c.pct >= 65
          ? "linear-gradient(90deg,#ff4444,#cc0000)"
          : c.pct >= 45
            ? "linear-gradient(90deg,var(--bg),var(--secondary-light))"
            : "linear-gradient(90deg,#0000ff,#6a51ff)";
      return `
            <div class="condition-card">
              <div class="condition-rank ${rankClass}">
                <span class="rank-pct">${c.pct}%</span>
                <span class="rank-pct-label">match</span>
              </div>
              <div class="condition-info">
                <div class="condition-name">${c.name}</div>
                <div class="condition-desc">${c.desc}</div>
                <div class="condition-tags">${c.tags.map((t) => `<span class="condition-tag">${t}</span>`).join("")}</div>
                <div class="match-bar-wrap"><div class="match-bar" style="width:${c.pct}%;background:${barColor}"></div></div>
              </div>
            </div>
          `;
    })
    .join("");

  // Recommendations
  const recs = recMap[overallLevel] || recMap.moderate;
  document.getElementById("rec-list").innerHTML = recs
    .map(
      (r) =>
        `<div class="rec-item"><i class="fa-solid ${r.icon}"></i><span>${r.text}</span></div>`,
    )
    .join("");

  // ── Disease Article ──
  const topCondition = conditions[0];
  if (topCondition) {
    const art = diseaseArticles[topCondition.name];
    document.getElementById("article-title").textContent = topCondition.name;
    document.getElementById("article-subtitle").textContent = "Complete medical overview & treatment guide";
    if (art) {
      const dangerColors = { low: "#4a8f00", moderate: "#ff8c00", high: "#cc0000" };
      const dangerIcons = { low: "fa-circle-check", moderate: "fa-triangle-exclamation", high: "fa-circle-exclamation" };
      document.getElementById("article-body").innerHTML = `
        <div class="art-section">
          <h4><i class="fa-solid fa-stethoscope"></i> Overview</h4>
          <p>${art.overview}</p>
        </div>
        <div class="art-section">
          <h4><i class="fa-solid fa-magnifying-glass"></i> Causes & Risk Factors</h4>
          <p>${art.causes}</p>
        </div>
        <div class="art-section">
          <h4><i class="fa-solid fa-capsules"></i> Treatment Options</h4>
          <p>${art.treatment}</p>
        </div>
        <div class="art-danger" style="border-left-color:${dangerColors[art.danger]}">
          <i class="fa-solid ${dangerIcons[art.danger]}" style="color:${dangerColors[art.danger]}"></i>
          <p>${art.dangerNote}</p>
        </div>`;
    } else {
      document.getElementById("article-body").innerHTML = `<p style="color:var(--second)">Consult a specialist for detailed information about <strong>${topCondition.name}</strong>.</p>`;
    }
  }

  // ── Specialist Doctors ──
  const doctors = specialistsMap[currentRegion] || [];
  document.getElementById("doctors-grid").innerHTML = doctors.map(d => `
    <div class="provider-card">
      <div class="provider-avatar">${d.img}</div>
      <div class="provider-info">
        <div class="provider-name">${d.name}</div>
        <div class="provider-specialty"><i class="fa-solid fa-user-doctor"></i> ${d.specialty}</div>
        <div class="provider-meta">
          <span><i class="fa-solid fa-clock"></i> ${d.experience}</span>
          <span><i class="fa-solid fa-star"></i> ${d.rating}</span>
        </div>
      </div>
      <div class="provider-right">
        <div class="avail-badge ${d.available ? 'avail-yes' : 'avail-no'}">
          <i class="fa-solid fa-circle"></i> ${d.available ? "Available" : "Busy"}
        </div>
        <button class="book-btn" ${!d.available ? "disabled" : ""}
          onclick="openBookingModal('${d.name}','${d.specialty}','${d.img}','doctor')">
          <i class="fa-solid fa-calendar-plus"></i> Book
        </button>
      </div>
    </div>`).join("");

  // ── Nurses ──
  document.getElementById("nurses-grid").innerHTML = nursesData.map(n => `
    <div class="provider-card nurse-card">
      <div class="provider-avatar nurse-avatar">${n.img}</div>
      <div class="provider-info">
        <div class="provider-name">${n.name}</div>
        <div class="provider-specialty"><i class="fa-solid fa-user-nurse"></i> ${n.specialty}</div>
        <div class="provider-meta">
          <span><i class="fa-solid fa-clock"></i> ${n.experience}</span>
          <span><i class="fa-solid fa-star"></i> ${n.rating}</span>
        </div>
        <div class="provider-shift"><i class="fa-solid fa-sun"></i> ${n.shift}</div>
      </div>
      <div class="provider-right">
        <div class="avail-badge ${n.available ? 'avail-yes' : 'avail-no'}">
          <i class="fa-solid fa-circle"></i> ${n.available ? "Available" : "Busy"}
        </div>
        <button class="book-btn nurse-book" ${!n.available ? "disabled" : ""}
          onclick="openBookingModal('${n.name}','${n.specialty}','${n.img}','nurse')">
          <i class="fa-solid fa-calendar-plus"></i> Book
        </button>
      </div>
    </div>`).join("");

  // Show results
  const resCard = document.getElementById("results-card");
  resCard.classList.remove("hidden");
  resCard.classList.add("show");
  resCard.scrollIntoView({ behavior: "smooth", block: "start" });

  markStep(4, true);
}

function markStep(num, final = false) {
  for (let i = 1; i <= 4; i++) {
    const circle = document.getElementById("sc" + i);
    const label = document.getElementById("sl" + i);
    circle.classList.remove("active", "done");
    label.classList.remove("active");
    if (i < num) {
      circle.classList.add("done");
      circle.innerHTML =
        '<i class="fa-solid fa-check" style="font-size:0.8rem"></i>';
    } else if (i === num) {
      circle.classList.add("active");
      circle.textContent = i;
      label.classList.add("active");
    } else {
      circle.textContent = i;
    }
  }
  // Connectors
  for (let i = 1; i <= 3; i++) {
    const con = document.getElementById("con" + i);
    if (i < num) con.classList.add("done");
    else con.classList.remove("done");
  }
}

function resetDiagnosis() {
  currentRegion = null;
  selectedSymptoms = [];
  document
    .querySelectorAll(".body-part")
    .forEach((el) => el.classList.remove("selected"));
  document
    .querySelectorAll(".region-btn")
    .forEach((el) => el.classList.remove("selected"));
  document.getElementById("body-label").textContent = "Click to select";
  document.getElementById("step2-card").classList.add("hidden");
  document.getElementById("step3-card").classList.add("hidden");
  document.getElementById("results-card").classList.remove("show");
  document.getElementById("results-card").classList.add("hidden");
  document.getElementById("selected-count-wrap").classList.add("hidden");
  // Reset step circles
  for (let i = 1; i <= 4; i++) {
    const circle = document.getElementById("sc" + i);
    circle.className = "step-circle" + (i === 1 ? " active" : "");
    circle.textContent = i;
    const label = document.getElementById("sl" + i);
    label.classList.toggle("active", i === 1);
    if (i <= 3) document.getElementById("con" + i).classList.remove("done");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}
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

// Show modal after 5 seconds
setTimeout(function () {
  document.getElementById("subscribeModal").classList.add("active");
}, 10000);

// Close modal function
function closeSubscribeModal() {
  document.getElementById("subscribeModal").classList.remove("active");
}

// Close when clicking outside
document
  .getElementById("subscribeModal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closeSubscribeModal();
    }
  });
// ============================================================
// GOOGLE TRANSLATE - LANGUAGE TOGGLE
// ============================================================

// 1. Init Google Translate (مخفي)
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,ar",
      autoDisplay: false,
    },
    "google_translate_element",
  );
}

// 2. تحميل سكريبت جوجل
var gtScript = document.createElement("script");
gtScript.src =
  "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
document.body.appendChild(gtScript);

// 3. زرار التبديل
var currentLang = "en";
var toggleBtn = document.getElementById("lang-toggle");

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

// ═══════════════════════════════════════════
// BOOKING MODAL FUNCTIONS
// ═══════════════════════════════════════════
function openBookingModal(name, specialty, avatar, type) {
  // Set today as min date
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("bm-date").min = today;
  document.getElementById("bm-date").value = today;

  // Populate provider card info
  document.getElementById("bm-name").textContent = name;
  document.getElementById("bm-spec").textContent = specialty;
  document.getElementById("bm-avatar").textContent = avatar;

  // Price varies by type
  const priceEl = document.getElementById("bm-price");
  priceEl.innerHTML = type === "nurse"
    ? '<i class="fa-solid fa-tag"></i> $60 / Visit'
    : '<i class="fa-solid fa-tag"></i> $120 / Visit';

  // Style avatar & confirm button by type
  const av = document.getElementById("bm-avatar");
  const confirmBtn = document.getElementById("bm-confirm-btn");
  if (type === "nurse") {
    av.className = "bm-prov-avatar nur-av";
    confirmBtn.className = "bm-confirm nurse-confirm";
  } else {
    av.className = "bm-prov-avatar doc-av";
    confirmBtn.className = "bm-confirm";
  }

  // Reset form fields & hide success
  document.getElementById("bm-form").style.display    = "flex";
  document.getElementById("bm-success").style.display = "none";
  document.getElementById("bm-patient-name").value    = "";
  document.getElementById("bm-phone").value           = "";
  document.getElementById("bm-email").value           = "";
  document.getElementById("bm-time").value            = "";
  document.getElementById("bm-type").value            = "home";
  document.getElementById("bm-symptoms").value        = "";

  // Show modal
  document.getElementById("bookingModalOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeBookingModal(e) {
  if (e && e.target !== document.getElementById("bookingModalOverlay")) return;
  document.getElementById("bookingModalOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

function confirmBooking() {
  const name     = document.getElementById("bm-patient-name").value.trim();
  const phone    = document.getElementById("bm-phone").value.trim();
  const email    = document.getElementById("bm-email").value.trim();
  const date     = document.getElementById("bm-date").value;
  const time     = document.getElementById("bm-time").value;
  const type     = document.getElementById("bm-type").value;
  const symptoms = document.getElementById("bm-symptoms").value.trim();
  const prov     = document.getElementById("bm-name").textContent;

  // Validation
  if (!name)  { shakeInput("bm-patient-name", "Please enter your name.");        return; }
  if (!phone) { shakeInput("bm-phone",         "Please enter your phone number."); return; }
  if (!date)  { shakeInput("bm-date",          "Please select a date.");          return; }
  if (!time)  { shakeInput("bm-time",          "Please select a time slot.");     return; }

  const typeLabel = {
    home:   "🏠 Home Visit",
    clinic: "🏥 Clinic Visit",
    video:  "📹 Video Visit (Virtual)",
    online: "💻 Online Consultation"
  }[type] || type;

  // Show success
  document.getElementById("bm-form").style.display    = "none";
  document.getElementById("bm-success").style.display = "flex";
  document.getElementById("bm-success-msg").innerHTML =
    `<strong>${name}</strong>, your appointment with <strong>${prov}</strong> is confirmed!<br><br>
     📅 <strong>${date}</strong> &nbsp;|&nbsp; ⏰ <strong>${time}</strong><br>
     ${typeLabel}<br><br>
     Confirmation will be sent to <strong>${phone}</strong>${email ? ' & <strong>' + email + '</strong>' : ''}.
     ${symptoms ? '<br><em style="font-size:0.78rem;color:#888">Reason: ' + symptoms + '</em>' : ''}`;
}

function shakeInput(id, msg) {
  const el = document.getElementById(id);
  el.style.borderColor = "#cc0000";
  el.focus();
  el.placeholder = msg;
  el.style.animation = "none";
  el.offsetHeight; // reflow
  el.style.animation = "shakeField 0.4s ease";
  setTimeout(() => { el.style.borderColor = ""; }, 1800);
}

// Shake animation injected dynamically
(function injectShakeAnim() {
  const s = document.createElement("style");
  s.textContent = `@keyframes shakeField {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-6px)}
    40%{transform:translateX(6px)}
    60%{transform:translateX(-4px)}
    80%{transform:translateX(4px)}
  }`;
  document.head.appendChild(s);
})();

// ESC closes booking modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.getElementById("bookingModalOverlay").classList.remove("active");
    document.body.style.overflow = "";
  }
});
