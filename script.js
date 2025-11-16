const password = document.getElementById("password");
const strength = document.getElementById("strength");
const bar = document.getElementById("bar");
const togglePassword = document.getElementById("togglePassword");
const darkModeBtn = document.getElementById("darkModeBtn");

// Password Strength Checker
password.addEventListener("input", function () {
    const value = password.value;
    let score = 0;

    if (value.length > 6) score++;
    if (value.match(/[0-9]/)) score++;
    if (value.match(/[A-Z]/)) score++;
    if (value.match(/[^A-Za-z0-9]/)) score++;

    // Reset glow classes
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


// Show / Hide Password Button
togglePassword.addEventListener("click", function () {
    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        password.type = "password";
        togglePassword.textContent = "Show";
    }
});

// Dark Mode Button
darkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
});
