# AcreDreams Real Estate

🏠 A modern, full-featured real estate website for buying, renting, and selling properties.

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
- Email verification
- Newsletter subscription

## 🚀 Live Demo

Visit the live site: **[Deploy using instructions in DEPLOYMENT.md]**

## 💻 Tech Stack

### Frontend
- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Font Awesome 6.4.0

### Backend
- Node.js
- Express.js 4.18.2
- Nodemailer 6.9.7
- CORS
- dotenv

### Storage
- localStorage for user data and wishlist
- sessionStorage for temporary data

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

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

## 🌐 Deployment

### Quick Deploy Options

1. **Netlify (Recommended)**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

2. **Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

3. **GitHub Pages**
   - Go to repository Settings → Pages
   - Select branch: main
   - Click Save

4. **Using deployment script**
   ```bash
   ./deploy.sh
   ```

**For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)**

## 📧 Email Setup

For detailed email configuration, see `backend/EMAIL_SETUP_GUIDE.md`

Quick setup:
1. Enable 2-factor authentication on Outlook/Gmail
2. Generate app password
3. Add credentials to `backend/.env`
4. Test with `./backend/test-email.sh`

## 📱 Responsive Design

The website is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 👨‍💻 Author

**Mahesh Arunaladi**
- GitHub: [@Mahesharunaladi](https://github.com/Mahesharunaladi)
- Repository: [Real-Estate](https://github.com/Mahesharunaladi/Real-Estate)

## 📞 Support

If you have any questions:
- Open an issue on GitHub
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for hosting help
- Review [backend/EMAIL_SETUP_GUIDE.md](backend/EMAIL_SETUP_GUIDE.md) for email issues

## 📊 Status

- ✅ Frontend complete
- ✅ Backend setup complete
- ✅ User authentication working
- ✅ Profile management complete
- ✅ Wishlist system functional
- 🚀 Ready for deployment

---

**Made with ❤️ for real estate enthusiasts**
