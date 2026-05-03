// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Modal Functions
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('otpSection').style.display = 'none';
}

function openBookingModal() {
    document.getElementById('bookingModal').style.display = 'block';
    loadServices();
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

function openTechnicianModal() {
    document.getElementById('technicianModal').style.display = 'block';
}

function closeTechnicianModal() {
    document.getElementById('technicianModal').style.display = 'none';
}

function openTrackModal() {
    document.getElementById('trackModal').style.display = 'block';
}

function closeTrackModal() {
    document.getElementById('trackModal').style.display = 'none';
}

function openAdminModal() {
    document.getElementById('adminModal').style.display = 'block';
}

function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
}

// Service Selection
function loadServices() {
    const serviceSelect = document.getElementById('serviceSelect');
    const services = [
        'Petrol Car Rental', 'Diesel Car Rental', 'Car Washing', 'CCTV Service',
        'Geyser Service', 'Electrical Services', 'Plumbing Services',
        'Refrigerator Service', 'RO Services', 'Washing Machine Repair',
        'TV Repair', 'AC Service'
    ];
    
    serviceSelect.innerHTML = '<option value="">Select Service</option>';
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service;
        option.textContent = service;
        serviceSelect.appendChild(option);
    });
}

// Service Card Click
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const service = this.dataset.service;
        document.getElementById('serviceSelect').value = service;
        openBookingModal();
    });
});

// Login with OTP
let currentMobile = '';
function loginWithOTP() {
    const mobile = document.getElementById('mobileNumber').value;
    if (mobile.length === 10 && /^\d+$/.test(mobile)) {
        currentMobile = mobile;
        document.getElementById('otpSection').style.display = 'block';
        alert('OTP sent to ' + mobile);
    } else {
        alert('Please enter valid 10-digit mobile number');
    }
}

function verifyOTP() {
    const otp = document.getElementById('otpInput').value;
    if (otp.length === 4) {
        localStorage.setItem('userMobile', currentMobile);
        alert('Login successful! Welcome back.');
        closeLoginModal();
        openTrackModal();
    } else {
        alert('Please enter valid 4-digit OTP');
    }
}

// Book Service
function bookService() {
    const service = document.getElementById('serviceSelect').value;
    const name = document.getElementById('customerName').value;
    const mobile = document.getElementById('customerMobile').value;
    const address = document.getElementById('address').value;
    const problem = document.getElementById('problemDesc').value;

    if (!service || !name || !mobile || !address) {
        alert('Please fill all required fields');
        return;
    }

    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
        alert('Please enter valid mobile number');
        return;
    }

    // Save booking
    const booking = {
        id: 'REQ' + Date.now(),
        service,
        name,
        mobile,
        address,
        problem,
        status: 'Pending',
        timestamp: new Date().toLocaleString()
    };

    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    alert(`✅ Service booked successfully!\nRequest ID: ${booking.id}\nWe will call you shortly on ${mobile}\nNo payment required!`);
    closeBookingModal();
    document.getElementById('bookingModal').querySelectorAll('input, select, textarea').forEach(el => el.value = '');
}

// Track Service
function trackService() {
    const mobile = document.getElementById('trackMobile').value;
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const userBookings = bookings.filter(b => b.mobile === mobile);

    const resultDiv = document.getElementById('trackResult');
    if (userBookings.length === 0) {
        resultDiv.innerHTML = '<p>No service requests found for this number.</p>';
        return;
    }

    let html = '<div class="track-list">';
    userBookings.forEach(booking => {
        html += `
            <div class="track-item">
                <h4>${booking.service}</h4>
                <p><strong>ID:</strong> ${booking.id}</p>
                <p><strong>Status:</strong> <span class="status ${booking.status.toLowerCase()}">${booking.status}</span></p>
                <p><strong>Date:</strong> ${booking.timestamp}</p>
            </div>
        `;
    });
    html += '</div>';
    resultDiv.innerHTML = html;
}

// Technician Application
function applyTechnician() {
    alert('✅ Technician application submitted!\nWe will contact you within 24 hours on your mobile number.\nNo registration fees required!');
    closeTechnicianModal();
}

// Admin Panel
function loginAdmin() {
    const password = document.getElementById('adminPassword').value;
    if (password === 'admin123') { // Change this password
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadAdminPanel();
    } else {
        alert('Wrong password!');
    }
}

function loadAdminPanel() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const requestsDiv = document.getElementById('serviceRequests');
    
    if (bookings.length === 0) {
        requestsDiv.innerHTML = '<p>No pending requests</p>';
        return;
    }

    let html = '';
    bookings.forEach(booking => {
        html += `
            <div class="admin-request">
                <h4>${booking.service}</h4>
                <p><strong>${booking.name}</strong> - ${booking.mobile}</p>
                <p>${booking.address}</p>
                <p>${booking.problem}</p>
                <p><em>${booking.timestamp}</em></p>
                <select onchange="updateStatus('${booking.id}', this.value)">
                    <option value="Pending" ${booking.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Assigned" ${booking.status === 'Assigned' ? 'selected' : ''}>Assigned</option>
                    <option value="In Progress" ${booking.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Completed" ${booking.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
                <button onclick="callCustomer('${booking.mobile}')">Call Customer</button>
            </div>
        `;
    });
    requestsDiv.innerHTML = html;
}

function updateStatus(bookingId, status) {
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings = bookings.map(b => b.id === bookingId ? {...b, status} : b);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    loadAdminPanel();
}

function callCustomer(mobile) {
    window.location.href = `tel:${mobile}`;
}

function refreshRequests() {
    loadAdminPanel();
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});