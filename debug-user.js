/* Debug Script - Open Browser Console and paste this to check user data */

// Function to check current user information
function checkCurrentUser() {
    console.log('=== USER DATA CHECK ===');
    
    const registeredUser = localStorage.getItem('registeredUser');
    const userData = localStorage.getItem('userData');
    
    if (registeredUser) {
        const user = JSON.parse(registeredUser);
        console.log('✅ Registered User Found:');
        console.log('  Email:', user.email);
        console.log('  Name:', user.firstName, user.lastName);
        console.log('  User Type:', user.userType);
        console.log('  Phone:', user.phone);
        console.log('  Registered:', user.registeredAt);
    } else {
        console.log('❌ No registered user found');
    }
    
    if (userData) {
        const loggedIn = JSON.parse(userData);
        console.log('\n✅ Login Session:');
        console.log('  Email:', loggedIn.email);
        console.log('  Logged In:', loggedIn.loggedIn);
    } else {
        console.log('\n❌ No active login session');
    }
    
    // Check passwords
    console.log('\n=== STORED PASSWORDS ===');
    const keys = Object.keys(localStorage);
    const passwordKeys = keys.filter(key => key.startsWith('userPassword_'));
    if (passwordKeys.length > 0) {
        console.log('Found passwords for:');
        passwordKeys.forEach(key => {
            const email = key.replace('userPassword_', '');
            console.log('  -', email);
        });
    } else {
        console.log('No passwords found');
    }
    
    console.log('\n=== END CHECK ===\n');
}

// Function to clear all user data (for testing)
function clearAllUserData() {
    const confirmed = confirm('This will clear all user data. Continue?');
    if (confirmed) {
        localStorage.clear();
        sessionStorage.clear();
        console.log('✅ All data cleared. Refresh the page.');
        alert('All data cleared. Please refresh the page.');
    }
}

// Function to test redirect logic
function testRedirect() {
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');
    
    console.log('=== REDIRECT TEST ===');
    console.log('User Type:', registeredUser.userType);
    
    let redirectTo = 'index.html'; // Default for buyers
    
    if (registeredUser.userType === 'seller' || registeredUser.userType === 'both') {
        redirectTo = 'seller-dashboard.html';
    } else if (registeredUser.userType === 'agent') {
        redirectTo = 'agent-dashboard.html';
    }
    
    console.log('Should redirect to:', redirectTo);
    console.log('=== END TEST ===\n');
    
    return redirectTo;
}

// Run check automatically
console.log('\n🔍 Debug Tools Loaded!');
console.log('Available commands:');
console.log('  checkCurrentUser()  - Check user data');
console.log('  clearAllUserData()  - Clear all data');
console.log('  testRedirect()      - Test redirect logic\n');

// Auto-run check
checkCurrentUser();
