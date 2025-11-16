/* ---------------- SELECT ELEMENTS ---------------- */
const password = document.getElementById("password");
const strength = document.getElementById("strength");
const bar = document.getElementById("bar");
const togglePassword = document.getElementById("togglePassword");
const themeSelector = document.getElementById("themeSelector");

const gameUrl = document.getElementById("gameUrl");
const urlSafeBtn = document.getElementById("urlSafeBtn");
const urlPhishingBtn = document.getElementById("urlPhishingBtn");
const urlGameResult = document.getElementById("urlGameResult");

const passwordGuessInput = document.getElementById("passwordGuess");
const checkPasswordGuessBtn = document.getElementById("checkPasswordGuess");
const passwordGameResult = document.getElementById("passwordGameResult");

const badgesContainer = document.getElementById("badges");

/* ---------------- LOADING SCREEN ---------------- */
window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");
    setTimeout(() => loadingScreen.classList.add("hide"), 1000);
});

/* ---------------- PASSWORD STRENGTH ---------------- */
password.addEventListener("input", function () {
    const value = password.value;
    let score = 0;
    if (value.length > 6) score++;
    if (value.match(/[0-9]/)) score++;
    if (value.match(/[A-Z]/)) score++;
    if (value.match(/[^A-Za-z0-9]/)) score++;

    bar.classList.remove("glow-weak","glow-medium","glow-strong");

    if(value.length===0){
        strength.textContent="Strength: ";
        bar.style.width="0%";
    }
    else if(score<=1){
        strength.textContent="Strength: WEAK"; strength.className="weak";
        bar.style.width="25%"; bar.style.background="red"; bar.classList.add("glow-weak");
    }
    else if(score===2||score===3){
        strength.textContent="Strength: MEDIUM"; strength.className="medium";
        bar.style.width="60%"; bar.style.background="orange"; bar.classList.add("glow-medium");
    }
    else{
        strength.textContent="Strength: STRONG"; strength.className="strong";
        bar.style.width="100%"; bar.style.background="limegreen"; bar.classList.add("glow-strong");
    }

    // Award badge for strong password
    if(score>=4) awardBadge("Strong Password Badge");
});

/* ---------------- SHOW/HIDE PASSWORD ---------------- */
togglePassword.addEventListener("click", function () {
    if(password.type==="password"){password.type="text"; togglePassword.textContent="Hide";}
    else{password.type="password"; togglePassword.textContent="Show";}
});

/* ---------------- THEME SELECTOR ---------------- */
themeSelector.addEventListener("change", function(){
    document.body.classList.remove("dark","cyberpunk","matrix");
    if(this.value==="dark") document.body.classList.add("dark");
    else if(this.value==="cyberpunk") document.body.classList.add("cyberpunk");
    else if(this.value==="matrix") document.body.classList.add("matrix");
});

/* ---------------- PHISHING URL GAME ---------------- */
const urlsGame = [
    { text:"https://paypal.com", phishing:false },
    { text:"https://secure-paypal.com/login", phishing:true },
    { text:"https://github.com", phishing:false },
    { text:"https://github-security-alert.com", phishing:true }
];
let currentUrlIndex = 0;
function showUrl(){ gameUrl.textContent = urlsGame[currentUrlIndex].text; urlGameResult.textContent=""; }
urlSafeBtn.addEventListener("click", ()=>checkUrlAnswer(false));
urlPhishingBtn.addEventListener("click", ()=>checkUrlAnswer(true));
function checkUrlAnswer(answer){
    const urlObj = urlsGame[currentUrlIndex];
    if(answer===urlObj.phishing){ urlGameResult.textContent="✅ Correct!"; urlGameResult.style.color="lime"; awardBadge("Phishing Game Badge"); }
    else{ urlGameResult.textContent="❌ Wrong!"; urlGameResult.style.color="red"; }
    currentUrlIndex = (currentUrlIndex+1)%urlsGame.length;
    setTimeout(showUrl,1000);
}
showUrl();

/* ---------------- GUESS SAFE PASSWORD GAME ---------------- */
const correctPassword = "Safe123!";
checkPasswordGuessBtn.addEventListener("click",()=>{
    if(passwordGuessInput.value===correctPassword){ passwordGameResult.textContent="✅ You guessed it!"; passwordGameResult.style.color="lime"; awardBadge("Password Game Badge"); }
    else{ passwordGameResult.textContent="❌ Try again!"; passwordGameResult.style.color="red"; }
});

/* ---------------- ACHIEVEMENTS / BADGES ---------------- */
let digitalSafetyScore = 0;
function awardBadge(name){
    if([...badgesContainer.childNodes].some(b=>b.textContent===name)) return;
    const badge = document.createElement("div");
    badge.className="badge"; badge.textContent=name;
    badgesContainer.appendChild(badge);
    increaseScore(1);
}
function increaseScore(amount){
    digitalSafetyScore += amount;
    if(digitalSafetyScore>=5 && !document.getElementById("matrixOption")){
        const matrixOption = document.createElement("option");
        matrixOption.id="matrixOption"; matrixOption.value="matrix";
        matrixOption.textContent="💚 Matrix Green (Unlocked!)";
        themeSelector.appendChild(matrixOption);
    }
}
