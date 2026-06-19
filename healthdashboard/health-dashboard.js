const vitalDetails = {
  temperature: {
    title: "Body Temperature",
    icon: "fa-temperature-half",
    color: "#06b6d4",
    content: `
      <h4><i class="fa-solid fa-circle-info"></i> About Body Temperature</h4>
      <p>Normal body temperature ranges from 36.1°C to 37.2°C (97°F to 99°F). Your current reading of 36.8°C is within the normal range.</p>

      <h4><i class="fa-solid fa-triangle-exclamation"></i> When to Seek Help</h4>
      <p>Contact your doctor if your temperature drops below 35°C (95°F) or rises above 39°C (102°F), or if a fever persists for more than 3 days.</p>

      <h4><i class="fa-solid fa-lightbulb"></i> Tips</h4>
      <p>• Measure at the same time each day<br>• Avoid measuring after exercise or a hot shower<br>• Oral thermometers provide more accurate readings</p>
    `,
  },
  sugar: {
    title: "Blood Sugar",
    icon: "fa-cube",
    color: "#f59e0b",
    content: `
      <h4><i class="fa-solid fa-circle-info"></i> About Blood Sugar</h4>
      <p>Normal fasting blood sugar: 70–100 mg/dL. Your reading of 105 mg/dL is slightly elevated (pre-diabetic range).</p>

      <h4><i class="fa-solid fa-triangle-exclamation"></i> Recommendations</h4>
      <p>Consider lifestyle adjustments: reduce sugar intake, increase physical activity, and monitor regularly. Consult your doctor if readings consistently stay above 100 mg/dL.</p>

      <h4><i class="fa-solid fa-lightbulb"></i> Control Tips</h4>
      <p>• Test while fasting (8+ hours without food)<br>• Regular exercise helps lower blood sugar<br>• Choose low-glycemic index foods</p>
    `,
  },
  pressure: {
    title: "Blood Pressure",
    icon: "fa-droplet",
    color: "#ec4899",
    content: `
      <h4><i class="fa-solid fa-circle-info"></i> About Blood Pressure</h4>
      <p>Your reading of 120/80 mmHg is considered ideal. The first number (systolic) measures pressure when the heart beats; the second (diastolic) when the heart rests.</p>

      <h4><i class="fa-solid fa-chart-line"></i> Categories</h4>
      <p>• Normal: below 120/80<br>• Elevated: 120–129 systolic<br>• High: 130+ systolic or 80+ diastolic</p>

      <h4><i class="fa-solid fa-lightbulb"></i> Maintenance Tips</h4>
      <p>• Reduce sodium intake<br>• Exercise regularly<br>• Maintain a healthy weight<br>• Limit alcohol and quit smoking</p>
    `,
  },
  heartrate: {
    title: "Heart Rate",
    icon: "fa-heart",
    color: "#ef4444",
    content: `
      <h4><i class="fa-solid fa-circle-info"></i> About Resting Heart Rate</h4>
      <p>Normal resting heart rate for adults: 60–100 bpm. Athletes may have 40–60 bpm. Your rate of 78 bpm is healthy.</p>

      <h4><i class="fa-solid fa-heart-pulse"></i> Influencing Factors</h4>
      <p>• Fitness level<br>• Stress and emotions<br>• Medications<br>• Body position<br>• Air temperature</p>

      <h4><i class="fa-solid fa-lightbulb"></i> Improvement Tips</h4>
      <p>Regular cardiovascular exercise can lower your resting heart rate and improve heart efficiency over time.</p>
    `,
  },
  oxygen: {
    title: "Oxygen Saturation",
    icon: "fa-lungs",
    color: "#8b5cf6",
    content: `
      <h4><i class="fa-solid fa-circle-info"></i> About SpO2</h4>
      <p>Normal oxygen saturation: 95–100%. Your level of 98% is excellent. Below 90% is considered low (hypoxia).</p>

      <h4><i class="fa-solid fa-lungs-virus"></i> Influencing Factors</h4>
      <p>• Lung conditions (asthma, COPD)<br>• High altitudes<br>• Sleep apnea<br>• Heart disease</p>

      <h4><i class="fa-solid fa-lightbulb"></i> Monitoring Notes</h4>
      <p>Pulse oximeters measure oxygen levels non-invasively. Readings can be affected by nail polish, cold hands, or poor circulation.</p>
    `,
  },
  respiratory: {
    title: "Respiratory Rate",
    icon: "fa-wind",
    color: "#14b8a6",
    content: `
      <h4><i class="fa-solid fa-circle-info"></i> About Respiratory Rate</h4>
      <p>Normal respiratory rate for adults: 12–20 breaths per minute. Your rate of 16 is normal.</p>

      <h4><i class="fa-solid fa-triangle-exclamation"></i> Abnormal Rates</h4>
      <p>• Bradypnea: below 12 (too slow)<br>• Tachypnea: above 20 (too fast)<br>• Both may indicate underlying conditions</p>

      <h4><i class="fa-solid fa-lungs"></i> Breathing Exercises</h4>
      <p>Practice deep breathing: inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds. Helps reduce stress and improve lung capacity.</p>
    `,
  },
  bmi: {
    title: "Body Mass Index",
    icon: "fa-weight-scale",
    color: "#f97316",
    content: `
      <h4><i class="fa-solid fa-circle-info"></i> About BMI</h4>
      <p>BMI = Weight (kg) / Height² (m²). Your BMI of 22.5 falls within the healthy weight range (18.5–24.9).</p>

      <h4><i class="fa-solid fa-chart-pie"></i> BMI Categories</h4>
      <p>• Underweight: below 18.5<br>• Healthy: 18.5–24.9<br>• Overweight: 25–29.9<br>• Obese: 30 and above</p>

      <h4><i class="fa-solid fa-triangle-exclamation"></i> Limitations</h4>
      <p>BMI does not distinguish between muscle and fat. Athletes may have a higher BMI due to muscle mass. Waist circumference is also an important metric.</p>
    `,
  },
  sleep: {
    title: "Sleep Quality",
    icon: "fa-moon",
    color: "#6366f1",
    content: `
      <h4><i class="fa-solid fa-circle-info"></i> About Sleep</h4>
      <p>Adults need 7–9 hours of quality sleep. Your 7.5 hours is good. Quality matters as much as quantity.</p>

      <h4><i class="fa-solid fa-bed"></i> Sleep Stages</h4>
      <p>• Light sleep: 50–60% of the night<br>• Deep sleep: 15–20% (restoration)<br>• REM sleep: 20–25% (dreams, memory)</p>

      <h4><i class="fa-solid fa-lightbulb"></i> Sleep Hygiene</h4>
      <p>• Consistent sleep schedule<br>• Dark, cool room (18°C / 64°F)<br>• No screens 1 hour before bed<br>• Avoid caffeine after noon</p>
    `,
  },
};

function showVitalDetails(vitalKey) {
  const vital = vitalDetails[vitalKey];
  if (!vital) return;

  const header = document.getElementById("vital-modal-header");
  const body = document.getElementById("vital-modal-body");

  header.innerHTML = `
    <i class="fa-solid ${vital.icon}" style="font-size: 3rem; color: ${vital.color}; margin-bottom: 15px;"></i>
    <h2>${vital.title}</h2>
    <p>Detailed information & recommendations</p>
  `;

  body.innerHTML = vital.content;

  const overlay = document.getElementById("vital-modal-overlay");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeVitalModal(event) {
  if (
    event &&
    event.target !== document.getElementById("vital-modal-overlay") &&
    !event.target.closest(".vital-modal-close")
  ) {
    return;
  }

  const overlay = document.getElementById("vital-modal-overlay");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Close on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeVitalModal();
  }
});

// Animate progress bars on load
window.addEventListener("load", function () {
  const progressBars = document.querySelectorAll(
    ".progress-bar, .progress-fill, .bp-bar, .bar"
  );
  progressBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
});
