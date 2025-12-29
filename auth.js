// Toggle Password Visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.toggle-password');
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Password Strength Checker
function checkPasswordStrength(password) {
    let strength = 0;
    
    // Check length
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    
    // Check for lowercase and uppercase
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    
    // Check for numbers
    if (/\d/.test(password)) strength += 12.5;
    
    // Check for special characters
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 12.5;
    
    return strength;
}

// Update Password Strength Bar
function updatePasswordStrength() {
    const passwordInput = document.getElementById('regPassword');
    const strengthBar = document.getElementById('strengthBar');
    
    if (!passwordInput || !strengthBar) return;
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = checkPasswordStrength(password);
        
        strengthBar.style.width = strength + '%';
        
        // Remove all classes
        strengthBar.classList.remove('weak', 'medium', 'strong');
        
        // Add appropriate class
        if (strength <= 33) {
            strengthBar.classList.add('weak');
        } else if (strength <= 66) {
            strengthBar.classList.add('medium');
        } else {
            strengthBar.classList.add('strong');
        }
    });
}

// Show Message
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    const form = document.querySelector('.auth-form');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.querySelector('input[name="remember"]').checked;
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address!', 'error');
            return;
        }
        
        // Validate password is not empty
        if (!password || password.trim() === '') {
            showMessage('Please enter your password!', 'error');
            return;
        }
        
        // Add loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            // Remove loading state
            submitBtn.classList.remove('loading');
            
            // Get registered user data
            const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');
            const storedPassword = localStorage.getItem('userPassword_' + email);
            
            // Check if user exists
            if (!registeredUser.email) {
                showMessage('No account found. Please register first!', 'error');
                return;
            }
            
            // Verify email matches
            if (registeredUser.email !== email) {
                showMessage('Invalid email or password!', 'error');
                return;
            }
            
            // Verify password matches
            if (!storedPassword || storedPassword !== password) {
                showMessage('Invalid email or password!', 'error');
                return;
            }
            
            // Store user data (login successful)
            const userData = {
                email: email,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                loggedIn: true,
                timestamp: new Date().getTime()
            };
            
            if (remember) {
                localStorage.setItem('userData', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('userData', JSON.stringify(userData));
            }
            
            showMessage('Login successful! Redirecting...', 'success');
            
            // Check if there's a redirect parameter
            const urlParams = new URLSearchParams(window.location.search);
            const redirectTo = urlParams.get('redirect') || 'index.html';
            
            // Redirect after 1.5 seconds
            setTimeout(() => {
                window.location.href = redirectTo;
            }, 1500);
        }, 1500);
    });
}

// Registration Form Handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('regEmail').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const userType = document.getElementById('userType').value;
        const terms = document.querySelector('input[name="terms"]').checked;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            showMessage('Passwords do not match!', 'error');
            return;
        }
        
        // Validate password strength
        const strength = checkPasswordStrength(password);
        if (strength < 50) {
            showMessage('Please use a stronger password!', 'error');
            return;
        }
        
        // Validate terms
        if (!terms) {
            showMessage('Please accept the Terms & Conditions!', 'error');
            return;
        }
        
        // Add loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            // Remove loading state
            submitBtn.classList.remove('loading');
            
            // Check if email already exists
            const existingUser = localStorage.getItem('registeredUser');
            if (existingUser) {
                const existing = JSON.parse(existingUser);
                if (existing.email === email) {
                    showMessage('An account with this email already exists! Please login.', 'error');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                    return;
                }
            }
            
            // Store user data (in real app, this would be handled by backend)
            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                userType: userType,
                registeredAt: new Date().toISOString()
            };
            
            localStorage.setItem('registeredUser', JSON.stringify(userData));
            
            // Store password separately (in real app, this would be hashed on backend)
            // Using email as key to associate password with user
            localStorage.setItem('userPassword_' + email, password);
            
            // Auto-login after registration
            const loginData = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                loggedIn: true,
                timestamp: new Date().getTime()
            };
            localStorage.setItem('userData', JSON.stringify(loginData));
            
            // Send welcome email
            sendWelcomeEmail(userData);
            
            showMessage('Registration successful! Check your email for confirmation. Redirecting...', 'success');
            
            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }, 1500);
    });
}

// Social Login Handlers
document.querySelectorAll('.btn-social').forEach(button => {
    button.addEventListener('click', function() {
        const provider = this.classList.contains('btn-google') ? 'Google' : 'Facebook';
        showMessage(`${provider} authentication will be implemented soon!`, 'success');
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updatePasswordStrength();
    
    // Check if user is already logged in
    const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    if (userData && (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html'))) {
        // Uncomment to auto-redirect logged-in users
        // window.location.href = 'index.html';
    }
});

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone number (Indian format)
function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,5}[)]?[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Real-time validation
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#ef4444';
            showMessage('Please enter a valid email address', 'error');
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#ef4444';
            showMessage('Please enter a valid phone number', 'error');
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });
});

// Send Welcome Email Function
async function sendWelcomeEmail(userData) {
    // This is a demo function - In production, this should call your backend API
    // Your backend will handle the actual email sending using services like:
    // - SendGrid, Mailgun, AWS SES, Nodemailer, etc.
    
    const emailData = {
        to: userData.email,
        subject: 'Welcome to AcreDreams! 🏡',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f8f9fa; padding: 30px; }
                    .button { display: inline-block; background: #00BCD4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
                    .features { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .feature-item { padding: 10px 0; border-bottom: 1px solid #e0e0e0; }
                    .feature-item:last-child { border-bottom: none; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🏡 Welcome to AcreDreams!</h1>
                    </div>
                    <div class="content">
                        <h2>Hello ${userData.firstName} ${userData.lastName}!</h2>
                        <p>Thank you for joining AcreDreams - your gateway to finding the perfect property!</p>
                        
                        <p>We're excited to have you on board. Your account has been successfully created and you can now:</p>
                        
                        <div class="features">
                            <div class="feature-item">✅ Browse thousands of verified properties</div>
                            <div class="feature-item">✅ Save your favorite listings</div>
                            <div class="feature-item">✅ Get personalized property recommendations</div>
                            <div class="feature-item">✅ Connect directly with property agents</div>
                            <div class="feature-item">✅ Post your own property listings</div>
                        </div>
                        
                        <p style="text-align: center;">
                            <a href="https://acredreams.com/login" class="button">Start Exploring Properties</a>
                        </p>
                        
                        <p><strong>Your Account Details:</strong></p>
                        <ul>
                            <li><strong>Email:</strong> ${userData.email}</li>
                            <li><strong>Phone:</strong> ${userData.phone}</li>
                            <li><strong>User Type:</strong> ${userData.userType}</li>
                            <li><strong>Registered:</strong> ${new Date(userData.registeredAt).toLocaleString()}</li>
                        </ul>
                        
                        <p>If you have any questions or need assistance, our support team is available 24/7.</p>
                        
                        <p>Happy house hunting! 🎉</p>
                        
                        <p>Best regards,<br>The AcreDreams Team</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2025 AcreDreams. All rights reserved.</p>
                        <p>This email was sent to ${userData.email}</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };
    
    // In production, you would call your backend API:
    try {
        const response = await fetch('http://localhost:3000/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
        });
        
        if (response.ok) {
            console.log('✅ Welcome email sent successfully to', userData.email);
            return true;
        } else {
            console.error('❌ Failed to send welcome email');
            return false;
        }
    } catch (error) {
        console.error('⚠️ Error sending email (Backend may not be running):', error);
        console.log('💡 To enable emails, start the backend server:');
        console.log('   cd backend && npm install && npm start');
        return false;
    }
    
    // For demo purposes, just log the email data
    console.log('📧 Welcome Email Details:');
    console.log('To:', emailData.to);
    console.log('Subject:', emailData.subject);
    console.log('Email would be sent with full HTML content');
    
    // Show a notification that email was sent (demo only)
    setTimeout(() => {
        console.log(`✅ Welcome email sent to ${userData.email}`);
    }, 500);
    
    return true;
}

// Utility function to clear old/test accounts (for development)
function clearTestAccounts() {
    const confirmation = confirm('This will clear all stored accounts. Are you sure?');
    if (confirmation) {
        // Get all localStorage keys
        const keys = Object.keys(localStorage);
        
        // Remove user-related data
        keys.forEach(key => {
            if (key.startsWith('userPassword_') || 
                key === 'registeredUser' || 
                key === 'userData') {
                localStorage.removeItem(key);
            }
        });
        
        sessionStorage.clear();
        alert('All accounts cleared! You can now register again.');
        window.location.href = 'register.html';
    }
}

// Add to window for debugging
if (typeof window !== 'undefined') {
    window.clearTestAccounts = clearTestAccounts;
    window.checkStoredCredentials = function() {
        const user = JSON.parse(localStorage.getItem('registeredUser') || '{}');
        if (user.email) {
            console.log('📧 Registered Email:', user.email);
            console.log('🔒 Password Key:', 'userPassword_' + user.email);
            console.log('✅ Password Exists:', !!localStorage.getItem('userPassword_' + user.email));
            console.log('👤 User Data:', user);
        } else {
            console.log('❌ No registered user found');
        }
    };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updatePasswordStrength();
});
