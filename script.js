const password = document.getElementById("password");
const strength = document.getElementById("strength");

password.addEventListener("input", function () {
    const value = password.value;
    let score = 0;

    if (value.length > 6) score++;
    if (value.match(/[0-9]/)) score++;
    if (value.match(/[A-Z]/)) score++;
    if (value.match(/[^A-Za-z0-9]/)) score++;

    if (value.length === 0) {
        strength.textContent = "Strength: ";
        strength.className = "";
    } 
    else if (score <= 1) {
        strength.textContent = "Strength: WEAK";
        strength.className = "weak";
    } 
    else if (score === 2 || score === 3) {
        strength.textContent = "Strength: MEDIUM";
        strength.className = "medium";
    } 
    else {
        strength.textContent = "Strength: STRONG";
        strength.className = "strong";
    }
});
