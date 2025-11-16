// -------------------------------
// ELEMENTS
// -------------------------------
const password = document.getElementById("password");
const strength = document.getElementById("strength");
const bar = document.getElementById("bar");
const togglePassword = document.getElementById("togglePassword");
const themeSelector = document.getElementById("themeSelector");

const gamePasswordGuess = document.getElementById("passwordGuess");
const checkPasswordGuess = document.getElementById("checkPasswordGuess");
const passwordGameResult = document.getElementById("passwordGameResult");

const gameUrl = document.getElementById("gameUrl");
const urlSafeBtn = document.getElementById("urlSafeBtn");
const urlPhishingBtn = document.getElementById("urlPhishingBtn");
const urlGameResult = document.getElementById("urlGameResult");

const badgesContainer = document.getElementById("badges");

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
// PASSWORD STRENGTH
// -------------------------------
password.addEventListener("input", () => {
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
    else if (score <= 3) {
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
togglePassword.addEventListener("click", () => {
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
    document.body.classList.remove("light","dark","cyberpunk");
    document.body.classList.add(this.value);
});

// -------------------------------
// ACHIEVEMENTS HELPER
// -------------------------------
function addBadge(name){
    if(!document.getElementById(`badge-${name}`)){
        const badge = document.createElement("div");
        badge.id = `badge-${name}`;
        badge.className = "badge";
        badge.textContent = name;
        badgesContainer.appendChild(badge);
    }
}

// -------------------------------
// GUESS SAFE PASSWORD GAME
// -------------------------------
checkPasswordGuess.addEventListener("click", () => {
    const value = gamePasswordGuess.value;
    let score = 0;
    let hints = [];

    if(value.length >= 8) score++; else hints.push("8+ chars");
    if(/[A-Z]/.test(value)) score++; else hints.push("Uppercase");
    if(/[0-9]/.test(value)) score++; else hints.push("Number");
    if(/[^A-Za-z0-9]/.test(value)) score++; else hints.push("Symbol");

    if(score===4){
        passwordGameResult.textContent="✅ ACCESS GRANTED!";
        passwordGameResult.style.color="#00ff00";
        gamePasswordGuess.value="";
        addBadge("Safe Password");
    } else {
        passwordGameResult.textContent="❌ Unsafe. Add: " + hints.join(", ");
        passwordGameResult.style.color="#ff0000";
    }
});

// -------------------------------
// PHISHING URL GAME
// -------------------------------
const urlList = [
    {url:"https://secure-bank.com", safe:true},
    {url:"http://login-paypal.com", safe:false},
    {url:"https://github.com", safe:true},
    {url:"http://verify-account.com", safe:false}
];

let currentUrlIndex = 0;

function showUrl(){
    gameUrl.textContent = urlList[currentUrlIndex].url;
    urlGameResult.textContent = "";
}

function checkUrl(isSafe){
    const correct = urlList[currentUrlIndex].safe === isSafe;
    if(correct){
        urlGameResult.textContent="✅ Correct!";
        urlGameResult.style.color="#00ff00";
        addBadge("URL Detective");
    } else {
        urlGameResult.textContent="❌ Wrong!";
        urlGameResult.style.color="#ff0000";
    }
    currentUrlIndex = (currentUrlIndex + 1) % urlList.length;
    setTimeout(showUrl,800);
}

urlSafeBtn.addEventListener("click",()=>checkUrl(true));
urlPhishingBtn.addEventListener("click",()=>checkUrl(false));

showUrl();
