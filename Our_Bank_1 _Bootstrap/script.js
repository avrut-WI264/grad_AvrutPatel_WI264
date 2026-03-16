// script.js
const contentData = {
    home: `
        <div class="inner-content">
            <h2 class="mb-4 fw-bold">Welcome to OUR BANK</h2>
            <p class="fs-5 text-secondary">Experience seamless and secure financial services. Banking at your doorstep.</p>
        </div>
    `,
    about: `
        <div class="inner-content">
            <h2 class="mb-4 fw-bold">About Us</h2>
            <p class="fs-5 text-secondary">OUR BANK has been a trusted financial partner since 1995. We are committed to providing innovative banking solutions and securing your financial future.</p>
        </div>
    `,
    services: `
        <div class="inner-content">
            <h2 class="mb-4 fw-bold">Our Services</h2>
            <div class="d-flex justify-content-center flex-wrap gap-3 mt-4">
                <button onclick="loadContent('loan')" class="btn custom-btn">LOAN</button>
                <button onclick="loadContent('deposit')" class="btn custom-btn">DEPOSIT</button>
                <button onclick="loadContent('account')" class="btn custom-btn">AC OPENING</button>
            </div>
        </div>
    `,
    netbanking: `
        <div class="inner-content">
            <h2 class="mb-4 fw-bold">Net Banking</h2>
            <div class="d-flex justify-content-center align-items-center flex-wrap gap-3 mt-4">
                <button onclick="loadContent('login')" class="btn custom-btn">LOGIN</button>
                <button onclick="loadContent('signup')" class="btn custom-btn">SIGN UP</button>
            </div>
        </div>
    `,
    contact: `
        <div class="inner-content">
            <h2 class="mb-4 fw-bold">Contact Us</h2>
            <p class="fs-5 text-secondary"><strong>Address:</strong> 456 Financial Hub, Sector 4, New City</p>
            <p class="fs-5 text-secondary"><strong>Phone:</strong> 1800-123-4567</p>
            <p class="fs-5 text-secondary"><strong>Email:</strong> support@ourbank.com</p>
        </div>
    `,
    loan: `
        <div class="inner-content">
            <h2 class="mb-4 fw-bold">Loan Services</h2>
            <p class="fs-5 text-secondary">We offer Home, Auto, and Education loans at attractive interest rates.</p>
            <button onclick="loadContent('services')" class="btn custom-btn mt-4">Back to Services</button>
        </div>
    `,
    deposit: `
        <div class="inner-content">
            <h2 class="mb-4 fw-bold">Deposit Services</h2>
            <p class="fs-5 text-secondary">Secure your future with our Fixed and Recurring Deposit schemes.</p>
            <button onclick="loadContent('services')" class="btn custom-btn mt-4">Back to Services</button>
        </div>
    `,
    account: `
        <div class="inner-content">
            <h2 class="mb-4 fw-bold">Account Opening</h2>
            <p class="fs-5 text-secondary">Open a Savings or Current account instantly with zero balance options.</p>
            <button onclick="loadContent('services')" class="btn custom-btn mt-4">Back to Services</button>
        </div>
    `,
    login: `
        <div class="inner-content">
            <h2 class="mb-4 fw-bold">Net Banking Login</h2>
            <form onsubmit="event.preventDefault();">
                <div class="mb-3">
                    <label class="form-label fw-bold">User ID:</label>
                    <input type="text" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Password:</label>
                    <input type="password" class="form-control" required>
                </div>
                <button type="submit" class="btn custom-btn w-100">Login</button>
            </form>
            <button onclick="loadContent('netbanking')" class="btn custom-btn mt-4">Back to Net Banking</button>
        </div>
    `,
    signup: `
        <div class="inner-content">
            <h2 class="mb-4 fw-bold">Register for Net Banking</h2>
            <form onsubmit="event.preventDefault();">
                <div class="mb-3">
                    <label class="form-label fw-bold">Full Name:</label>
                    <input type="text" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Account No:</label>
                    <input type="text" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold">Email ID:</label>
                    <input type="email" class="form-control" required>
                </div>
                <button type="submit" class="btn custom-btn w-100">Sign Up</button>
            </form>
            <button onclick="loadContent('netbanking')" class="btn custom-btn mt-4">Back to Net Banking</button>
        </div>
    `
};

function loadContent(section, element = null) {
    document.getElementById('content-area').innerHTML = contentData[section];

    if (element) {
        let menuItems = document.querySelectorAll('#menu li');
        menuItems.forEach(item => item.classList.remove('active'));
        element.classList.add('active');
        
        let sidebar = document.getElementById('sidebarMenu');
        if (window.innerWidth < 768 && sidebar.classList.contains('show')) {
            let bsCollapse = new bootstrap.Collapse(sidebar, { toggle: false });
            bsCollapse.hide();
        }
    }
}

window.onload = function() {
    document.getElementById('content-area').innerHTML = contentData.home;
};