# Testing Guide: Role-Based Dashboard System

## Quick Test Instructions

Follow these steps to test the complete role-based system:

---

## 🧪 Test 1: Buyer Flow

### Steps:
1. **Open Registration Page**
   - Navigate to `register.html`

2. **Register as Buyer**
   - First Name: `John`
   - Last Name: `Buyer`
   - Email: `buyer@test.com`
   - Phone: `1234567890`
   - Password: `buyer123`
   - User Type: **Select "Property Buyer"**
   - Click Register

3. **Verify Auto-Login**
   - Should automatically log in
   - Should redirect to `index.html` (browse properties page)

4. **Test Navigation**
   - Click on "Profile" or user name in navigation
   - Should go to `profile.html`
   - Browse properties, add to wishlist
   - Should NOT see "Post Property" option in main menu

5. **Test Login Again**
   - Log out
   - Log back in with `buyer@test.com` / `buyer123`
   - Should redirect to `index.html`

### Expected Results:
✅ Redirects to browse properties page after login  
✅ Profile button goes to profile.html  
✅ Can browse and save properties  
✅ No access to post properties or dashboards  

---

## 🏠 Test 2: Seller Flow

### Steps:
1. **Register as Seller**
   - First Name: `Sarah`
   - Last Name: `Seller`
   - Email: `seller@test.com`
   - Phone: `9876543210`
   - Password: `seller123`
   - User Type: **Select "Property Seller"**
   - Click Register

2. **Verify Dashboard Redirect**
   - Should automatically redirect to `seller-dashboard.html`
   - Should see statistics cards (0 listings initially)

3. **Post a Property**
   - Click "Post Property" button
   - Fill out property form:
     - Title: "Luxury Villa"
     - Price: "5000000"
     - Type: "Villa"
     - Location: "Gachibowli, Hyderabad"
     - Area: "2500 sq ft"
     - Bedrooms: "3"
     - Bathrooms: "3"
     - Description: "Beautiful villa with modern amenities"
   - Submit property

4. **Verify Dashboard Updates**
   - Return to seller dashboard
   - Should see 1 Active Listing
   - Property should appear in "My Properties" section
   - Can edit or delete the property

5. **Test Filtering**
   - Filter by status: "Active", "Pending", "Sold"
   - Verify property appears in "Active" filter

6. **Test Navigation**
   - Click profile/dashboard button
   - Should return to `seller-dashboard.html`

### Expected Results:
✅ Redirects to seller dashboard after login  
✅ Can post new properties  
✅ Dashboard shows statistics  
✅ Can manage (edit/delete) properties  
✅ Filtering works correctly  

---

## 💼 Test 3: Agent Flow

### Steps:
1. **Register as Agent**
   - First Name: `Mike`
   - Last Name: `Agent`
   - Email: `agent@test.com`
   - Phone: `5555555555`
   - Password: `agent123`
   - User Type: **Select "Real Estate Agent"**
   - Click Register

2. **Verify Dashboard Redirect**
   - Should redirect to `agent-dashboard.html`
   - Should see statistics cards (0 projects initially)

3. **View Upcoming Projects**
   - Scroll to "Upcoming Projects from Clients"
   - Should see sample projects with:
     - John Doe - Residential (₹80 Lakhs)
     - ABC Corporation - Commercial (₹5 Crores)
     - Sarah Miller - Land (₹1.5 Crores)
   - Each showing budget, requirements, and location

4. **Add a Client Project**
   - Click "Add Client Project" button
   - Fill out form:
     - Client Name: "Rahul Kumar"
     - Project Type: "Residential"
     - Budget: "10000000"
     - Location: "Jubilee Hills, Hyderabad"
     - Requirements: "4 BHK apartment with gym and pool"
     - Timeline: "8 months"
     - Status: "Planning"
   - Click "Add Project"

5. **Verify Project Added**
   - Should see project in "My Client Projects" section
   - Dashboard stats should update:
     - Active Projects: 1
     - Estimated Commission: ₹2,00,000 (2% of 1 crore)

6. **Test Filtering**
   - Filter by type: "Residential", "Commercial", "Land"
   - Filter by status: "Planning", "In Progress", "Completed"
   - Verify project appears in correct filters

7. **Test Edit/Delete**
   - Click edit button on project
   - Modify details and save
   - Verify changes reflected
   - Delete project if desired

### Expected Results:
✅ Redirects to agent dashboard after login  
✅ Shows upcoming projects from different clients  
✅ Displays budgets and requirements clearly  
✅ Can add new client projects  
✅ Commission calculated correctly  
✅ Filtering and management works  

---

## 🔄 Test 4: Hybrid User (Both)

### Steps:
1. **Register as Both**
   - First Name: `Alex`
   - Last Name: `Both`
   - Email: `both@test.com`
   - Phone: `7777777777`
   - Password: `both123`
   - User Type: **Select "Both (Buyer & Seller)"**
   - Click Register

2. **Verify Redirect**
   - Should redirect to `seller-dashboard.html`
   - Has seller capabilities

3. **Test Dual Access**
   - Can post properties (seller feature)
   - Can also browse properties (buyer feature)
   - Has access to both functionalities

### Expected Results:
✅ Redirects to seller dashboard  
✅ Can post and manage properties  
✅ Can also browse as buyer  

---

## 🔐 Test 5: Authentication Security

### Test Password Validation:
1. Register any user with password: `test123`
2. Log out
3. Try logging in with wrong password: `wrong123`
4. Should show: "Invalid email or password!"
5. Try with correct password: `test123`
6. Should log in successfully

### Test Role Protection:
1. Log in as buyer (`buyer@test.com`)
2. Manually navigate to `seller-dashboard.html`
3. Should be redirected back with alert
4. Try navigating to `agent-dashboard.html`
5. Should be redirected back with alert

### Expected Results:
✅ Wrong password rejected  
✅ Correct password accepted  
✅ Role-based access enforced  
✅ Unauthorized access blocked  

---

## 🧹 Cleanup & Reset

### Clear Test Data:
Open browser console and run:
```javascript
// Method 1: Clear all localStorage
localStorage.clear();

// Method 2: Use debug function
clearTestAccounts();

// Method 3: Clear specific accounts
localStorage.removeItem('userPassword_buyer@test.com');
localStorage.removeItem('userPassword_seller@test.com');
localStorage.removeItem('userPassword_agent@test.com');
localStorage.removeItem('userPassword_both@test.com');
localStorage.removeItem('registeredUser');
localStorage.removeItem('userData');
localStorage.removeItem('userProperties');
localStorage.removeItem('agentProjects');
```

### Start Fresh:
1. Clear localStorage (using above methods)
2. Refresh browser
3. Start testing from Test 1

---

## 🐛 Troubleshooting

### Issue: Not Redirecting After Login
**Solution:**
1. Check browser console for errors
2. Verify `registeredUser` exists: `console.log(localStorage.getItem('registeredUser'))`
3. Clear localStorage and re-register
4. Make sure you're using latest version of files

### Issue: Dashboard Shows "Access Denied"
**Solution:**
1. Check user type: `JSON.parse(localStorage.getItem('registeredUser')).userType`
2. Should match the dashboard you're accessing
3. If wrong, register again with correct type

### Issue: Properties/Projects Not Saving
**Solution:**
1. Check localStorage is enabled in browser
2. Verify data structure: `console.log(localStorage.getItem('userProperties'))`
3. Check browser console for errors during save
4. Try in incognito mode to test fresh

### Issue: Statistics Not Updating
**Solution:**
1. Refresh the dashboard page
2. Clear browser cache
3. Check if data is in localStorage
4. Verify JavaScript files loaded correctly (check Network tab)

---

## ✅ Test Checklist

Use this checklist to ensure everything works:

### Registration & Login
- [ ] Can register as buyer
- [ ] Can register as seller
- [ ] Can register as agent
- [ ] Can register as both
- [ ] Password validation works
- [ ] Duplicate email prevented
- [ ] Remember me functionality works

### Buyer Experience
- [ ] Redirects to browse page
- [ ] Can view properties
- [ ] Can add to wishlist
- [ ] Profile button works
- [ ] Cannot access seller dashboard
- [ ] Cannot access agent dashboard

### Seller Experience
- [ ] Redirects to seller dashboard
- [ ] Dashboard shows statistics
- [ ] Can post properties
- [ ] Can edit properties
- [ ] Can delete properties
- [ ] Filter by status works
- [ ] Statistics update correctly

### Agent Experience
- [ ] Redirects to agent dashboard
- [ ] Shows upcoming projects
- [ ] Displays budgets and requirements
- [ ] Can add client projects
- [ ] Can edit projects
- [ ] Can delete projects
- [ ] Filter by type works
- [ ] Commission calculates correctly

### Navigation
- [ ] Profile button redirects based on role
- [ ] My Properties button works correctly
- [ ] Post Property accessible to sellers
- [ ] Logout works properly

### Security
- [ ] Wrong password rejected
- [ ] Correct password accepted
- [ ] Role-based access enforced
- [ ] Unauthorized redirects work

---

## 📊 Test Results Template

After testing, fill this out:

```
Test Date: __________
Browser: __________
OS: __________

Buyer Test: PASS / FAIL
Notes: _______________________

Seller Test: PASS / FAIL
Notes: _______________________

Agent Test: PASS / FAIL
Notes: _______________________

Hybrid Test: PASS / FAIL
Notes: _______________________

Security Test: PASS / FAIL
Notes: _______________________

Overall Status: PASS / FAIL
Issues Found: _______________________
```

---

## 🚀 Ready to Deploy?

Once all tests pass:
1. ✅ All three dashboards working
2. ✅ Authentication validates correctly
3. ✅ Role-based redirects functioning
4. ✅ No console errors
5. ✅ Data persists correctly

**Next Steps:**
- Commit all changes to Git
- Push to GitHub repository
- Enable GitHub Pages or deploy to Netlify
- Share the live URL!

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Review ROLE_BASED_SYSTEM.md documentation
3. Use debug tools in console
4. Clear localStorage and retry

Happy Testing! 🎉
