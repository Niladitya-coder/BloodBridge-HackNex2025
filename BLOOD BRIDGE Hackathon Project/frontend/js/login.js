function showLoginForm(type) {
    document.getElementById('option-selection').style.display = 'none';
    document.getElementById(`${type}-login`).style.display = 'block';
}

function showOptions() {
    document.getElementById('option-selection').style.display = 'flex';
    document.getElementById('donor-login').style.display = 'none';
    document.getElementById('hospital-login').style.display = 'none';
}

function handleDonorLogin(event) {
    event.preventDefault();
    const email = document.getElementById('donor-email').value;
    const password = document.getElementById('donor-password').value;
    
    // Add your donor login logic here
    console.log('Donor login attempt:', { email, password });
    // Redirect to donor dashboard after successful login
    // window.location.href = 'donor_dashboard.html';
}

function handleHospitalLogin(event) {
    event.preventDefault();
    const email = document.getElementById('hospital-email').value;
    const password = document.getElementById('hospital-password').value;
    
    // Add your hospital login logic here
    console.log('Hospital login attempt:', { email, password });
    // Redirect to hospital dashboard after successful login
    // window.location.href = 'hospital_dashboard.html';
}