// Check Authentication on Page Load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    loadProfileData();
    loadUserProperties();
    loadWishlist();
    loadActivity();
    setupEventListeners();
});

// Check if user is logged in
function checkAuthentication() {
    const userData = getUserData();
    
    if (!userData || !userData.loggedIn) {
        // User is not logged in, redirect to login page
        alert('Please login to view your profile');
        window.location.href = 'login.html?redirect=profile.html';
        return false;
    }
    
    return true;
}

// Get user data from localStorage or sessionStorage
function getUserData() {
    const localData = localStorage.getItem('userData');
    const sessionData = sessionStorage.getItem('userData');
    
    if (localData) {
        return JSON.parse(localData);
    } else if (sessionData) {
        return JSON.parse(sessionData);
    }
    
    return null;
}

// Load profile data
function loadProfileData() {
    const userData = getUserData();
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');
    
    if (userData && registeredUser) {
        // Update header
        document.getElementById('profileName').textContent = 
            `${registeredUser.firstName || 'User'} ${registeredUser.lastName || ''}`;
        document.getElementById('profileEmail').textContent = userData.email || 'user@email.com';
        
        // Update member since
        if (registeredUser.registeredAt) {
            const date = new Date(registeredUser.registeredAt);
            document.getElementById('memberSince').textContent = 
                `Member since ${date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
        }
        
        // Update avatar with initials
        const initials = `${(registeredUser.firstName || 'U')[0]}${(registeredUser.lastName || 'N')[0]}`;
        document.getElementById('profileAvatar').innerHTML = `<span style="font-size: 4rem; font-weight: 700;">${initials}</span>`;
        
        // Update form fields
        document.getElementById('firstName').value = registeredUser.firstName || '';
        document.getElementById('lastName').value = registeredUser.lastName || '';
        document.getElementById('email').value = userData.email || '';
        document.getElementById('phone').value = registeredUser.phone || '';
        document.getElementById('userType').value = registeredUser.userType || 'buyer';
        document.getElementById('location').value = registeredUser.location || 'Hyderabad, India';
    }
}

// Load user properties
function loadUserProperties() {
    const properties = JSON.parse(localStorage.getItem('userProperties') || '[]');
    
    document.getElementById('totalProperties').textContent = properties.length;
    
    if (properties.length > 0) {
        // Calculate stats
        const totalViews = properties.reduce((sum, prop) => sum + (prop.views || 0), 0);
        const totalInquiries = properties.reduce((sum, prop) => sum + (prop.inquiries || 0), 0);
        
        document.getElementById('totalViews').textContent = totalViews;
        document.getElementById('totalInquiries').textContent = totalInquiries;
        
        // Display properties
        const propertiesList = document.getElementById('propertiesList');
        propertiesList.innerHTML = properties.map(prop => `
            <div class="property-card" style="margin-bottom: 1rem;">
                <h3>${prop.title}</h3>
                <p>${prop.location}</p>
                <p><strong>Price:</strong> ₹${parseInt(prop.price).toLocaleString('en-IN')}</p>
                <p><strong>Status:</strong> ${prop.status || 'Active'}</p>
                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button class="btn-save" onclick="editProperty('${prop.id}')">Edit</button>
                    <button class="btn-cancel" onclick="deleteProperty('${prop.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    }
}

// Load wishlist
function loadWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('acredreams_wishlist') || '[]');
    
    if (wishlist.length > 0) {
        const wishlistContent = document.getElementById('wishlistContent');
        wishlistContent.innerHTML = `
            <p style="text-align: center; margin-bottom: 2rem;">
                You have <strong>${wishlist.length}</strong> saved properties
            </p>
            <div style="text-align: center;">
                <a href="wishlist.html" class="btn-save" style="display: inline-block; text-decoration: none;">
                    <i class="fas fa-heart"></i> View All Saved Properties
                </a>
            </div>
        `;
    }
}

// Load activity
function loadActivity() {
    const activities = [
        {
            icon: 'user-plus',
            title: 'Account Created',
            time: 'Welcome to AcreDreams!'
        }
    ];
    
    // Add property posting activities
    const properties = JSON.parse(localStorage.getItem('userProperties') || '[]');
    properties.forEach(prop => {
        if (prop.postedAt) {
            activities.push({
                icon: 'plus-circle',
                title: `Posted "${prop.title}"`,
                time: new Date(prop.postedAt).toLocaleString()
            });
        }
    });
    
    // Add wishlist activities
    const wishlist = JSON.parse(localStorage.getItem('acredreams_wishlist') || '[]');
    if (wishlist.length > 0) {
        activities.push({
            icon: 'heart',
            title: `Saved ${wishlist.length} properties to wishlist`,
            time: 'Recently'
        });
    }
    
    const activityList = document.getElementById('activityList');
    if (activities.length > 0) {
        activityList.innerHTML = activities.map(activity => `
            <li class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </li>
        `).join('');
    } else {
        activityList.innerHTML = '<p style="text-align: center; color: var(--text-gray); padding: 2rem;">No recent activity</p>';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Profile form submit
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveProfile();
    });
    
    // Password form submit
    document.getElementById('passwordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        changePassword();
    });
    
    // Avatar upload
    document.getElementById('avatarInput').addEventListener('change', function(e) {
        handleAvatarUpload(e);
    });
}

// Show section
function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.style.display = 'none';
    });
    
    // Remove active class from all nav items
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    const sectionMap = {
        'profile': 'profileSection',
        'properties': 'propertiesSection',
        'wishlist': 'wishlistSection',
        'activity': 'activitySection',
        'settings': 'settingsSection'
    };
    
    document.getElementById(sectionMap[section]).style.display = 'block';
    
    // Add active class to clicked nav item
    event.target.closest('a').classList.add('active');
}

// Enable edit mode
function enableEdit() {
    document.getElementById('firstName').disabled = false;
    document.getElementById('lastName').disabled = false;
    document.getElementById('phone').disabled = false;
    document.getElementById('userType').disabled = false;
    document.getElementById('location').disabled = false;
    
    document.getElementById('profileActions').style.display = 'none';
    document.getElementById('editActions').style.display = 'flex';
}

// Cancel edit
function cancelEdit() {
    document.getElementById('firstName').disabled = true;
    document.getElementById('lastName').disabled = true;
    document.getElementById('phone').disabled = true;
    document.getElementById('userType').disabled = true;
    document.getElementById('location').disabled = true;
    
    document.getElementById('profileActions').style.display = 'flex';
    document.getElementById('editActions').style.display = 'none';
    
    // Reload original data
    loadProfileData();
}

// Save profile
function saveProfile() {
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');
    
    // Update user data
    registeredUser.firstName = document.getElementById('firstName').value;
    registeredUser.lastName = document.getElementById('lastName').value;
    registeredUser.phone = document.getElementById('phone').value;
    registeredUser.userType = document.getElementById('userType').value;
    registeredUser.location = document.getElementById('location').value;
    
    // Save to localStorage
    localStorage.setItem('registeredUser', JSON.stringify(registeredUser));
    
    // Disable form fields
    cancelEdit();
    
    // Show success message
    showNotification('Profile updated successfully!', 'success');
    
    // Reload profile data
    loadProfileData();
}

// Change password
function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
        showNotification('Please fill all password fields', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('New passwords do not match', 'error');
        return;
    }
    
    if (newPassword.length < 8) {
        showNotification('Password must be at least 8 characters', 'error');
        return;
    }
    
    // In production, this would call backend API
    showNotification('Password updated successfully!', 'success');
    
    // Clear form
    document.getElementById('passwordForm').reset();
}

// Handle avatar upload
function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        showNotification('Please select an image file', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = document.createElement('img');
        img.src = event.target.result;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        
        document.getElementById('profileAvatar').innerHTML = '';
        document.getElementById('profileAvatar').appendChild(img);
        
        // Save to localStorage
        localStorage.setItem('userAvatar', event.target.result);
        
        showNotification('Profile picture updated!', 'success');
    };
    reader.readAsDataURL(file);
}

// Edit property
function editProperty(propertyId) {
    // In production, would navigate to edit page
    showNotification('Edit functionality coming soon!', 'info');
}

// Delete property
function deleteProperty(propertyId) {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    let properties = JSON.parse(localStorage.getItem('userProperties') || '[]');
    properties = properties.filter(p => p.id !== propertyId);
    localStorage.setItem('userProperties', JSON.stringify(properties));
    
    showNotification('Property deleted successfully', 'success');
    loadUserProperties();
}

// Save settings
function saveSettings() {
    const settings = {
        emailProperty: document.getElementById('emailProperty').checked,
        emailInquiry: document.getElementById('emailInquiry').checked,
        emailNewsletter: document.getElementById('emailNewsletter').checked
    };
    
    localStorage.setItem('userSettings', JSON.stringify(settings));
    showNotification('Settings saved successfully!', 'success');
}

// Delete account
function deleteAccount() {
    const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone!');
    if (!confirmed) return;
    
    const doubleConfirm = prompt('Type "DELETE" to confirm account deletion:');
    if (doubleConfirm !== 'DELETE') {
        showNotification('Account deletion cancelled', 'info');
        return;
    }
    
    // Clear all user data
    localStorage.removeItem('userData');
    localStorage.removeItem('registeredUser');
    localStorage.removeItem('userProperties');
    sessionStorage.clear();
    
    showNotification('Account deleted successfully', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#e74c3c' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Load saved avatar if exists
window.addEventListener('load', function() {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
        const img = document.createElement('img');
        img.src = savedAvatar;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        
        document.getElementById('profileAvatar').innerHTML = '';
        document.getElementById('profileAvatar').appendChild(img);
    }
});
