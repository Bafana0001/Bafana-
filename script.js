// script.js

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 80) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Booking Form Handler
function handleBooking(e) {
    if (e) e.preventDefault();
    
    const name = document.getElementById('name');
    if (!name) return;
    
    const nameValue = name.value.trim() || "Guest";

    alert(`🎉 Thank you, ${nameValue}!\n\nYour reservation request has been received.\n\nOur team will contact you within 30 minutes to confirm availability and details.`);

    // Reset form if it exists
    if (e && e.target) {
        e.target.reset();
    }
}

// Show/Hide Booking Modal (for pages that use modal)
function showBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.classList.remove('hidden');
}

function hideBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.classList.add('hidden');
}

// Room selection helper
function selectRoom(roomType) {
    // Redirect to booking page with room pre-selected (optional)
    window.location.href = `booking.html?room=${encodeURIComponent(roomType)}`;
}

// Set minimum dates for booking forms
function setMinDates() {
    const today = new Date().toISOString().split('T')[0];
    
    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');
    
    if (checkin) checkin.min = today;
    if (checkout) checkout.min = today;
}

// Mobile menu toggle (if you add a hamburger menu later)
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Initialize everything when page loads
window.onload = function() {
    setMinDates();
    
    // Auto-fill room type from URL parameter (e.g., booking.html?room=Deluxe%20Room)
    const urlParams = new URLSearchParams(window.location.search);
    const roomParam = urlParams.get('room');
    if (roomParam) {
        const roomSelect = document.getElementById('roomtype');
        if (roomSelect) {
            roomSelect.value = roomParam;
        }
    }

    console.log('%cBafana Hotel Kaduna - Website Ready! 🏨', 
        'color: #9f1239; font-size: 14px; font-weight: bold;');
};

// Make functions globally available
window.handleBooking = handleBooking;
window.showBookingModal = showBookingModal;
window.hideBookingModal = hideBookingModal;
window.selectRoom = selectRoom;
window.toggleMobileMenu = toggleMobileMenu;