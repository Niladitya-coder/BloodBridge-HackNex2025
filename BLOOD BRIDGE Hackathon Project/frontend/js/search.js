function showSearchForm(type) {
    // Hide all forms and tables
    document.querySelectorAll('.search-form, .results-table').forEach(el => el.style.display = 'none');
    
    // Remove active class from all options
    document.querySelectorAll('.search-option').forEach(el => el.classList.remove('active'));
    
    // Show selected form and add active class
    if (type === 'donor') {
        document.getElementById('donor-search').style.display = 'block';
        event.currentTarget.classList.add('active');
    } else {
        document.getElementById('bank-search').style.display = 'block';
        event.currentTarget.classList.add('active');
    }
}

function handleDonorSearch(event) {
    event.preventDefault();
    
    // Sample donor data - replace with actual API call
    const sampleDonors = [
        { name: "John Doe", age: 28, gender: "Male", bloodGroup: "O+", location: "Downtown", lastDonation: "2024-01-15" },
        { name: "Jane Smith", age: 35, gender: "Female", bloodGroup: "A+", location: "Uptown", lastDonation: "2024-02-01" }
    ];

    const tbody = document.querySelector('#donor-results tbody');
    tbody.innerHTML = '';

    sampleDonors.forEach(donor => {
        tbody.innerHTML += `
            <tr>
                <td>${donor.name}</td>
                <td>${donor.age}</td>
                <td>${donor.gender}</td>
                <td>${donor.bloodGroup}</td>
                <td>${donor.location}</td>
                <td>${donor.lastDonation}</td>
                <td><button class="contact-button">Contact</button></td>
            </tr>
        `;
    });

    document.getElementById('donor-results').style.display = 'table';
}

function handleBankSearch(event) {
    event.preventDefault();
    
    // Sample blood bank data - replace with actual API call
    const sampleBanks = [
        { name: "City Blood Bank", location: "Main Street", units: 50, contact: "123-456-7890" },
        { name: "Central Blood Center", location: "Park Road", units: 35, contact: "098-765-4321" }
    ];

    const tbody = document.querySelector('#bank-results tbody');
    tbody.innerHTML = '';

    sampleBanks.forEach(bank => {
        tbody.innerHTML += `
            <tr>
                <td>${bank.name}</td>
                <td>${bank.location}</td>
                <td>${bank.units}</td>
                <td>${bank.contact}</td>
                <td><button class="contact-button">Contact</button></td>
            </tr>
        `;
    });

    document.getElementById('bank-results').style.display = 'table';
}