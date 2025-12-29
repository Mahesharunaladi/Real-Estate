// Seller Dashboard JavaScript

// Check authentication
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    loadListings();
    loadStatistics();
    setupFilters();
});

function checkAuthentication() {
    const userData = getUserData();
    
    if (!userData || !userData.loggedIn) {
        alert('Please login to access seller dashboard');
        window.location.href = 'login.html?redirect=seller-dashboard.html';
        return false;
    }
    
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');
    if (registeredUser.userType !== 'seller' && registeredUser.userType !== 'both') {
        alert('This page is only accessible to sellers');
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}

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

function loadListings() {
    const properties = JSON.parse(localStorage.getItem('userProperties') || '[]');
    const container = document.getElementById('listingsContainer');
    const emptyState = document.getElementById('emptyState');
    
    if (properties.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    emptyState.style.display = 'none';
    
    container.innerHTML = properties.map(property => `
        <div class="property-card" data-status="${property.status || 'active'}">
            <img src="${property.images?.[0] || 'https://via.placeholder.com/400x300?text=Property'}" alt="${property.title}">
            <div class="property-card-content">
                <span class="property-status status-${property.status || 'active'}">${(property.status || 'active').toUpperCase()}</span>
                <h3 style="margin: 0.5rem 0;">${property.title || 'Property'}</h3>
                <p style="color: var(--text-gray); margin: 0.5rem 0;">
                    <i class="fas fa-map-marker-alt"></i> ${property.location || 'Location'}
                </p>
                <p style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color); margin: 0.5rem 0;">
                    ₹${parseInt(property.price || 0).toLocaleString('en-IN')}
                </p>
                <div style="display: flex; gap: 1rem; margin: 0.5rem 0; color: var(--text-gray); font-size: 0.875rem;">
                    <span><i class="fas fa-eye"></i> ${property.views || 0} views</span>
                    <span><i class="fas fa-envelope"></i> ${property.inquiries || 0} inquiries</span>
                </div>
                <div class="property-actions">
                    <button class="btn-view" onclick="viewProperty('${property.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn-edit" onclick="editProperty('${property.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-delete" onclick="deleteProperty('${property.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function loadStatistics() {
    const properties = JSON.parse(localStorage.getItem('userProperties') || '[]');
    
    const activeListings = properties.filter(p => (p.status || 'active') === 'active').length;
    const totalViews = properties.reduce((sum, p) => sum + (p.views || 0), 0);
    const totalInquiries = properties.reduce((sum, p) => sum + (p.inquiries || 0), 0);
    const totalValue = properties.reduce((sum, p) => sum + (parseInt(p.price) || 0), 0);
    
    document.getElementById('totalListings').textContent = activeListings;
    document.getElementById('totalViews').textContent = totalViews.toLocaleString('en-IN');
    document.getElementById('totalInquiries').textContent = totalInquiries;
    document.getElementById('totalRevenue').textContent = '₹' + totalValue.toLocaleString('en-IN');
}

function setupFilters() {
    const statusFilter = document.getElementById('statusFilter');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterListings(this.value);
        });
    }
}

function filterListings(status) {
    const cards = document.querySelectorAll('.property-card');
    
    cards.forEach(card => {
        if (status === 'all' || card.dataset.status === status) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function viewProperty(propertyId) {
    window.location.href = `property-details.html?id=${propertyId}`;
}

function editProperty(propertyId) {
    window.location.href = `post-property.html?edit=${propertyId}`;
}

function deleteProperty(propertyId) {
    if (!confirm('Are you sure you want to delete this property listing?')) return;
    
    let properties = JSON.parse(localStorage.getItem('userProperties') || '[]');
    properties = properties.filter(p => p.id !== propertyId);
    localStorage.setItem('userProperties', JSON.stringify(properties));
    
    showNotification('Property deleted successfully', 'success');
    loadListings();
    loadStatistics();
}

function viewAnalytics() {
    showNotification('Analytics feature coming soon!', 'info');
}

function viewInquiries() {
    showNotification('Inquiries feature coming soon!', 'info');
}

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
