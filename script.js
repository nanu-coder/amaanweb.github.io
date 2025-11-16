// -------------------------------
// Elements
// -------------------------------
const password = document.getElementById("password");
const strength = document.getElementById("strength");
const bar = document.getElementById("bar");
const togglePassword = document.getElementById("togglePassword");
const themeSelector = document.getElementById("themeSelector");

// Hacker simulation game elements
const gamePassword = document.getElementById("passwordGuess");
const checkPassword = document.getElementById("checkPasswordGuess");
const gameResult = document.getElementById("passwordGameResult");

// Phishing URL game elements
const gameUrl = document.getElementById("gameUrl");
const urlSafeBtn = document.getElementById("urlSafeBtn");
const urlPhishingBtn = document.getElementById("urlPhishingBtn");
const urlGameResult = document.getElementById("urlGameResult");

// -------------------------------
// Loading Screen
// -------------------------------
window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");
    setTimeout(() => {
        loadingScreen.classList.add("hide");
    }, 1000);
});

// -------------------------------
// Password Strength Checker
// -------------------------------
password.addEventListener("input", function () {
    const value = password.value;
    let score = 0;

    if (value.length > 6) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    bar.classList.remove("glow-weak", "glow-medium", "glow-strong");

    if (value.length === 0) {
        strength.textContent = "Strength: ";
        bar.style.width = "0%";
        bar.style.background = "red";
    } else if (score <= 1) {
        strength.textContent = "Strength: WEAK";
        bar.style.width = "25%";
        bar.style.background = "red";
    } else if (score === 2 || score === 3) {
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
// Show/Hide Password
// -------------------------------
togglePassword.addEventListener("click", function () {
    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        password.type = "password";
        togglePassword.textContent = "Show";
    }
});

// -------------------------------
// Theme Selector
// -------------------------------
themeSelector.addEventListener("change", function () {
    document.body.classList.remove("light", "dark", "cyberpunk");

    if (this.value === "dark") document.body.classList.add("dark");
    else if (this.value === "cyberpunk") document.body.classList.add("cyberpunk");
    else if (this.value === "light") document.body.classList.add("light");
});

// -------------------------------
// Hacker Simulation Game: Guess a Safe Password
// -------------------------------
checkPassword.addEventListener("click", function() {
    const value = gamePassword.value;
    let score = 0;
    let hints = [];

    if (value.length >= 8) score++; else hints.push("Use at least 8 characters");
    if (/[A-Z]/.test(value)) score++; else hints.push("Add an uppercase letter");
    if (/[0-9]/.test(value)) score++; else hints.push("Add a number");
    if (/[^A-Za-z0-9]/.test(value)) score++; else hints.push("Add a symbol (!@#$%)");

    if (score === 4) {
        gameResult.textContent = "✅ ACCESS GRANTED! Safe password!";
        gameResult.style.color = "#00ff00";
        gamePassword.value = "";

        // Add badge
        const badgesDiv = document.getElementById("badges");
        const badge = document.createElement("div");
        badge.className = "badge";
        badge.textContent = "Safe Password Master!";
        badgesDiv.appendChild(badge);
    } else {
        gameResult.textContent = "❌ Unsafe password. " + hints.join(", ");
        gameResult.style.color = "#ff0000";
    }
});

// -------------------------------
// Phishing URL Game
// -------------------------------
const urls = [
    { url: "http://secure-bank.com", safe: true },
    { url: "http://free-money-now.com", safe: false },
    { url: "http://your-bank-secure.com", safe: false },
    { url: "https://github.com", safe: true }
];

let currentUrl = null;

function nextUrl() {
    currentUrl = urls[Math.floor(Math.random() * urls.length)];
    gameUrl.textContent = currentUrl.url;
    urlGameResult.textContent = "";
}

urlSafeBtn.addEventListener("click", () => checkUrl(true));
urlPhishingBtn.addEventListener("click", () => checkUrl(false));

function checkUrl(userChoice) {
    if (currentUrl.safe === userChoice) {
        urlGameResult.textContent = "✅ Correct!";
        urlGameResult.style.color = "#00ff00";
    } else {
        urlGameResult.textContent = "❌ Wrong!";
        urlGameResult.style.color = "#ff0000";
    }
    nextUrl();
}

// Start first URL
nextUrl();

