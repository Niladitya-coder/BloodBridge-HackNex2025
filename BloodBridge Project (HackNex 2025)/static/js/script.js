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
  if (
    isMenuOpen &&
    !e.target.closest(".mobile-menu") &&
    !e.target.closest(".mobile-menu-btn")
  ) {
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

// Consent modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const consentModal = document.getElementById('consentModal');
    const agreeButton = document.getElementById('agreeButton');
    const disagreeButton = document.getElementById('disagreeButton');
    const donorForm = document.getElementById('donorForm');


    // Show consent modal when switching to donor registration tab
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.getAttribute('data-tab') === 'become-donor') {
                consentModal.style.display = 'block';
                donorForm.style.display = 'none'; //hide form initially
            }
        });
    });

    // Handle consent modal buttons
    agreeButton.addEventListener('click', () => {
        consentModal.style.display = 'none';
        donorForm.style.display = 'block';
    });

    disagreeButton.addEventListener('click', () => {
        consentModal.style.display = 'none';
        // Switch back to the previous tab
        document.querySelector('.tab-button[data-tab="find-blood"]').click();
    });
});


// Form validation function (improved)
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

// Search donors functionality
const searchForm = document.getElementById("searchForm");
if (searchForm) {
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = new FormData(searchForm);
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = '<div class="loading">Searching for donors...</div>';
    
    try {
      const response = await fetch("/api/search_donors", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.donors.length > 0) {
        searchResults.innerHTML = `
          <h3>Available Donors</h3>
          <div class="donors-list">
            ${data.donors.map(donor => `
              <div class="donor-card">
                <h4>${donor.name}</h4>
                <p>Blood Group: ${donor.blood_group}</p>
                <p>Location: ${donor.location}, ${donor.city}</p>
                <button class="contact-btn" onclick="contactDonor('${donor.email}')">
                  Contact Donor
                </button>
              </div>
            `).join('')}
          </div>
        `;
      } else {
        searchResults.innerHTML = '<p>No donors found matching your criteria.</p>';
      }
    } catch (error) {
      searchResults.innerHTML = '<p class="error">An error occurred while searching. Please try again.</p>';
    }
  });
}

// Donor registration
const donorForm2 = document.getElementById("donorForm");
if (donorForm2) {
  donorForm2.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if (!validateForm(donorForm2)) {
      return;
    }
    
    const submitButton = donorForm2.querySelector("button[type=submit]");
    submitButton.disabled = true;
    submitButton.textContent = "Registering...";
    
    try {
      const response = await fetch("/api/register_donor", {
        method: "POST",
        body: new FormData(donorForm2)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert("Successfully registered as a donor!");
        donorForm2.reset();
      } else {
        alert(data.error || "Failed to register. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Register as Donor";
    }
  });
}

// Contact donor functionality
function contactDonor(email) {
  // Check if user is logged in
  const isLoggedIn = document.querySelector(".auth-buttons .sign-in").textContent === "Logout";
  
  if (!isLoggedIn) {
    alert("Please login to contact donors");
    window.location.href = "/login";
    return;
  }
  
  alert(`You can contact this donor at: ${email}`);
}

// Initialize tooltips and popovers if using Bootstrap
if (typeof bootstrap !== 'undefined') {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

// Blood bank search functionality
const bloodBankSearchForm = document.getElementById("bloodBankSearchForm");
if (bloodBankSearchForm) {
    bloodBankSearchForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const city = document.getElementById("bankCity").value;
        const location = document.getElementById("bankLocation").value;
        const tableBody = document.getElementById("bloodBanksTableBody");

        try {
            const response = await fetch(`/api/blood_banks?city=${city}&location=${location}`);
            const data = await response.json();

            if (data.blood_banks.length > 0) {
                tableBody.innerHTML = data.blood_banks.map(bank => `
                    <tr>
                        <td>${bank.name}</td>
                        <td>${bank.address}</td>
                        <td>${bank.city}</td>
                        <td>${bank.location}</td>
                        <td>${bank.phone}</td>
                    </tr>
                `).join('');
            } else {
                tableBody.innerHTML = '<tr><td colspan="5">No blood banks found in this area.</td></tr>';
            }
        } catch (error) {
            console.error('Error:', error);
            tableBody.innerHTML = '<tr><td colspan="5">Error loading blood banks. Please try again.</td></tr>';
        }
    });
}

// Blood inventory management
const bloodInventoryForm = document.getElementById("bloodInventoryForm");
if (bloodInventoryForm) {
    // Load current inventory
    async function loadInventory() {
        try {
            const response = await fetch(`/api/get_blood_inventory/${hospitalId}`);
            const data = await response.json();

            if (data.inventory) {
                Object.entries(data.inventory).forEach(([bloodGroup, units]) => {
                    const input = document.querySelector(`input[name="${bloodGroup}"]`);
                    if (input) input.value = units;
                });
            }
        } catch (error) {
            console.error('Error loading inventory:', error);
        }
    }

    // Handle inventory updates
    bloodInventoryForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(bloodInventoryForm);
        const inventory = {};
        for (const [name, value] of formData.entries()) {
            inventory[name] = parseInt(value) || 0;
        }

        try {
            const response = await fetch('/api/update_blood_inventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inventory)
            });

            const data = await response.json();
            const messageDiv = document.getElementById('updateMessage');

            if (response.ok) {
                messageDiv.textContent = 'Inventory updated successfully';
                messageDiv.className = 'alert alert-success';
            } else {
                messageDiv.textContent = data.error || 'Failed to update inventory';
                messageDiv.className = 'alert alert-error';
            }

            messageDiv.style.display = 'block';
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 3000);
        } catch (error) {
            console.error('Error updating inventory:', error);
        }
    });

    // Load initial inventory if we're on the inventory tab
    if (document.getElementById('blood-inventory')) {
        loadInventory();
    }
}