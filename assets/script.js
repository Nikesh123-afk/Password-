
// Password input, toggle, and strength logic
const passwordInput = document.getElementById('password');
const strengthDiv = document.getElementById('strength');
const suggestionsDiv = document.getElementById('suggestions');
const monster = document.getElementById('monster');
const togglePasswordBtn = document.getElementById('togglePassword');

// Accessibility: focus password input on page load
window.addEventListener('DOMContentLoaded', () => {
    passwordInput.focus();
});

// Toggle password visibility
togglePasswordBtn.addEventListener('click', function() {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    this.textContent = isPassword ? '🙈' : '👁️';
    this.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    passwordInput.focus();
});

// Update strength and monster on input
passwordInput.addEventListener('input', function() {
    const pwd = this.value;
    const result = analyzePassword(pwd);

    // Update strength text
    strengthDiv.textContent = pwd ? `Strength: ${result.strength}` : '';

    // Update monster state
    monster.className = 'monster ' + result.strength.toLowerCase().replace(' ', '');

    // Suggestions
    let suggestionHtml = result.suggestions.length ?
        'Tips:<ul>' + result.suggestions.map(s => `<li>${s}</li>`).join('') + '</ul>' : '';
    if (pwd && result.strength !== 'Excellent') {
        const strongPwd = suggestStrongPassword(pwd);
        suggestionHtml += `<div style="margin-top:10px;color:#44ff44;">Try this stronger password:<br><b>${strongPwd}</b></div>`;
    }
    suggestionsDiv.innerHTML = suggestionHtml;
});

// Analyze the password and return its strength and suggestions for improvement
function analyzePassword(password) {
    let score = 0; // Used to calculate the strength
    let suggestions = []; // Array to store suggestions for improvement

    // Check password length
    if (password.length >= 12) score += 2;
    else if (password.length >= 8) score += 1;
    else suggestions.push('Use at least 8 characters.');

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) score += 1;
    else suggestions.push('Add uppercase letters.');

    // Check for lowercase letters
    if (/[a-z]/.test(password)) score += 1;
    else suggestions.push('Add lowercase letters.');

    // Check for numbers
    if (/\d/.test(password)) score += 1;
    else suggestions.push('Add numbers.');

    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else suggestions.push('Add special characters.');

    // Penalize common patterns
    if (/password|1234|qwerty|letmein|admin/i.test(password)) {
        score = Math.max(score - 2, 0);
        suggestions.push('Avoid common words or patterns.');
    }

    // Determine strength label
    let strength = 'Weak';
    if (score >= 6) strength = 'Excellent';
    else if (score >= 5) strength = 'Strong';
    else if (score >= 4) strength = 'Good';
    else if (score >= 2) strength = 'Fair';

    // Return an object with strength and suggestions
    return { strength, suggestions };
}

// Suggest a stronger password based on user input
// This function adds missing character types and shuffles the result for randomness.
function suggestStrongPassword(password) {
    // Remove all non-alphanumeric characters for the base using .replace() and regex
    let base = password.replace(/[^A-Za-z0-9]/g, '');

    // Ensure the password is at least 12 characters long
    // Use a while loop to add random uppercase letters if needed
    while (base.length < 12) {
        // String.fromCharCode(65 + Math.floor(Math.random() * 26)) generates a random uppercase letter
        base += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }

    // Add an uppercase letter if missing (/[A-Z]/ regex)
    if (!/[A-Z]/.test(base)) {
        base += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }

    // Add a lowercase letter if missing (/[a-z]/ regex)
    if (!/[a-z]/.test(base)) {
        base += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }

    // Add a number if missing (/\d/ regex)
    if (!/\d/.test(base)) {
        base += Math.floor(Math.random() * 10);
    }

    // Add a special character if missing (/[^A-Za-z0-9]/ regex)
    // Picks a random character from the string '!@#$%^&*'
    if (!/[^A-Za-z0-9]/.test(password)) {
        base += '!@#$%^&*'[Math.floor(Math.random() * 8)];
    }

    // Shuffle the password to make it less predictable
    // .split('') turns the string into an array, .sort() shuffles, .join('') makes it a string again
    return base.split('').sort(() => Math.random() - 0.5).join('');
}
