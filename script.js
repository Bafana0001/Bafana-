// ===============================
// Room Prices
// ===============================
const roomPrices = {
    "Deluxe Room": 45000,
    "Executive Suite": 85000,
    "Family Suite": 110000
};

let roomCount = 1;

// ===============================
// UI Interaction Logic
// ===============================
// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 80) {
            navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-md');
        } else {
            navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-md');
        }
    }
});

// Mobile Menu Toggle Logic
const openMenuBtn = document.getElementById('openMenu');
const closeMenuBtn = document.getElementById('closeMenu');
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');

function openMenu() {
    if (sideMenu) sideMenu.classList.remove('translate-x-full');
    if (menuOverlay) menuOverlay.classList.remove('hidden');
}

function closeMenu() {
    if (sideMenu) sideMenu.classList.add('translate-x-full');
    if (menuOverlay) menuOverlay.classList.add('hidden');
}

// ===============================
// Booking System Logic
// ===============================
function calculateBooking() {
    const roomType = document.getElementById("roomtype");
    const checkin = document.getElementById("checkin");
    const checkout = document.getElementById("checkout");

    if (!roomType || !checkin || !checkout) return;

    const price = roomPrices[roomType.value] || 0;
    let nights = 0;

    if (checkin.value && checkout.value) {
        const inDate = new Date(checkin.value);
        const outDate = new Date(checkout.value);
        if (outDate > inDate) {
            nights = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
        }
    }

    const total = price * nights * roomCount;
    const pricePerNight = document.getElementById("pricePerNight");
    const nightCount = document.getElementById("nightCount");
    const roomDisplay = document.getElementById("roomDisplay");
    const totalAmount = document.getElementById("totalAmount");

    if (pricePerNight) pricePerNight.textContent = `₦${price.toLocaleString()}`;
    if (nightCount) nightCount.textContent = nights;
    if (roomDisplay) roomDisplay.textContent = roomCount;
    if (totalAmount) totalAmount.textContent = `₦${total.toLocaleString()}`;
}

function handleBooking(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const roomtype = document.getElementById('roomtype').value;

    if (!name || !checkin || !checkout || !roomtype) {
        alert("Please fill all required fields.");
        return;
    }

    if (new Date(checkout) <= new Date(checkin)) {
        alert("Check-out date must be after check-in date.");
        return;
    }

    alert(`🎉 Thank you, ${name}! Your reservation request for a ${roomtype} has been received. Our team will contact you shortly.`);
    e.target.reset();
    roomCount = 1;
    calculateBooking();
}

// ===============================
// Initialization
// ===============================
window.onload = function () {
    // 1. Event Listeners for Mobile Menu
    if (openMenuBtn) openMenuBtn.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

    // Auto-close menu when a link is clicked
    const sideMenuLinks = document.querySelectorAll('#sideMenu a');
    sideMenuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // 2. Booking Form Setup
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) bookingForm.addEventListener('submit', handleBooking);

    // 3. Date and Room Logic
    const today = new Date().toISOString().split('T')[0];
    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');
    
    if (checkin) checkin.min = today;
    if (checkout) checkout.min = today;

    // Room quantity buttons
    const plus = document.getElementById("plusRoom");
    const minus = document.getElementById("minusRoom");
    
    if (plus) plus.addEventListener("click", () => { roomCount++; document.getElementById("roomCount").value = roomCount; calculateBooking(); });
    if (minus) minus.addEventListener("click", () => { if (roomCount > 1) roomCount--; document.getElementById("roomCount").value = roomCount; calculateBooking(); });

    console.log("%cBafana Hotel Kaduna - Website Ready! 🏨", "color:#9f1239;font-size:14px;font-weight:bold;");
};

// Expose functions globally
window.openMenu = openMenu;
window.closeMenu = closeMenu;