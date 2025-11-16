// -------------------------------
// ELEMENTS
// -------------------------------
const password = document.getElementById("password");
const strength = document.getElementById("strength");
const bar = document.getElementById("bar");
const togglePassword = document.getElementById("togglePassword");
const themeSelector = document.getElementById("themeSelector");

// Hacker simulation game elements
const gamePassword = document.getElementById("gamePassword");
const checkPassword = document.getElementById("checkPassword");
const gameResult = document.getElementById("gameResult");

// Phishing URL game
const gameUrl = document.getElementById("gameUrl");
const urlSafeBtn = document.getElementById("urlSafeBtn");
const urlPhishingBtn = document.getElementById("urlPhishingBtn");
const urlGameResult = document.getElementById("urlGameResult");

// Achievements
const badgesContainer = document.getElementById("badges");
let achievements = [];

// -------------------------------
// LOADING SCREEN
// -------------------------------
window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");
    setTimeout(() => {
        loadingScreen.classList.add("hide");
    }, 1000);
});

// -------------------------------
// PASSWORD STRENGTH CHECKER
// -------------------------------
password.addEventListener("input", function () {
    const value = password.value;
    let score = 0;

    if (value.length > 6) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    bar.classList.remove("glow-weak","glow-medium","glow-strong");

    if (value.length === 0) {
        strength.textContent = "Strength: ";
        bar.style.width = "0%";
        bar.style.background = "red";
    } else if (score <= 1) {
        strength.textContent = "Strength: WEAK";
        bar.style.width = "25%";
        bar.style.background = "red";
    } else if (score <=3) {
        strength.textContent = "Strength: MEDIUM";
        bar.style.width = "60%";
        bar.style.background = "orange";
    } else {
        strength.textContent = "Strength: STRONG";
        bar.style.width = "100%";
        bar.style.background = "limegreen";
    }
});

// -------------------------------
// SHOW/HIDE PASSWORD
// -------------------------------
togglePassword.addEventListener("click", function() {
    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        password.type = "password";
        togglePassword.textContent = "Show";
    }
});

// -------------------------------
// THEME SELECTOR
// -------------------------------
themeSelector.addEventListener("change", function() {
    document.body.classList.remove("light","dark","cyberpunk");
    if(this.value === "dark") document.body.classList.add("dark");
    else if(this.value === "cyberpunk") document.body.classList.add("cyberpunk");
});

// -------------------------------
// GUESS SAFE PASSWORD GAME
// -------------------------------
checkPassword.addEventListener("click", function() {
    const value = gamePassword.value;
    let score = 0;
    let hints = [];

    if(value.length >= 8) score++; else hints.push("Use at least 8 characters");
    if(/[A-Z]/.test(value)) score++; else hints.push("Add an uppercase letter");
    if(/[0-9]/.test(value)) score++; else hints.push("Add a number");
    if(/[^A-Za-z0-9]/.test(value)) score++; else hints.push("Add a symbol (!@#$%)");

    if(score === 4) {
        gameResult.textContent = "✅ ACCESS GRANTED! Safe password!";
        gameResult.style.color = "#00ff00";
        gamePassword.value = "";
        addAchievement("Strong Password Guesser");
    } else {
        gameResult.textContent = "❌ Unsafe password. " + hints.join(", ");
        gameResult.style.color = "#ff0000";
    }
});

// -------------------------------
// PHISHING URL GAME
// -------------------------------
const urls = [
    {url: "https://secure-bank.com/login", safe:true},
    {url: "http://bit.ly/fakebank", safe:false},
    {url: "https://accounts.google.com", safe:true},
    {url: "http://phishingsite.com", safe:false},
];

let currentUrlIndex = 0;

function showUrl() {
    const u = urls[currentUrlIndex];
    gameUrl.textContent = u.url;
    urlGameResult.textContent = "";
}

urlSafeBtn.addEventListener("click", () => checkUrl(true));
urlPhishingBtn.addEventListener("click", () => checkUrl(false));

function checkUrl(choice) {
    const u = urls[currentUrlIndex];
    if(choice === u.safe) {
        urlGameResult.textContent = "✅ Correct!";
        urlGameResult.style.color = "#00ff00";
        addAchievement("Phishing Spotter");
    } else {
        urlGameResult.textContent = "❌ Wrong!";
        urlGameResult.style.color = "#ff0000";
    }
    currentUrlIndex = (currentUrlIndex +1) % urls.length;
    setTimeout(showUrl, 1000);
}

// -------------------------------
// ACHIEVEMENTS
// -------------------------------
function addAchievement(name) {
    if(!achievements.includes(name)) {
        achievements.push(name);
        const badge = document.createElement("div");
        badge.className = "badge";
        badge.textContent = name;
        badgesContainer.appendChild(badge);
    }
}

// Initialize first URL
showUrl();
