# 🏠 AcreDreams Real Estate

> **Your trusted partner in finding the perfect property. We make real estate simple and accessible.**

A modern, full-featured real estate platform built with HTML5, CSS3, and Vanilla JavaScript. Browse properties, save favorites, manage your profile, and post listings - all with a beautiful, responsive interface.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://mahesharunaladi.github.io/Real-Estate/)
[![GitHub](https://img.shields.io/badge/github-repository-blue.svg)](https://github.com/Mahesharunaladi/Real-Estate)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 📸 Preview

![AcreDreams Footer](https://raw.githubusercontent.com/Mahesharunaladi/Real-Estate/main/screenshot-footer.png)

### ✨ Key Pages
- 🏡 **Home** - Hero section with property search
- 🔍 **Buy/Rent** - Advanced filtering and property cards
- ❤️ **Wishlist** - Save and manage favorite properties
- 👤 **Profile** - User dashboard with stats and settings
- ✍️ **Post Property** - List your property with detailed form

---

## 🌟 Features

### 🏘️ Property Listings
- **Buy Properties** - Browse residential and commercial properties for sale
- **Rent Properties** - Find rental apartments, houses, and commercial spaces
- **New Projects** - Explore upcoming real estate projects
- **Commercial Spaces** - Office spaces, retail shops, and warehouses
- **Plots & Land** - Residential and commercial plots

### 🔍 Advanced Filtering
- Location-based search (Hyderabad, Mumbai, Delhi, Bangalore, Chennai, Pune, Kolkata)
- Budget range filter
- BHK type selection (1-5 BHK)
- Property age filter
- Amenities filter (Parking, Gym, Swimming Pool, etc.)

### ❤️ Wishlist System
- Save favorite properties
- Quick access to saved items
- Share wishlist with others
- View total value of saved properties

### 👤 User Features
- User registration and login
- Email verification with welcome emails
- User profile management
- Edit personal information
- Upload profile picture
- Change password
- Manage posted properties
- Activity timeline
- Notification settings

### 📝 Post Property
- List properties for sale or rent
- Detailed property information form
- Image upload (up to 6 images)
- Auto-fill contact information
- Draft saving functionality

### 📧 Email Integration
- Welcome emails for new users
- Property inquiry notifications
- Email verification system
- Newsletter subscription

---

## 🚀 Live Demo

**Visit the live site:** [https://mahesharunaladi.github.io/Real-Estate/](https://mahesharunaladi.github.io/Real-Estate/)

### Quick Links:
- 🏡 [Homepage](https://mahesharunaladi.github.io/Real-Estate/Real-Estate/)
- 🔍 [Browse Properties](https://mahesharunaladi.github.io/Real-Estate/Real-Estate/buy.html)
- ❤️ [Wishlist](https://mahesharunaladi.github.io/Real-Estate/Real-Estate/wishlist.html)
- 👤 [User Profile](https://mahesharunaladi.github.io/Real-Estate/Real-Estate/profile.html)

---

## 💻 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Grid, Flexbox, Custom Properties, Animations
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Font Awesome 6.4.0** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.18.2** - Web framework
- **Nodemailer 6.9.7** - Email service
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Data Storage
- **localStorage** - User data, wishlist, posted properties
- **sessionStorage** - Temporary session data

### Architecture
- **Frontend:** Static HTML/CSS/JS (hosted on GitHub Pages)
- **Backend:** Node.js REST API (can be deployed separately)
- **Design Pattern:** Component-based structure
- **State Management:** Browser storage APIs

---

## 📁 Project Structure

```
Real-Estate/
├── 📄 index.html              # Landing page
├── 🏘️ Property Pages
│   ├── buy.html              # Properties for sale
│   ├── rent.html             # Properties for rent
│   ├── new-projects.html     # New developments
│   ├── commercial.html       # Commercial spaces
│   └── plots.html            # Land plots
├── 👤 User Pages
│   ├── login.html            # User login
│   ├── register.html         # User registration
│   ├── profile.html          # User dashboard
│   └── wishlist.html         # Saved properties
├── ✍️ post-property.html      # Property listing form
├── 🎨 Stylesheets
│   ├── styles.css            # Global styles
│   ├── properties.css        # Property listing styles
│   └── profile.css           # Profile page styles
├── 🔧 JavaScript
│   ├── properties.js         # Property filtering
│   ├── wishlist.js           # Wishlist manager
│   ├── profile.js            # Profile functionality
│   ├── nav-auth.js           # Navigation & auth
│   └── auth.js               # Login/register logic
├── 🚀 Deployment
│   ├── netlify.toml          # Netlify config
│   ├── vercel.json           # Vercel config
│   ├── DEPLOYMENT.md         # Deployment guide
│   ├── QUICKSTART.md         # Quick deploy guide
│   └── deploy.sh             # Deploy helper
└── 🖥️ Backend
    ├── server.js             # Express server
    ├── package.json          # Dependencies
    ├── .env                  # Environment vars
    └── 📚 Documentation
        ├── EMAIL_SETUP_GUIDE.md
        ├── FIX_EMAIL.md
        ├── setup-email.sh
        └── test-email.sh
```

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mahesharunaladi/Real-Estate.git
   cd Real-Estate/Real-Estate
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Edit backend/.env file
   EMAIL_USER=your-email@outlook.com
   EMAIL_PASSWORD=your-app-password
   PORT=3000
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```

5. **Open the frontend**
   - Open `index.html` in your browser
   - Or use Live Server extension in VS Code
   - Navigate to `http://localhost:5500` (if using Live Server)

6. **Test the application**
   - Create an account
   - Browse properties
   - Add items to wishlist
   - Post a property

---

## 🌐 Deployment

### 🚀 Easiest Way - GitHub Pages (2 Minutes)

Your site is **already live** at: [https://mahesharunaladi.github.io/Real-Estate/](https://mahesharunaladi.github.io/Real-Estate/)

To update or enable:
1. Go to [Repository Settings](https://github.com/Mahesharunaladi/Real-Estate/settings/pages)
2. Under **Source**, select **Branch: main**, **Folder: / (root)**
3. Click **Save**
4. Wait 2-3 minutes for deployment

### 🎯 Other Deployment Options

<details>
<summary><b>Netlify (Click to expand)</b></summary>

#### Via CLI:
```bash
npm install -g netlify-cli
netlify login
cd "/path/to/Real-Estate"
netlify deploy --prod
```

#### Via Web:
1. Visit [app.netlify.com](https://app.netlify.com/)
2. Click "Add new site" → "Import from Git"
3. Select your repository
4. Click "Deploy"

**Result:** `https://your-site.netlify.app`
</details>

<details>
<summary><b>Vercel (Click to expand)</b></summary>

#### Via CLI:
```bash
npm install -g vercel
vercel login
cd "/path/to/Real-Estate"
vercel --prod
```

#### Via Web:
1. Visit [vercel.com](https://vercel.com/)
2. Click "Add New Project"
3. Import your repository
4. Click "Deploy"

**Result:** `https://your-project.vercel.app`
</details>

<details>
<summary><b>Render (For Backend) (Click to expand)</b></summary>

1. Visit [render.com](https://render.com/)
2. Create **Static Site** for frontend
3. Create **Web Service** for backend
4. Connect repository
5. Set environment variables
6. Deploy

**Best for:** Full-stack deployment with backend
</details>

### 📚 Detailed Instructions

- **Quick Start:** See [QUICKSTART.md](QUICKSTART.md)
- **Complete Guide:** See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Interactive Helper:** Run `./deploy.sh`

---

## 📧 Email Configuration

The application includes email functionality for user registration and notifications.

### Quick Setup:

1. **Get Email Credentials**
   - For Outlook/Hotmail: Enable 2FA → Generate App Password
   - For Gmail: Enable 2FA → Create App-Specific Password

2. **Update Environment Variables**
   ```bash
   cd backend
   nano .env  # or open with any editor
   ```
   
   ```env
   EMAIL_USER=your-email@outlook.com
   EMAIL_PASSWORD=your-app-password
   PORT=3000
   ```

3. **Test Email**
   ```bash
   cd backend
   ./test-email.sh
   ```

### 📚 Detailed Guides:
- **Complete Setup:** [backend/EMAIL_SETUP_GUIDE.md](backend/EMAIL_SETUP_GUIDE.md)
- **Troubleshooting:** [backend/FIX_EMAIL.md](backend/FIX_EMAIL.md)
- **Setup Script:** `./backend/setup-email.sh`

---

## 📱 Responsive Design

Fully responsive design that works seamlessly across all devices:

| Device | Screen Size | Columns | Features |
|--------|-------------|---------|----------|
| 📱 **Mobile** | 320px - 767px | 1 column | Touch-optimized, hamburger menu |
| 📱 **Tablet** | 768px - 1023px | 2 columns | Adaptive grid, side navigation |
| 💻 **Desktop** | 1024px - 1439px | 3 columns | Full features, hover effects |
| 🖥️ **Large Screen** | 1440px+ | 4 columns | Maximum content, wide layout |

### Design Features:
- ✅ Mobile-first approach
- ✅ Touch-friendly buttons and controls
- ✅ Optimized images and lazy loading
- ✅ Smooth animations and transitions
- ✅ Accessible navigation
- ✅ Print-friendly styles

---

## 🎨 Features Overview

### For Users:
- 🔍 **Property Search** - Filter by location, price, BHK, amenities
- ❤️ **Wishlist** - Save and share favorite properties
- 👤 **Profile** - Manage account, view activity, change settings
- 🔔 **Notifications** - Get alerts for new properties and updates
- 📧 **Email Alerts** - Receive property updates via email

### For Property Owners:
- ✍️ **Post Property** - List properties with detailed information
- 📊 **Dashboard** - Track views, inquiries, and engagement
- 📸 **Image Upload** - Upload multiple property images
- ✏️ **Edit Listings** - Update property details anytime
- 📈 **Analytics** - View property performance metrics

### Technical Highlights:
- ⚡ **Fast Loading** - Optimized assets and lazy loading
- 🔒 **Secure** - Client-side encryption for sensitive data
- 💾 **Offline Support** - Works without internet (cached data)
- 🎯 **SEO Optimized** - Meta tags and semantic HTML
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 🌐 **Cross-browser** - Works on all modern browsers

---

## 🧪 Testing

### Manual Testing Checklist:
- [ ] User registration and login
- [ ] Property search and filtering
- [ ] Add/remove items from wishlist
- [ ] Post new property
- [ ] Edit profile information
- [ ] Upload profile picture
- [ ] Change password
- [ ] Responsive design on mobile
- [ ] Email notifications

### Browser Compatibility:
- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Opera (v76+)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
   ```bash
   git clone https://github.com/Mahesharunaladi/Real-Estate.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make your changes**
   - Write clean, commented code
   - Follow existing code style
   - Test thoroughly

4. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

5. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Link any related issues
   - Request review

### Development Guidelines:
- � Write clear commit messages
- 🧪 Test before pushing
- � Update documentation
- 🎨 Follow code style
- ✅ Check for errors

---

## � License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What this means:
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ℹ️ Attribution required

---

## 👨‍💻 Author

**Mahesh Arunaladi**

- 💼 GitHub: [@Mahesharunaladi](https://github.com/Mahesharunaladi)
- 📦 Repository: [Real-Estate](https://github.com/Mahesharunaladi/Real-Estate)
- 🌐 Live Site: [AcreDreams](https://mahesharunaladi.github.io/Real-Estate/)

---

## � Acknowledgments

Special thanks to:
- **Font Awesome** - For beautiful icons
- **Google Fonts** - For typography
- **Nodemailer** - For email functionality
- **GitHub Pages** - For free hosting
- **Open Source Community** - For inspiration and support

---

## 📞 Support & Contact

### Need Help?

1. **📖 Documentation**
   - [DEPLOYMENT.md](DEPLOYMENT.md) - Hosting setup
   - [QUICKSTART.md](QUICKSTART.md) - Quick deploy guide
   - [backend/EMAIL_SETUP_GUIDE.md](backend/EMAIL_SETUP_GUIDE.md) - Email config

2. **🐛 Issues**
   - [Report a Bug](https://github.com/Mahesharunaladi/Real-Estate/issues)
   - [Request a Feature](https://github.com/Mahesharunaladi/Real-Estate/issues)

3. **💬 Community**
   - Check existing issues
   - Ask questions
   - Share feedback

### Common Issues:

<details>
<summary><b>Email not sending</b></summary>

- Check `.env` credentials
- Use app password (not regular password)
- Test with `./backend/test-email.sh`
- See [FIX_EMAIL.md](backend/FIX_EMAIL.md)
</details>

<details>
<summary><b>Properties not loading</b></summary>

- Clear browser cache
- Check JavaScript console for errors
- Verify all files are uploaded
- Check localStorage isn't full
</details>

<details>
<summary><b>Login not working</b></summary>

- Clear browser storage
- Check localStorage
- Verify auth.js is loaded
- Disable browser extensions
</details>

---

## 🗺️ Roadmap

### Upcoming Features:
- [ ] 🗺️ Map view for properties
- [ ] 💬 Real-time chat between users
- [ ] ⭐ Property ratings and reviews
- [ ] 🔔 Push notifications
- [ ] 🌐 Multi-language support
- [ ] 💳 Payment gateway integration
- [ ] 🎥 Virtual property tours
- [ ] 📱 Native mobile apps (iOS/Android)
- [ ] 🤖 AI-powered property recommendations
- [ ] 📊 Advanced analytics dashboard

### In Progress:
- 🔄 Backend API optimization
- 🔄 Database integration
- 🔄 Advanced search with filters

---

## 📊 Project Status

| Component | Status | Notes |
|-----------|--------|-------|
| Frontend | ✅ Complete | Fully functional |
| Backend | ✅ Ready | Needs credentials |
| Authentication | ✅ Working | localStorage-based |
| Profile System | ✅ Complete | Full CRUD operations |
| Wishlist | ✅ Functional | Persistent storage |
| Property Posting | ✅ Ready | Form validation included |
| Email Service | ⚠️ Configured | Needs real credentials |
| Deployment | ✅ Live | Hosted on GitHub Pages |
| Documentation | ✅ Complete | Comprehensive guides |

### Version: 1.0.0
### Last Updated: December 28, 2025

---

## 📈 Statistics

- **Total Lines of Code:** ~5,000+
- **Files:** 30+
- **Pages:** 12
- **JavaScript Modules:** 7
- **Stylesheets:** 3
- **Documentation Files:** 6

---

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐ star on GitHub!

[![Star History Chart](https://api.star-history.com/svg?repos=Mahesharunaladi/Real-Estate&type=Date)](https://github.com/Mahesharunaladi/Real-Estate)

---

## 💝 Support the Project

If you like this project:
- ⭐ Star the repository
- 🍴 Fork and contribute
- 📢 Share with others
- 🐛 Report bugs
- 💡 Suggest features

---

<div align="center">

### Made with ❤️ for Real Estate Enthusiasts

**AcreDreams** - *Your trusted partner in finding the perfect property*

[🏠 Live Demo](https://mahesharunaladi.github.io/Real-Estate/) • [📖 Documentation](DEPLOYMENT.md) • [🐛 Report Bug](https://github.com/Mahesharunaladi/Real-Estate/issues) • [✨ Request Feature](https://github.com/Mahesharunaladi/Real-Estate/issues)

---

© 2025 AcreDreams. All rights reserved.

</div>
