const password = document.getElementById("password");
const strength = document.getElementById("strength");
const bar = document.getElementById("bar");
const togglePassword = document.getElementById("togglePassword");
const themeSelector = document.getElementById("themeSelector");

/* -------------------------------
   🚀 LOADING SCREEN CONTROLLER
--------------------------------*/
window.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");

    // fade out after 1.2 seconds
    setTimeout(() => {
        loadingScreen.classList.add("hide");

        // remove from layout after fade
        setTimeout(() => {
            loadingScreen.style.display = "none";
        }, 900); // matches CSS fade speed
    }, 1200); 
});


/* -------------------------------
   🔥 PASSWORD STRENGTH CHECKER
--------------------------------*/
password.addEventListener("input", function () {
    const value = password.value;
    let score = 0;

    if (value.length > 6) score++;
    if (value.match(/[0-9]/)) score++;
    if (value.match(/[A-Z]/)) score++;
    if (value.match(/[^A-Za-z0-9]/)) score++;

    bar.classList.remove("glow-weak", "glow-medium", "glow-strong");

    if (value.length === 0) {
        strength.textContent = "Strength: ";
        strength.className = "";
        bar.style.width = "0%";
        bar.style.background = "red";
    } 
    else if (score <= 1) {
        strength.textContent = "Strength: WEAK";
        strength.className = "weak";
        bar.style.width = "25%";
        bar.style.background = "red";
        bar.classList.add("glow-weak");
    } 
    else if (score === 2 || score === 3) {
        strength.textContent = "Strength: MEDIUM";
        strength.className = "medium";
        bar.style.width = "60%";
        bar.style.background = "orange";
        bar.classList.add("glow-medium");
    } 
    else {
        strength.textContent = "Strength: STRONG";
        strength.className = "strong";
        bar.style.width = "100%";
        bar.style.background = "limegreen";
        bar.classList.add("glow-strong");
    }
});

/* -------------------------------
   👁 SHOW / HIDE PASSWORD
--------------------------------*/
togglePassword.addEventListener("click", function () {
    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        password.type = "password";
        togglePassword.textContent = "Show";
    }
});

/* -------------------------------
   🎨 THEME SELECTOR
--------------------------------*/
themeSelector.addEventListener("change", function () {
    document.body.classList.remove("dark", "cyberpunk");

    if (this.value === "dark") {
        document.body.classList.add("dark");
    } 
    else if (this.value === "cyberpunk") {
        document.body.classList.add("cyberpunk");
    }
    // "light" = no class needed
});
const urls = [
    { text: "https://paypal.com", phishing: false },
    { text: "https://secure-paypal.com/login", phishing: true },
    { text: "https://github.com", phishing: false },
    { text: "https://github-security-alert.com", phishing: true }
];

let currentUrlIndex = 0;
const gameUrl = document.getElementById("gameUrl");
const urlSafeBtn = document.getElementById("urlSafeBtn");
const urlPhishingBtn = document.getElementById("urlPhishingBtn");
const urlGameResult = document.getElementById("urlGameResult");

function showUrl() {
    gameUrl.textContent = urls[currentUrlIndex].text;
    urlGameResult.textContent = "";
}

urlSafeBtn.addEventListener("click", () => checkUrl(false));
urlPhishingBtn.addEventListener("click", () => checkUrl(true));

function checkUrl(answer) {
    const url = urls[currentUrlIndex];
    if (answer === url.phishing) {
        urlGameResult.textContent = "✅ Correct!";
        urlGameResult.style.color = "lime";
    } else {
        urlGameResult.textContent = "❌ Wrong!";
        urlGameResult.style.color = "red";
    }
    currentUrlIndex = (currentUrlIndex + 1) % urls.length;
    setTimeout(showUrl, 1000);
}

showUrl();

