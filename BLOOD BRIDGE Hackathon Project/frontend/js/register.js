const modal = document.getElementById('warningModal');
const donorOption = document.getElementById('donor-option');

donorOption.addEventListener('click', function(e) {
    e.preventDefault();
    modal.style.display = 'block';
});

function closeModal() {
    modal.style.display = 'none';
}

function proceedToDonorRegistration() {
    window.location.href = 'register_donor.html';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}