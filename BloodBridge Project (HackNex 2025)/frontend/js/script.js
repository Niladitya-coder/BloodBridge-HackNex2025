// Mobile menu functionality
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
let isMenuOpen = false;

mobileMenuBtn.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    mobileMenu.style.left = isMenuOpen ? "0" : "-100%";
    mobileMenuBtn.textContent = isMenuOpen ? "✕" : "☰";
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
    if (isMenuOpen && !e.target.closest(".mobile-menu") && !e.target.closest(".mobile-menu-btn")) {
        isMenuOpen = false;
        mobileMenu.style.left = "-100%";
        mobileMenuBtn.textContent = "☰";
    }
});

// Tab switching functionality
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab");

        // Toggle active classes
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));

        button.classList.add("active");
        document.getElementById(tabId).classList.add("active");
    });
});

// Carousel functionality 
const sections = document.querySelectorAll(".carousel-section");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let currentIndex = 0;

function showSection(index) {
    sections.forEach(section => section.classList.remove("active"));

    // Handle circular rotation
    if (index >= sections.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = sections.length - 1;
    } else {
        currentIndex = index;
    }

    sections[currentIndex].classList.add("active");
}

if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
        showSection(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        showSection(currentIndex + 1);
    });
}

// Mock data for demonstration
const mockDonors = [
    { name: "John Doe", blood_group: "A+", location: "Garia", city: "Kolkata", phone: "1234567890" },
    { name: "Jane Smith", blood_group: "O-", location: "Tollygunge", city: "Kolkata", phone: "9876543210" }
];

const mockBloodBanks = [
    { name: "City Blood Bank", address: "123 Main St", city: "Kolkata", location: "Garia", phone: "1234567890" },
    { name: "Life Saver Bank", address: "456 Park Ave", city: "Howrah", location: "Central", phone: "9876543210" }
];

// Search functionality
function searchDonors(event) {
    event.preventDefault();
    const bloodGroup = document.getElementById("bloodGroup").value;
    const city = document.getElementById("city").value;
    const location = document.getElementById("location").value;

    const filteredDonors = mockDonors.filter(donor => 
        (!bloodGroup || donor.blood_group === bloodGroup) &&
        (!city || donor.city.toLowerCase() === city.toLowerCase()) &&
        (!location || donor.location.toLowerCase() === location.toLowerCase())
    );

    displayDonorResults(filteredDonors);
}

function searchBloodBanks(event) {
    event.preventDefault();
    const city = document.getElementById("bankCity").value;
    const location = document.getElementById("bankLocation").value;

    const filteredBanks = mockBloodBanks.filter(bank =>
        (!city || bank.city.toLowerCase() === city.toLowerCase()) &&
        (!location || bank.location.toLowerCase() === location.toLowerCase())
    );

    displayBloodBankResults(filteredBanks);
}

function displayDonorResults(donors) {
    const resultsDiv = document.getElementById("searchResults");
    if (donors.length === 0) {
        resultsDiv.innerHTML = "<p>No donors found matching your criteria.</p>";
        return;
    }

    resultsDiv.innerHTML = `
        <h3>Available Donors</h3>
        <div class="donors-list">
            ${donors.map(donor => `
                <div class="donor-card">
                    <h4>${donor.name}</h4>
                    <p>Blood Group: ${donor.blood_group}</p>
                    <p>Location: ${donor.location}, ${donor.city}</p>
                    <button class="contact-btn" onclick="contactDonor('${donor.phone}')">
                        Contact Donor
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

function displayBloodBankResults(banks) {
    const tbody = document.getElementById("bloodBanksTableBody");
    tbody.innerHTML = banks.map(bank => `
        <tr>
            <td>${bank.name}</td>
            <td>${bank.address}</td>
            <td>${bank.city}</td>
            <td>${bank.location}</td>
            <td>${bank.phone}</td>
        </tr>
    `).join('');
}

function contactDonor(phone) {
    alert(`Contact the donor at: ${phone}`);
}
