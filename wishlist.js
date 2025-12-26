// Wishlist Management
class WishlistManager {
    constructor() {
        this.wishlist = this.loadWishlist();
        this.init();
    }

    init() {
        this.updateUI();
        this.updateNavCounter();
    }

    loadWishlist() {
        const stored = localStorage.getItem('acredreams_wishlist');
        return stored ? JSON.parse(stored) : [];
    }

    saveWishlist() {
        localStorage.setItem('acredreams_wishlist', JSON.stringify(this.wishlist));
    }

    addProperty(property) {
        // Check if property already exists
        const exists = this.wishlist.find(p => p.id === property.id);
        if (!exists) {
            this.wishlist.push(property);
            this.saveWishlist();
            this.updateUI();
            this.updateNavCounter();
            this.showNotification('Property added to wishlist!', 'success');
        }
    }

    removeProperty(propertyId) {
        this.wishlist = this.wishlist.filter(p => p.id !== propertyId);
        this.saveWishlist();
        this.updateUI();
        this.updateNavCounter();
        this.showNotification('Property removed from wishlist', 'info');
    }

    isInWishlist(propertyId) {
        return this.wishlist.some(p => p.id === propertyId);
    }

    clearAll() {
        if (confirm('Are you sure you want to clear your entire wishlist?')) {
            this.wishlist = [];
            this.saveWishlist();
            this.updateUI();
            this.updateNavCounter();
            this.showNotification('Wishlist cleared', 'info');
        }
    }

    updateUI() {
        const emptyState = document.getElementById('emptyState');
        const wishlistActions = document.getElementById('wishlistActions');
        const wishlistGrid = document.getElementById('wishlistGrid');
        const totalWishlist = document.getElementById('totalWishlist');
        const totalValue = document.getElementById('totalValue');

        if (this.wishlist.length === 0) {
            emptyState.style.display = 'block';
            wishlistActions.style.display = 'none';
            wishlistGrid.style.display = 'none';
            totalWishlist.textContent = '0';
            totalValue.textContent = '₹0';
        } else {
            emptyState.style.display = 'none';
            wishlistActions.style.display = 'flex';
            wishlistGrid.style.display = 'grid';
            totalWishlist.textContent = this.wishlist.length;
            
            // Calculate total value
            const total = this.wishlist.reduce((sum, prop) => sum + prop.price, 0);
            totalValue.textContent = this.formatPrice(total);

            // Render properties
            this.renderProperties();
        }
    }

    renderProperties() {
        const wishlistGrid = document.getElementById('wishlistGrid');
        wishlistGrid.innerHTML = '';

        this.wishlist.forEach(property => {
            const card = this.createPropertyCard(property);
            wishlistGrid.appendChild(card);
        });
    }

    createPropertyCard(property) {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
            <button class="remove-from-wishlist" onclick="wishlistManager.removeProperty('${property.id}')">
                <i class="fas fa-times"></i>
            </button>
            ${property.badge ? `<div class="property-badge ${property.badgeClass || ''}">${property.badge}</div>` : ''}
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                <button class="favorite-btn active">
                    <i class="fas fa-heart"></i>
                </button>
                <div class="property-gallery-indicator">
                    <i class="fas fa-images"></i> ${property.gallery || 15}
                </div>
            </div>
            <div class="property-details">
                <div class="property-price">${this.formatPrice(property.price)}</div>
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </p>
                <div class="property-features">
                    ${property.features.map(f => `<span>${f}</span>`).join('')}
                </div>
                ${property.amenities ? `
                    <div class="property-amenities">
                        ${property.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="property-footer">
                    <span class="property-age">${property.age || 'New'}</span>
                    <button class="btn-contact" onclick="contactOwner('${property.id}')">Contact Owner</button>
                </div>
            </div>
        `;
        return card;
    }

    formatPrice(price) {
        if (price >= 10000000) {
            return `₹${(price / 10000000).toFixed(2)} Crores`;
        } else if (price >= 100000) {
            return `₹${(price / 100000).toFixed(0)} Lakhs`;
        } else {
            return `₹${price.toLocaleString('en-IN')}`;
        }
    }

    updateNavCounter() {
        const counters = document.querySelectorAll('.wishlist-count, #navWishlistCount');
        counters.forEach(counter => {
            counter.textContent = this.wishlist.length;
            if (this.wishlist.length > 0) {
                counter.style.display = 'flex';
            } else {
                counter.style.display = 'none';
            }
        });
    }

    showNotification(message, type = 'success') {
        // Create notification element
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

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize wishlist manager
const wishlistManager = new WishlistManager();

// Share wishlist function
function shareWishlist() {
    const wishlistUrl = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: 'My AcreDreams Wishlist',
            text: `Check out my favorite properties on AcreDreams! I've saved ${wishlistManager.wishlist.length} properties.`,
            url: wishlistUrl
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(wishlistUrl).then(() => {
            wishlistManager.showNotification('Link copied to clipboard!', 'success');
        });
    }
}

// Clear wishlist function
function clearWishlist() {
    wishlistManager.clearAll();
}

// Contact owner function
function contactOwner(propertyId) {
    alert(`Contacting owner for property: ${propertyId}\nThis feature will be implemented soon!`);
}

// Add CSS animations
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

    .icon-btn {
        position: relative;
    }
`;
document.head.appendChild(style);
