// -------------------------------
// ELEMENTS
// -------------------------------
const password = document.getElementById("password");
const strength = document.getElementById("strength");
const bar = document.getElementById("bar");
const togglePassword = document.getElementById("togglePassword");
const themeSelector = document.getElementById("themeSelector");

const passwordGuess = document.getElementById("passwordGuess");
const checkPasswordGuess = document.getElementById("checkPasswordGuess");
const passwordGameResult = document.getElementById("passwordGameResult");
const badges = document.getElementById("badges");

const gameUrl = document.getElementById("gameUrl");
const urlSafeBtn = document.getElementById("urlSafeBtn");
const urlPhishingBtn = document.getElementById("urlPhishingBtn");
const urlGameResult = document.getElementById("urlGameResult");

const loadingScreen = document.getElementById("loading-screen");

// -------------------------------
// LOADING SCREEN
// -------------------------------
window.addEventListener("load", () => {
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

    bar.classList.remove("glow-weak", "glow-medium", "glow-strong");

    if (value.length === 0) {
        strength.textContent = "Strength: ";
        bar.style.width = "0%";
        bar.style.background = "red";
    } 
    else if (score <= 1) {
        strength.textContent = "Strength: WEAK";
        bar.style.width = "25%";
        bar.style.background = "red";
    } 
    else if (score === 2 || score === 3) {
        strength.textContent = "Strength: MEDIUM";
        bar.style.width = "60%";
        bar.style.background = "orange";
    } 
    else {
        strength.textContent = "Strength: STRONG";
        bar.style.width = "100%";
        bar.style.background = "limegreen";
    }
});

// -------------------------------
// SHOW/HIDE PASSWORD
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
// THEME SELECTOR
// -------------------------------
themeSelector.addEventListener("change", function () {
    document.body.classList.remove("light", "dark", "cyberpunk");

    if (this.value === "light") document.body.classList.add("light");
    if (this.value === "dark") document.body.classList.add("dark");
    if (this.value === "cyberpunk") document.body.classList.add("cyberpunk");
});

// -------------------------------
// GUESS SAFE PASSWORD GAME
// -------------------------------
checkPasswordGuess.addEventListener("click", function () {
    const value = passwordGuess.value;
    let score = 0;
    let hints = [];

    if (value.length >= 8) score++; else hints.push("Use at least 8 characters");
    if (/[A-Z]/.test(value)) score++; else hints.push("Add uppercase letter");
    if (/[0-9]/.test(value)) score++; else hints.push("Add number");
    if (/[^A-Za-z0-9]/.test(value)) score++; else hints.push("Add symbol");

    if (score === 4) {
        passwordGameResult.textContent = "✅ ACCESS GRANTED! Safe password!";
        passwordGameResult.style.color = "#00ff00";
        passwordGuess.value = "";

        // Add badge
        const badge = document.createElement("div");
        badge.className = "badge";
        badge.textContent = "Safe Password ✅";
        badges.appendChild(badge);
    } else {
        passwordGameResult.textContent = "❌ Unsafe password. " + hints.join(", ");
        passwordGameResult.style.color = "#ff0000";
    }
});

// -------------------------------
// PHISHING URL GAME
// -------------------------------
const urls = [
    { url: "https://securebank.com/login", safe: true },
    { url: "http://securebank.co/login", safe: false },
    { url: "https://amaz0n.com/account", safe: false },
    { url: "https://github.com", safe: true },
    { url: "http://paypa1.com", safe: false },
];

let currentUrlIndex = 0;

function showUrl() {
    const current = urls[currentUrlIndex];
    gameUrl.textContent = current.url;
    urlGameResult.textContent = "";
}

urlSafeBtn.addEventListener("click", () => checkUrl(true));
urlPhishingBtn.addEventListener("click", () => checkUrl(false));

function checkUrl(choice) {
    const current = urls[currentUrlIndex];
    if (choice === current.safe) {
        urlGameResult.textContent = "✅ Correct!";
        urlGameResult.style.color = "#00ff00";

        // Add badge
        const badge = document.createElement("div");
        badge.className = "badge";
        badge.textContent = "URL Correct ✅";
        badges.appendChild(badge);
    } else {
        urlGameResult.textContent = "❌ Wrong!";
        urlGameResult.style.color = "#ff0000";
    }

    currentUrlIndex = (currentUrlIndex + 1) % urls.length;
    setTimeout(showUrl, 1000);
}

// Initial URL
showUrl();
