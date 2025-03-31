// Welcome Modal
const welcomeModal = document.getElementById('welcomeModal');
const countdownElement = document.getElementById('countdown');

// Show modal when page loads
window.onload = function() {
    welcomeModal.style.display = 'block';
    startCountdown();
};

// Close modal
function closeModal() {
    welcomeModal.style.display = 'none';
}

// Auto close after 60 seconds
function startCountdown() {
    let seconds = 60;
    const countdownInterval = setInterval(() => {
        seconds--;
        countdownElement.textContent = seconds;
        
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            closeModal();
        }
    }, 1000);
}

// Auth Modals
const registerModal = document.getElementById('registerModal');
const loginModal = document.getElementById('loginModal');
const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
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

// Close Register Modal
function closeRegisterModal() {
    registerModal.style.display = 'none';
}

// Close Login Modal
function closeLoginModal() {
    loginModal.style.display = 'none';
}

// Switch to Login from Register
function switchToLogin() {
    registerModal.style.display = 'none';
    loginModal.style.display = 'block';
}

// Switch to Register from Login
function switchToRegister() {
    loginModal.style.display = 'none';
    registerModal.style.display = 'block';
}

// User Registration
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Mật khẩu không khớp!');
        return;
    }
    
    // Save to localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('balance', '0');
    
    // Update UI
    updateUserInfo(username, '0');
    closeRegisterModal();
    alert('Đăng ký thành công!');
});

// User Login
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    const savedBalance = localStorage.getItem('balance');
    
    if (username === savedUsername && password === savedPassword) {
        // Update UI
        updateUserInfo(username, savedBalance);
        closeLoginModal();
        alert('Đăng nhập thành công!');
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
});

// Update User Info in Header
function updateUserInfo(username, balance) {
    usernameDisplay.textContent = username;
    balanceDisplay.textContent = balance;
    userInfo.style.display = 'block';
    registerBtn.style.display = 'none';
    loginBtn.style.display = 'none';
}

// Check if user is already logged in
function checkLoggedIn() {
    const savedUsername = localStorage.getItem('username');
    const savedBalance = localStorage.getItem('balance');
    
    if (savedUsername) {
        updateUserInfo(savedUsername, savedBalance);
    }
}

// Initialize
checkLoggedIn();

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

// Start Snow Effect
createSnow();
