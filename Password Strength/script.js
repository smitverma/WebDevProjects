// script.js
const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const strength = getPasswordStrength(password);
    updateStrengthMeter(strength);
});

function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;
    return strength;
}

function updateStrengthMeter(strength) {
    switch (strength) {
        case 1:
            strengthBar.style.width = '20%';
            strengthBar.style.backgroundColor = 'red';
            strengthText.textContent = 'Very Weak';
            break;
        case 2:
            strengthBar.style.width = '40%';
            strengthBar.style.backgroundColor = 'orange';
            strengthText.textContent = 'Weak';
            break;
        case 3:
            strengthBar.style.width = '60%';
            strengthBar.style.backgroundColor = 'yellow';
            strengthText.textContent = 'Moderate';
            break;
        case 4:
            strengthBar.style.width = '80%';
            strengthBar.style.backgroundColor = 'blue';
            strengthText.textContent = 'Strong';
            break;
        case 5:
            strengthBar.style.width = '100%';
            strengthBar.style.backgroundColor = 'green';
            strengthText.textContent = 'Very Strong';
            break;
        default:
            strengthBar.style.width = '0';
            strengthText.textContent = '';
            break;
    }
}
