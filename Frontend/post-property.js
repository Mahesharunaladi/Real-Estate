// Check Authentication on Page Load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    updateUserInfo();
    initializeForm();
});

// Check if user is logged in
function checkAuthentication() {
    const userData = getUserData();
    
    if (!userData || !userData.loggedIn) {
        // User is not logged in, redirect to login page
        alert('Please login to post a property');
        window.location.href = 'login.html?redirect=post-property.html';
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

// Update user information in the form
function updateUserInfo() {
    const userData = getUserData();
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');
    
    if (userData) {
        // Pre-fill contact information
        const contactName = document.getElementById('contactName');
        const contactEmail = document.getElementById('contactEmail');
        
        if (registeredUser.firstName && registeredUser.lastName) {
            contactName.value = `${registeredUser.firstName} ${registeredUser.lastName}`;
        }
        
        if (userData.email) {
            contactEmail.value = userData.email;
        }
        
        if (registeredUser.phone) {
            document.getElementById('contactPhone').value = registeredUser.phone;
        }
    }
}

// Initialize form functionality
function initializeForm() {
    const form = document.getElementById('propertyForm');
    
    // Handle image upload preview
    const imageInput = document.getElementById('propertyImages');
    imageInput.addEventListener('change', handleImageUpload);
    
    // Handle form submission
    form.addEventListener('submit', handleFormSubmit);
    
    // Format price input
    const priceInput = document.getElementById('price');
    priceInput.addEventListener('blur', function() {
        if (this.value) {
            this.value = parseInt(this.value).toLocaleString('en-IN');
        }
    });
    
    priceInput.addEventListener('focus', function() {
        this.value = this.value.replace(/,/g, '');
    });
}

// Handle image upload
function handleImageUpload(e) {
    const files = e.target.files;
    const uploadBox = document.querySelector('.image-upload');
    
    if (files.length > 0) {
        uploadBox.innerHTML = `
            <i class="fas fa-check-circle" style="color: #4CAF50;"></i>
            <h3>${files.length} Image${files.length > 1 ? 's' : ''} Selected</h3>
            <p>Click to change images</p>
            <input type="file" id="propertyImages" accept="image/*" multiple>
        `;
        
        // Re-attach event listener
        document.getElementById('propertyImages').addEventListener('change', handleImageUpload);
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        propertyFor: document.getElementById('propertyFor').value,
        propertyType: document.getElementById('propertyType').value,
        title: document.getElementById('propertyTitle').value,
        bhkType: document.getElementById('bhkType').value,
        builtArea: document.getElementById('builtArea').value,
        carpetArea: document.getElementById('carpetArea').value,
        description: document.getElementById('description').value,
        city: document.getElementById('city').value,
        locality: document.getElementById('locality').value,
        address: document.getElementById('address').value,
        price: document.getElementById('price').value.replace(/,/g, ''),
        negotiable: document.getElementById('negotiable').value,
        amenities: getSelectedAmenities(),
        contactName: document.getElementById('contactName').value,
        contactPhone: document.getElementById('contactPhone').value,
        contactEmail: document.getElementById('contactEmail').value,
        postedBy: getUserData().email,
        postedAt: new Date().toISOString(),
        status: 'active'
    };
    
    // Validate required fields
    if (!formData.propertyFor || !formData.propertyType || !formData.title) {
        showNotification('Please fill all required fields', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Posting...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Save to localStorage (in real app, this would be sent to backend)
        const properties = JSON.parse(localStorage.getItem('userProperties') || '[]');
        formData.id = 'property_' + Date.now();
        properties.push(formData);
        localStorage.setItem('userProperties', JSON.stringify(properties));
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Property posted successfully!', 'success');
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 1500);
}

// Get selected amenities
function getSelectedAmenities() {
    const amenities = [];
    document.querySelectorAll('.checkbox-options input[type="checkbox"]:checked').forEach(checkbox => {
        amenities.push(checkbox.value);
    });
    return amenities;
}

// Save as draft
function saveDraft() {
    const formData = {
        propertyFor: document.getElementById('propertyFor').value,
        propertyType: document.getElementById('propertyType').value,
        title: document.getElementById('propertyTitle').value,
        bhkType: document.getElementById('bhkType').value,
        builtArea: document.getElementById('builtArea').value,
        carpetArea: document.getElementById('carpetArea').value,
        description: document.getElementById('description').value,
        city: document.getElementById('city').value,
        locality: document.getElementById('locality').value,
        address: document.getElementById('address').value,
        price: document.getElementById('price').value,
        negotiable: document.getElementById('negotiable').value,
        amenities: getSelectedAmenities(),
        contactName: document.getElementById('contactName').value,
        contactPhone: document.getElementById('contactPhone').value,
        contactEmail: document.getElementById('contactEmail').value,
        status: 'draft',
        savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('propertyDraft', JSON.stringify(formData));
    showNotification('Draft saved successfully!', 'success');
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

// Load draft if exists
window.addEventListener('load', function() {
    const draft = localStorage.getItem('propertyDraft');
    
    if (draft && confirm('You have a saved draft. Would you like to load it?')) {
        const draftData = JSON.parse(draft);
        
        // Fill form with draft data
        Object.keys(draftData).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = draftData[key];
            }
        });
        
        // Handle amenities checkboxes
        if (draftData.amenities) {
            draftData.amenities.forEach(amenity => {
                const checkbox = document.querySelector(`.checkbox-options input[value="${amenity}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
    }
});

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
