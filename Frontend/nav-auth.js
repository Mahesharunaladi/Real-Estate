// Global Navigation Authentication Manager
(function() {
    'use strict';
    
    // Check authentication status on page load
    document.addEventListener('DOMContentLoaded', function() {
        initializeNavigation();
    });
    
    function initializeNavigation() {
        updateUserIcon();
        handlePostPropertyClick();
        updateWishlistCounter();
    }
    
    // Get user data from storage
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
    
    // Update user icon based on login status
    function updateUserIcon() {
        const userData = getUserData();
        const userIcon = document.getElementById('userIcon');
        
        if (!userIcon) return;
        
        if (userData && userData.loggedIn) {
            // User is logged in
            const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');
            const firstName = registeredUser.firstName || userData.email.split('@')[0];
            
            userIcon.innerHTML = `
                <div class="user-dropdown">
                    <i class="fas fa-user-circle"></i>
                    <span class="user-name">${firstName}</span>
                    <div class="dropdown-menu">
                        <a href="#" onclick="viewProfile()"><i class="fas fa-user"></i> My Profile</a>
                        <a href="#" onclick="viewMyProperties()"><i class="fas fa-building"></i> My Properties</a>
                        <a href="wishlist.html"><i class="fas fa-heart"></i> Wishlist</a>
                        <hr>
                        <a href="#" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </div>
                </div>
            `;
            
            // Add dropdown styles if not already added
            addDropdownStyles();
        } else {
            // User is not logged in
            userIcon.href = 'login.html';
            userIcon.innerHTML = '<i class="far fa-user"></i>';
        }
    }
    
    // Handle Post Property button click
    function handlePostPropertyClick() {
        const postPropertyBtn = document.getElementById('postPropertyBtn');
        
        if (!postPropertyBtn) {
            // If button doesn't have ID, try to find it by href or class
            const postBtns = document.querySelectorAll('a.btn-primary, .btn-primary');
            postBtns.forEach(btn => {
                if (btn.textContent.includes('Post Property')) {
                    setupPostPropertyButton(btn);
                }
            });
        } else {
            setupPostPropertyButton(postPropertyBtn);
        }
    }
    
    function setupPostPropertyButton(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const userData = getUserData();
            
            if (!userData || !userData.loggedIn) {
                // User not logged in, redirect to login with redirect parameter
                alert('Please login to post a property');
                window.location.href = 'login.html?redirect=post-property.html';
            } else {
                // User is logged in, go to post property page
                window.location.href = 'post-property.html';
            }
        });
    }
    
    // Update wishlist counter
    function updateWishlistCounter() {
        const wishlist = JSON.parse(localStorage.getItem('acredreams_wishlist') || '[]');
        const counters = document.querySelectorAll('.wishlist-count');
        
        counters.forEach(counter => {
            counter.textContent = wishlist.length;
            if (wishlist.length > 0) {
                counter.style.display = 'flex';
            } else {
                counter.style.display = 'none';
            }
        });
    }
    
    // Add dropdown styles dynamically
    function addDropdownStyles() {
        if (document.getElementById('nav-dropdown-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'nav-dropdown-styles';
        style.textContent = `
            .user-dropdown {
                position: relative;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;
                padding: 0.5rem;
            }
            
            .user-dropdown:hover {
                color: var(--primary-color);
            }
            
            .user-name {
                font-weight: 600;
                font-size: 0.9rem;
            }
            
            .dropdown-menu {
                position: absolute;
                top: 100%;
                right: 0;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                min-width: 200px;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.3s;
                z-index: 1000;
                margin-top: 0.5rem;
            }
            
            .user-dropdown:hover .dropdown-menu {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .dropdown-menu a {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.75rem 1rem;
                color: var(--text-dark);
                text-decoration: none;
                transition: all 0.3s;
            }
            
            .dropdown-menu a:hover {
                background: var(--bg-light);
                color: var(--primary-color);
            }
            
            .dropdown-menu a i {
                width: 20px;
                text-align: center;
            }
            
            .dropdown-menu hr {
                margin: 0.5rem 0;
                border: none;
                border-top: 1px solid #e0e0e0;
            }
            
            @media (max-width: 768px) {
                .user-name {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Logout function
    window.logout = function() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('userData');
            sessionStorage.removeItem('userData');
            showNotification('Logged out successfully', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    };
    
    // View profile function
    window.viewProfile = function() {
        // Get user type and redirect to appropriate dashboard
        const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');
        
        if (registeredUser.userType === 'seller' || registeredUser.userType === 'both') {
            window.location.href = 'seller-dashboard.html';
        } else if (registeredUser.userType === 'agent') {
            window.location.href = 'agent-dashboard.html';
        } else {
            window.location.href = 'profile.html';
        }
    };
    
    // View my properties function
    window.viewMyProperties = function() {
        const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');
        
        if (registeredUser.userType === 'seller' || registeredUser.userType === 'both') {
            window.location.href = 'seller-dashboard.html';
        } else {
            window.location.href = 'profile.html';
            // After navigation, show properties tab
            setTimeout(() => {
                showSection('properties');
            }, 100);
        }
    };
    
    // Show notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
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
        }, 2000);
    }
})();
