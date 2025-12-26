// Toggle Advanced Filters
function toggleAdvancedFilters() {
    const advancedFilters = document.getElementById('advancedFilters');
    advancedFilters.classList.toggle('show');
}

// Clear All Filters
function clearFilters() {
    // Clear all inputs
    document.querySelectorAll('.advanced-filters input[type="text"]').forEach(input => {
        input.value = '';
    });
    
    // Uncheck all checkboxes
    document.querySelectorAll('.advanced-filters input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset selects
    document.querySelectorAll('.advanced-filters select').forEach(select => {
        select.selectedIndex = 0;
    });
    
    // Reset filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    
    // Show all properties
    document.querySelectorAll('.property-card').forEach(card => {
        card.style.display = 'block';
    });
    
    updateResultsCount();
}

// Apply Filters
function applyFilters() {
    const minPrice = parseFloat(document.getElementById('minPrice')?.value.replace(/,/g, '')) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice')?.value.replace(/,/g, '')) || Infinity;
    
    // Get selected BHK types
    const selectedBHK = Array.from(document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked'))
        .map(cb => cb.value);
    
    // Filter property cards
    document.querySelectorAll('.property-card').forEach(card => {
        const price = parseFloat(card.dataset.price);
        const type = card.dataset.type;
        const bhk = card.querySelector('.property-features span:first-child')?.textContent.trim().split(' ')[0];
        
        let show = true;
        
        // Price filter
        if (price < minPrice || price > maxPrice) {
            show = false;
        }
        
        // BHK filter
        if (selectedBHK.length > 0 && !selectedBHK.includes(bhk)) {
            show = false;
        }
        
        card.style.display = show ? 'block' : 'none';
    });
    
    updateResultsCount();
    toggleAdvancedFilters();
}

// Filter by Type
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        
        // Filter properties
        document.querySelectorAll('.property-card').forEach(card => {
            if (filter === 'all' || card.dataset.type === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        updateResultsCount();
    });
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        document.querySelectorAll('.property-card').forEach(card => {
            const title = card.querySelector('.property-title').textContent.toLowerCase();
            const location = card.querySelector('.property-location').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || location.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        updateResultsCount();
    });
}

// Sort Functionality
const sortSelect = document.getElementById('sortBy');
if (sortSelect) {
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        const propertiesGrid = document.getElementById('propertiesGrid');
        const properties = Array.from(propertiesGrid.querySelectorAll('.property-card'));
        
        properties.sort((a, b) => {
            const priceA = parseFloat(a.dataset.price);
            const priceB = parseFloat(b.dataset.price);
            
            switch(sortValue) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'newest':
                    return b.querySelector('.property-age')?.textContent.localeCompare(
                        a.querySelector('.property-age')?.textContent
                    );
                case 'area':
                    const areaA = parseInt(a.querySelector('.property-features span:last-child')?.textContent);
                    const areaB = parseInt(b.querySelector('.property-features span:last-child')?.textContent);
                    return areaB - areaA;
                default:
                    return 0;
            }
        });
        
        // Re-append sorted properties
        properties.forEach(property => propertiesGrid.appendChild(property));
    });
}

// Update Results Count
function updateResultsCount() {
    const visibleProperties = document.querySelectorAll('.property-card[style*="display: block"], .property-card:not([style*="display: none"])').length;
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = visibleProperties;
    }
}

// Favorite Button Functionality
document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        const icon = this.querySelector('i');
        
        if (this.classList.contains('active')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = '#ff4757';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '';
        }
    });
});

// Contact Agent Button
document.querySelectorAll('.btn-contact').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const propertyCard = this.closest('.property-card');
        const propertyTitle = propertyCard.querySelector('.property-title').textContent;
        
        // Check if user is logged in
        const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
        
        if (userData) {
            alert(`Connecting you with an agent for: ${propertyTitle}\n\nYou will receive a call shortly!`);
        } else {
            if (confirm('Please login to contact the agent. Would you like to login now?')) {
                window.location.href = 'login.html';
            }
        }
    });
});

// Property Card Click to View Details
document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't trigger if clicking on favorite or contact button
        if (e.target.closest('.favorite-btn') || e.target.closest('.btn-contact')) {
            return;
        }
        
        const propertyTitle = this.querySelector('.property-title').textContent;
        console.log('Viewing property:', propertyTitle);
        // In a real app, navigate to property details page
        // window.location.href = `property-details.html?id=${propertyId}`;
    });
    
    // Add hover cursor
    card.style.cursor = 'pointer';
});

// Pagination
document.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.disabled) return;
        
        // Remove active class from all
        document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
        
        // Add active to clicked (if it's a number)
        if (!this.querySelector('i')) {
            this.classList.add('active');
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // In real app, load new properties from API
        console.log('Loading page:', this.textContent);
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateResultsCount();
    initializeWishlist();
    
    // Add animation to cards on load
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.property-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

// Format price input
document.querySelectorAll('#minPrice, #maxPrice').forEach(input => {
    if (input) {
        input.addEventListener('blur', function() {
            let value = this.value.replace(/,/g, '');
            if (value && !isNaN(value)) {
                this.value = parseInt(value).toLocaleString('en-IN');
            }
        });
    }
});

// Wishlist Integration
function initializeWishlist() {
    const wishlist = loadWishlist();
    updateWishlistUI(wishlist);
    
    // Add click handlers to favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(this);
        });
    });
}

function loadWishlist() {
    const stored = localStorage.getItem('acredreams_wishlist');
    return stored ? JSON.parse(stored) : [];
}

function saveWishlist(wishlist) {
    localStorage.setItem('acredreams_wishlist', JSON.stringify(wishlist));
}

function toggleWishlist(button) {
    const propertyCard = button.closest('.property-card');
    const propertyData = extractPropertyData(propertyCard);
    
    let wishlist = loadWishlist();
    const existingIndex = wishlist.findIndex(p => p.id === propertyData.id);
    
    if (existingIndex > -1) {
        // Remove from wishlist
        wishlist.splice(existingIndex, 1);
        button.classList.remove('active');
        button.querySelector('i').classList.replace('fas', 'far');
        showNotification('Removed from wishlist', 'info');
    } else {
        // Add to wishlist
        wishlist.push(propertyData);
        button.classList.add('active');
        button.querySelector('i').classList.replace('far', 'fas');
        showNotification('Added to wishlist!', 'success');
    }
    
    saveWishlist(wishlist);
    updateWishlistCounter(wishlist);
}

function extractPropertyData(card) {
    const img = card.querySelector('.property-image img');
    const title = card.querySelector('.property-title');
    const price = card.querySelector('.property-price');
    const location = card.querySelector('.property-location');
    const features = card.querySelectorAll('.property-features span');
    const amenities = card.querySelectorAll('.amenity-tag');
    const badge = card.querySelector('.property-badge');
    const age = card.querySelector('.property-age');
    const gallery = card.querySelector('.property-gallery-indicator');
    
    // Generate unique ID from title
    const id = title ? title.textContent.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'property-' + Date.now();
    
    return {
        id: id,
        title: title ? title.textContent : 'Property',
        price: parseFloat(card.dataset.price) || 0,
        location: location ? location.textContent.trim() : '',
        image: img ? img.src : '',
        features: Array.from(features).map(f => f.innerHTML),
        amenities: Array.from(amenities).map(a => a.innerHTML),
        badge: badge ? badge.textContent : '',
        badgeClass: badge ? badge.className.replace('property-badge', '').trim() : '',
        age: age ? age.textContent : '',
        gallery: gallery ? gallery.textContent.trim() : '15'
    };
}

function updateWishlistUI(wishlist) {
    document.querySelectorAll('.property-card').forEach(card => {
        const propertyData = extractPropertyData(card);
        const isInWishlist = wishlist.some(p => p.id === propertyData.id);
        const favoriteBtn = card.querySelector('.favorite-btn');
        
        if (isInWishlist) {
            favoriteBtn.classList.add('active');
            favoriteBtn.querySelector('i').classList.replace('far', 'fas');
        }
    });
    
    updateWishlistCounter(wishlist);
}

function updateWishlistCounter(wishlist) {
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

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
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
    }, 3000);
}

// Add notification animations
const notifStyle = document.createElement('style');
notifStyle.textContent = `
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

    .wishlist-count {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #e74c3c;
        color: white;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 0.2rem 0.4rem;
        border-radius: 50%;
        min-width: 18px;
        height: 18px;
        display: none;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(notifStyle);
