// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 80) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});

// Smooth scrolling for nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

function showBookingModal() {
    document.getElementById('bookingModal').classList.remove('hidden');
}

function hideBookingModal() {
    document.getElementById('bookingModal').classList.add('hidden');
}

function selectRoom(el) {
    showBookingModal();
}

function handleBooking(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    
    alert(`Thank you, ${name}!\n\nYour reservation request has been received.\n\nOur team will contact you shortly to confirm availability and details.`);
    
    e.target.reset();
}

function setMinDates() {
    const today = new Date().toISOString().split('T')[0];
    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');
    
    if (checkin) checkin.min = today;
    if (checkout) checkout.min = today;
}

window.onload = function() {
    setMinDates();
    console.log('%cBafana Hotel website ready! 🎉', 'color: #9f1239; font-size: 14px;');
};