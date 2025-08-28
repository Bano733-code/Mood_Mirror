// ========== Tabs ==========
const tabLinks = document.querySelectorAll(".tab-link");
const tabContents = document.querySelectorAll(".tab-content");

tabLinks.forEach(link => {
  link.addEventListener("click", () => {
    tabLinks.forEach(l => l.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));

    link.classList.add("active");
    document.getElementById(link.dataset.tab).classList.add("active");
  });
});

// ========== Journal ==========
const moodInput = document.getElementById("moodInput");
const saveMood = document.getElementById("saveMood");
const moodOutput = document.getElementById("moodOutput");
const recentEntries = document.getElementById("recentEntries");
const historyList = document.getElementById("historyList");

const quotes = [
  "You are stronger than you think 💪",
  "Every day is a second chance 🌞",
  "Breathe. You’re doing great 🌸",
  "Storms don’t last forever ⛈️ → 🌈"
];

function getEmoji(mood) {
  if (/happy|joy|excited/i.test(mood)) return "😊";
  if (/sad|down|unhappy/i.test(mood)) return "😢";
  if (/angry|frustrated/i.test(mood)) return "😡";
  if (/tired|sleepy/i.test(mood)) return "😴";
  return "🌸";
}

function saveEntry() {
  const mood = moodInput.value.trim();
  if (!mood) return;

  const date = new Date().toLocaleDateString();
  const entry = { mood, date };

  let moods = JSON.parse(localStorage.getItem("moods")) || [];
  moods.push(entry);
  localStorage.setItem("moods", JSON.stringify(moods));

  // Output summary
  const emoji = getEmoji(mood);
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  moodOutput.innerHTML = `<p><strong>Today:</strong> ${emoji} ${mood}</p><p>${randomQuote}</p>`;

  moodInput.value = "";
  displayRecent();
  displayHistory();
}

saveMood.addEventListener("click", saveEntry);

function displayRecent() {
  let moods = JSON.parse(localStorage.getItem("moods")) || [];
  recentEntries.innerHTML = "";
  moods.slice(-5).reverse().forEach(m => {
    const li = document.createElement("li");
    li.textContent = `${m.date}: ${m.mood}`;
    recentEntries.appendChild(li);
  });
}

function displayHistory() {
  let moods = JSON.parse(localStorage.getItem("moods")) || [];
  historyList.innerHTML = "";
  moods.forEach(m => {
    const li = document.createElement("li");
    li.textContent = `${m.date}: ${m.mood}`;
    historyList.appendChild(li);
  });
}

displayRecent();
displayHistory();

// ========== Tips ==========
const tips = [
  "Take 5 deep breaths 🌬️",
  "Go for a 10 min walk 🚶",
  "Drink water 💧",
  "Write down 3 things you’re grateful for 🙏",
  "Listen to your favorite song 🎶"
];

document.getElementById("newTip").addEventListener("click", () => {
  const tipBox = document.getElementById("tipBox");
  tipBox.textContent = tips[Math.floor(Math.random() * tips.length)];
});

// ========== Quotes ==========
document.getElementById("newQuote").addEventListener("click", () => {
  const quoteBox = document.getElementById("quoteBox");
  quoteBox.textContent = quotes[Math.floor(Math.random() * quotes.length)];
});
