// script.js - Bafana Hotel Kaduna

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
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const roomtype = document.getElementById('roomtype').value;
    const requests = document.getElementById('requests').value.trim();

    // Validation
    if (!name || !email || !phone || !checkin || !checkout || !roomtype) {
        alert("Please fill all required fields.");
        return;
    }

    if (new Date(checkout) <= new Date(checkin)) {
        alert("Check-out date must be after check-in date.");
        return;
    }

    // Success message
    alert(`🎉 Thank you, ${name}!\n\nYour reservation request has been received.\n\nOur team will contact you within 30 minutes to confirm availability and details.`);

    // Reset form after submission
    e.target.reset();
}

// Show/Hide Booking Modal (for other pages if needed)
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
    window.location.href = `booking.html?room=${encodeURIComponent(roomType)}`;
}

// Set minimum dates for booking forms
function setMinDates() {
    const today = new Date().toISOString().split('T')[0];
    
    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');
    
    if (checkin) checkin.min = today;
    if (checkout) {
        checkout.min = today;
        // Also set checkout min to checkin date dynamically (optional enhancement)
        checkin.addEventListener('change', () => {
            if (checkin.value) checkout.min = checkin.value;
        });
    }
}

// Mobile menu toggle (ready for future use)
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Initialize everything when page loads
window.onload = function() {
    setMinDates();
    
    // Attach form handler
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBooking);
    }

    // Auto-fill room type from URL parameter
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