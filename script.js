// Welcome Notification
const welcomeNotification = document.getElementById('welcomeNotification');
const countdownElement = document.getElementById('countdown');

// Show notification when page loads
window.onload = function() {
    setTimeout(() => {
        welcomeNotification.classList.add('show');
        startCountdown();
    }, 1000);
};

// Close notification
function closeNotification() {
    welcomeNotification.classList.remove('show');
}

// Auto close after 60 seconds
function startCountdown() {
    let seconds = 60;
    const countdownInterval = setInterval(() => {
        seconds--;
        countdownElement.textContent = seconds;
        
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            closeNotification();
        }
    }, 1000);
}

// Auth System
const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const registerModal = document.getElementById('registerModal');
const loginModal = document.getElementById('loginModal');
const authButtons = document.getElementById('authButtons');
const userInfo = document.getElementById('userInfo');
const usernameDisplay = document.getElementById('usernameDisplay');
const balanceDisplay = document.getElementById('balance');

// Open Register Modal
registerBtn.addEventListener('click', () => {
    registerModal.style.display = 'block';
});

// Open Login Modal
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

// Close Modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Switch between Login and Register
function showLogin() {
    registerModal.style.display = 'none';
    loginModal.style.display = 'block';
}

function showRegister() {
    loginModal.style.display = 'none';
    registerModal.style.display = 'block';
}

// Register Form
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Mật khẩu không khớp!');
        return;
    }
    
    // Save user to localStorage
    localStorage.setItem('currentUser', JSON.stringify({
        username: username,
        password: password,
        balance: 0
    }));
    
    // Update UI
    updateUserInfo(username, 0);
    closeModal('registerModal');
    alert('Đăng ký thành công!');
});

// Login Form
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    
    if (userData && username === userData.username && password === userData.password) {
        updateUserInfo(userData.username, userData.balance);
        closeModal('loginModal');
        alert('Đăng nhập thành công!');
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
});

// Update User Info
function updateUserInfo(username, balance) {
    usernameDisplay.textContent = username;
    balanceDisplay.textContent = balance;
    userInfo.style.display = 'block';
    authButtons.style.display = 'none';
}

// Check if user is logged in
function checkLoggedIn() {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData) {
        updateUserInfo(userData.username, userData.balance);
    }
}

// Product System
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to buy buttons
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            
            // Check if user is logged in
            const isLoggedIn = localStorage.getItem('currentUser');
            if (!isLoggedIn) {
                alert('Vui lòng đăng nhập để mua hàng!');
                loginModal.style.display = 'block';
                return;
            }
            
            alert(`Bạn đã mua thành công sản phẩm: ${productName}`);
        });
    });
});

// Snow Effect
function createSnow() {
    const canvas = document.getElementById('snowCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const snowflakes = [];
    const snowflakeCount = 100;
    
    for (let i = 0; i < snowflakeCount; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speed: Math.random() * 2 + 1,
            opacity: Math.random()
        });
    }
    
    function drawSnowflakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        snowflakes.forEach(flake => {
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            ctx.fill();
            
            flake.y += flake.speed;
            
            if (flake.y > canvas.height) {
                flake.y = 0;
                flake.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(drawSnowflakes);
    }
    
    drawSnowflakes();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    checkLoggedIn();
    createSnow();
});
