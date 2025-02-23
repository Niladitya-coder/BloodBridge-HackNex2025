// Show consent modal on page load
window.addEventListener('DOMContentLoaded', () => {
    const consentModal = document.getElementById('consentModal');
    const donorForm = document.getElementById('donorForm');
    const agreeButton = document.getElementById('agreeButton');
    const disagreeButton = document.getElementById('disagreeButton');

    consentModal.style.display = 'block';

    agreeButton.addEventListener('click', () => {
        consentModal.style.display = 'none';
        donorForm.style.display = 'block';
    });

    disagreeButton.addEventListener('click', () => {
        window.location.href = 'register.html';
    });
});

// Form validation
function validateForm(form) {
    const errors = {};
    const formData = new FormData(form);

    for (const [name, value] of formData.entries()) {
        const element = form.elements[name];
        const errorElement = document.getElementById(`${name}Error`);

        if (element.hasAttribute("required") && !value) {
            errors[name] = "This field is required";
        } else {
            switch (name) {
                case "phone":
                    if (!/^\d{10}$/.test(value)) {
                        errors[name] = "Please enter a valid 10-digit phone number";
                    }
                    break;
                case "age":
                    const age = parseInt(value);
                    if (age < 18 || age > 65) {
                        errors[name] = "Age must be between 18 and 65";
                    }
                    break;
                case "weight":
                    const weight = parseFloat(value);
                    if (weight < 45) {
                        errors[name] = "Weight must be at least 45 kg";
                    }
                    break;
                case "hemoglobinLevel":
                    const hb = parseFloat(value);
                    if (hb < 12) {
                        errors[name] = "Hemoglobin level must be at least 12 g/dL";
                    }
                    break;
            }
        }

        if (errorElement) {
            errorElement.textContent = errors[name] || "";
            errorElement.style.display = errors[name] ? "block" : "none";
        }
    }

    return Object.keys(errors).length === 0;
}

// Handle form submission
function registerDonor(event) {
    event.preventDefault();
    const form = event.target;

    if (!validateForm(form)) {
        return;
    }

    // In a real application, this would send data to a server
    // For now, we'll just show a success message
    alert('Registration successful! Thank you for registering as a donor.');
    window.location.href = '../index.html';
}
