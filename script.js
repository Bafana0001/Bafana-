// ===============================
// Room Prices
// ===============================
const roomPrices = {
    "Deluxe Room": 45000,
    "Executive Suite": 85000,
    "Family Suite": 110000
};

let roomCount = 1;

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

// Smooth scrolling
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

// ===============================
// Calculate Booking Total
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
            nights = Math.ceil(
                (outDate - inDate) / (1000 * 60 * 60 * 24)
            );
        }
    }

    const total = price * nights * roomCount;

    const pricePerNight = document.getElementById("pricePerNight");
    const nightCount = document.getElementById("nightCount");
    const roomDisplay = document.getElementById("roomDisplay");
    const totalAmount = document.getElementById("totalAmount");

    if (pricePerNight)
        pricePerNight.textContent = `₦${price.toLocaleString()}`;

    if (nightCount)
        nightCount.textContent = nights;

    if (roomDisplay)
        roomDisplay.textContent = roomCount;

    if (totalAmount)
        totalAmount.textContent = `₦${total.toLocaleString()}`;
}

// ===============================
// Booking Form Handler
// ===============================
function handleBooking(e) {

    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const roomtype = document.getElementById('roomtype').value;
    const requests = document.getElementById('requests').value.trim();

    if (!name || !email || !phone || !checkin || !checkout || !roomtype) {
        alert("Please fill all required fields.");
        return;
    }

    if (new Date(checkout) <= new Date(checkin)) {
        alert("Check-out date must be after check-in date.");
        return;
    }

    const price = roomPrices[roomtype];
    const nights = Math.ceil(
        (new Date(checkout) - new Date(checkin)) /
        (1000 * 60 * 60 * 24)
    );

    const total = price * nights * roomCount;

    alert(
`🎉 Thank you, ${name}!

Your reservation request has been received.

Room Type: ${roomtype}
Rooms: ${roomCount}
Nights: ${nights}

Total Amount:
₦${total.toLocaleString()}

Our team will contact you within 30 minutes to confirm availability and details.`
    );

    e.target.reset();

    roomCount = 1;

    const roomInput = document.getElementById("roomCount");
    if (roomInput)
        roomInput.value = roomCount;

    calculateBooking();
}

// Show/Hide Booking Modal
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
    window.location.href =
        `booking.html?room=${encodeURIComponent(roomType)}`;
}

// Set minimum dates
function setMinDates() {

    const today = new Date().toISOString().split('T')[0];

    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');

    if (checkin) checkin.min = today;

    if (checkout) {

        checkout.min = today;

        checkin.addEventListener('change', () => {

            if (checkin.value)
                checkout.min = checkin.value;

            calculateBooking();

        });

        checkout.addEventListener('change', calculateBooking);
    }
}

// Mobile Menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenu)
        mobileMenu.classList.toggle('hidden');
}

// ===============================
// Initialize
// ===============================
window.onload = function () {

    setMinDates();

    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm)
        bookingForm.addEventListener('submit', handleBooking);

    const urlParams = new URLSearchParams(window.location.search);

    const roomParam = urlParams.get('room');

    if (roomParam) {

        const roomSelect = document.getElementById('roomtype');

        if (roomSelect)
            roomSelect.value = roomParam;
    }

    // Room Type Change
    const roomType = document.getElementById("roomtype");

    if (roomType)
        roomType.addEventListener("change", calculateBooking);

    // Plus Button
    const plus = document.getElementById("plusRoom");

    if (plus) {

        plus.addEventListener("click", function () {

            roomCount++;

            document.getElementById("roomCount").value = roomCount;

            calculateBooking();

        });

    }

    // Minus Button
    const minus = document.getElementById("minusRoom");

    if (minus) {

        minus.addEventListener("click", function () {

            if (roomCount > 1) {

                roomCount--;

                document.getElementById("roomCount").value = roomCount;

                calculateBooking();

            }

        });

    }

    calculateBooking();

    console.log(
        "%cBafana Hotel Kaduna - Website Ready! 🏨",
        "color:#9f1239;font-size:14px;font-weight:bold;"
    );
};

// Global Functions
window.handleBooking = handleBooking;
window.showBookingModal = showBookingModal;
window.hideBookingModal = hideBookingModal;
window.selectRoom = selectRoom;
window.toggleMobileMenu = toggleMobileMenu;