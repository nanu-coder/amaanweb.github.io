// -------------------------------
// Elements
// -------------------------------
const password = document.getElementById("password");
const strength = document.getElementById("strength");
const bar = document.getElementById("bar");
const togglePassword = document.getElementById("togglePassword");
const themeSelector = document.getElementById("themeSelector");

// Hacker simulation game elements
const gamePassword = document.getElementById("gamePassword");
const checkPassword = document.getElementById("checkPassword");
const gameFeedback = document.getElementById("gameFeedback");
const gameResult = document.getElementById("gameResult");

// -------------------------------
// Loading Screen
// -------------------------------
window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");
    setTimeout(() => {
        loadingScreen.classList.add("hide");
    }, 1000); // 1 second delay
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
    document.body.classList.remove("dark", "cyberpunk");

    if (this.value === "dark") {
        document.body.classList.add("dark");
    } 
    else if (this.value === "cyberpunk") {
        document.body.classList.add("cyberpunk");
    }
    // light theme = no class
});

// -------------------------------
// Hacker Simulation Game: Guess a Safe Password
// -------------------------------
if (checkPassword) {
    checkPassword.addEventListener("click", function() {
        const value = gamePassword.value;
        let score = 0;
        let hints = [];

        // Rules
        if (value.length >= 8) score++; else hints.push("Use at least 8 characters");
        if (/[A-Z]/.test(value)) score++; else hints.push("Add an uppercase letter");
        if (/[0-9]/.test(value)) score++; else hints.push("Add a number");
        if (/[^A-Za-z0-9]/.test(value)) score++; else hints.push("Add a symbol (!@#$%)");

        // Check if safe
        if (score === 4) {
            gameResult.textContent = "✅ ACCESS GRANTED! Safe password!";
            gameResult.style.color = "#00ff00";
            gamePassword.value = "";
        } else {
            gameResult.textContent = "❌ Unsafe password. " + hints.join(", ");
            gameResult.style.color = "#ff0000";
        }
    });
}
