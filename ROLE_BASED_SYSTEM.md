# Role-Based Dashboard System

## Overview
The Real Estate website now features a complete role-based user experience with separate dashboards for different user types. Each user type has a tailored interface with specific functionality relevant to their needs.

## User Types

### 1. Property Buyer (buyer)
**Default Landing:** `index.html` (Browse properties page)

**Features:**
- Browse properties (buy/rent)
- Search and filter properties
- Add properties to wishlist
- View property details
- Contact property owners
- Save searches
- View profile and saved properties

**Access:**
- Can browse all properties
- Can save favorites
- View contact information
- No posting capabilities

---

### 2. Property Seller (seller)
**Default Landing:** `seller-dashboard.html`

**Features:**
- Dashboard with statistics:
  - Active listings count
  - Total views on properties
  - Inquiry count
  - Total property value
- Manage property listings:
  - View all posted properties
  - Edit property details
  - Delete listings
  - Filter by status (active, pending, sold)
- Quick actions:
  - Post new property
  - View analytics
  - Check inquiries
  - Account settings
- Property management:
  - Update property information
  - Change property status
  - View property performance

**Access:**
- Full access to post-property.html
- Can manage their own listings
- View buyer inquiries
- Analytics on property views

---

### 3. Real Estate Agent (agent)
**Default Landing:** `agent-dashboard.html`

**Features:**
- Dashboard with statistics:
  - Active projects count
  - New leads count
  - Total clients
  - Estimated commission
- Client Projects Management:
  - View all client projects
  - Add new client projects
  - Edit project details
  - Delete projects
  - Filter by type (residential, commercial, land)
  - Filter by status (planning, in-progress, completed)
- Upcoming Projects Section:
  - View projects from different clients
  - See client requirements
  - Budget information
  - Location preferences
  - Property type and specifications
- Project Details:
  - Client name and contact
  - Project type (Residential/Commercial/Land)
  - Budget and timeline
  - Specific requirements
  - Current status
- Commission Tracking:
  - Auto-calculate estimated commission (2%)
  - Track project values
  - Monitor deal closure

**Access:**
- View all upcoming projects from clients
- Manage client relationships
- Track leads and conversions
- Commission calculations
- Project planning tools

---

### 4. Hybrid User (both)
**Default Landing:** `seller-dashboard.html`

**Features:**
- All seller features
- Can also browse as a buyer
- Dual access to both functionalities

---

## Authentication Flow

### Registration
1. User registers on `register.html`
2. Selects user type: buyer, seller, agent, or both
3. Account created with role-specific permissions
4. Password securely stored in localStorage

### Login
1. User logs in on `login.html`
2. System validates email and password
3. **Role-based redirect:**
   - **Buyer** → `index.html` (browse properties)
   - **Seller or Both** → `seller-dashboard.html`
   - **Agent** → `agent-dashboard.html`
4. User session maintained with localStorage/sessionStorage

### Navigation
- **Profile/Dashboard Button:**
  - Buyers → `profile.html`
  - Sellers → `seller-dashboard.html`
  - Agents → `agent-dashboard.html`
- **My Properties Button:**
  - Buyers → `profile.html` (properties tab)
  - Sellers → `seller-dashboard.html` (property management)

---

## File Structure

### Dashboard Files
```
Real-Estate/
├── index.html                  # Buyer landing page
├── seller-dashboard.html       # Seller dashboard
├── seller-dashboard.js         # Seller functionality
├── agent-dashboard.html        # Agent dashboard
├── agent-dashboard.js          # Agent functionality
├── auth.js                     # Authentication with role-based redirect
├── nav-auth.js                 # Navigation with role-based routing
└── profile.html               # Buyer profile page
```

### Key JavaScript Files
- **auth.js:** Handles login/register with role-based redirects
- **seller-dashboard.js:** Property management for sellers
- **agent-dashboard.js:** Project and client management for agents
- **nav-auth.js:** Navigation updates based on user role

---

## Data Storage (localStorage)

### User Data
```javascript
// Registered user info with role
{
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  userType: "seller|buyer|agent|both",
  phone: "1234567890"
}
```

### Seller Data
```javascript
// User's posted properties
userProperties: [
  {
    id: "timestamp",
    title: "Property Title",
    price: "5000000",
    type: "Villa",
    status: "active",
    location: "Gachibowli",
    area: "2500",
    bedrooms: "3",
    bathrooms: "3"
  }
]
```

### Agent Data
```javascript
// Agent's client projects
agentProjects: [
  {
    id: "timestamp",
    clientName: "Client Name",
    type: "Residential",
    budget: "8000000",
    location: "Hyderabad",
    requirements: "3 BHK with parking",
    status: "planning",
    timeline: "6 months"
  }
]
```

---

## Security Features

### Password Validation
- Passwords stored per user: `userPassword_[email]`
- Login validates both email and password
- No plain text password display
- Duplicate email prevention

### Role Validation
- Each dashboard checks user role on load
- Unauthorized access redirects to appropriate page
- Role-specific functionality restrictions

### Session Management
- Remember me: localStorage (persistent)
- Without remember: sessionStorage (session only)
- Auto-logout on session expiry

---

## Testing the System

### Test as Buyer
1. Register with user type "buyer"
2. Login → Should redirect to `index.html`
3. Browse properties, add to wishlist
4. Click profile → Goes to `profile.html`

### Test as Seller
1. Register with user type "seller"
2. Login → Should redirect to `seller-dashboard.html`
3. View dashboard statistics
4. Post a property
5. Manage listings (edit, delete, filter)

### Test as Agent
1. Register with user type "agent"
2. Login → Should redirect to `agent-dashboard.html`
3. View upcoming projects from clients
4. Add a client project
5. View commission calculations
6. Filter projects by type/status

### Test as Hybrid (both)
1. Register with user type "both"
2. Login → Should redirect to `seller-dashboard.html`
3. Can access both seller and buyer features
4. Switch between browsing and managing

---

## Customization

### Adding New Roles
1. Update registration form options in `register.html`
2. Create new dashboard HTML file
3. Add corresponding JavaScript file
4. Update redirect logic in `auth.js`
5. Update navigation in `nav-auth.js`

### Modifying Dashboards
- **Seller Dashboard:** Edit `seller-dashboard.html` and `seller-dashboard.js`
- **Agent Dashboard:** Edit `agent-dashboard.html` and `agent-dashboard.js`
- **Buyer Experience:** Edit `index.html`, `buy.html`, `rent.html`, `profile.html`

### Styling
- Common styles: `styles.css`
- Property cards: `properties.css`
- Profile/Dashboard: `profile.css`
- Add custom CSS in respective dashboard files

---

## Future Enhancements

### Suggested Features
1. **Buyer Dashboard:** Dedicated dashboard with:
   - Saved searches
   - Recommended properties
   - Recent views
   - Scheduled viewings
   - Inquiry tracking

2. **Admin Panel:** Super user role for:
   - User management
   - Property moderation
   - Analytics across all users
   - System settings

3. **Messaging System:**
   - In-app messaging between buyers and sellers
   - Agent-client communication
   - Notification system

4. **Advanced Analytics:**
   - Property performance graphs
   - Market trends
   - Lead conversion tracking
   - Revenue forecasting

5. **Mobile App Integration:**
   - API endpoints for mobile apps
   - Push notifications
   - Location-based services

---

## Troubleshooting

### User Not Redirecting Correctly
- Check `registeredUser` in localStorage
- Verify `userType` field is set correctly
- Clear browser cache and localStorage
- Re-register with correct user type

### Dashboard Not Loading
- Check browser console for errors
- Verify all CSS/JS files are linked
- Ensure user is logged in
- Check authentication in dashboard JS files

### Role Validation Issues
- Review authentication check in dashboard files
- Ensure `registeredUser` exists in localStorage
- Verify userType matches expected values

### Data Not Persisting
- Check localStorage is enabled in browser
- Verify data structure matches expected format
- Clear old data and re-test
- Check for localStorage quota limits

---

## Support & Maintenance

### Debug Tools
Available in browser console:
```javascript
// Check stored credentials
checkStoredCredentials();

// Clear test accounts
clearTestAccounts();

// View current user
console.log(localStorage.getItem('registeredUser'));

// View user properties
console.log(localStorage.getItem('userProperties'));

// View agent projects
console.log(localStorage.getItem('agentProjects'));
```

### Updates & Versioning
- Version: 2.0.0 (Role-Based System)
- Last Updated: 2024
- Compatibility: Modern browsers (Chrome, Firefox, Safari, Edge)

---

## Conclusion

The role-based dashboard system provides a professional, scalable solution for different user types in the real estate platform. Each role has a tailored experience that matches their specific needs and workflows, creating a more efficient and user-friendly application.

For questions or contributions, please refer to the main README.md file.
