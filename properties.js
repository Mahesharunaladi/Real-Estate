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
