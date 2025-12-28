# AcreDreams Real Estate - Deployment Guide

## 🚀 Live Hosting Options

Your Real Estate website can be hosted on multiple platforms. Choose the one that best fits your needs:

---

## Option 1: Netlify (Recommended for Static Sites) ⭐

### Why Netlify?
- ✅ **FREE** for static sites
- ✅ Automatic HTTPS/SSL
- ✅ Custom domain support
- ✅ Continuous deployment from GitHub
- ✅ Simple setup - literally 2 minutes!

### Deployment Steps:

1. **Go to Netlify**
   - Visit: https://app.netlify.com/signup
   - Sign up using your GitHub account (easiest)

2. **Import Your Project**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Select your repository: `Mahesharunaladi/Real-Estate`

3. **Configure Build Settings**
   - Build command: Leave empty (it's static HTML)
   - Publish directory: `Real-Estate` (or `.` if it asks)
   - Click "Deploy site"

4. **Wait for Deployment** (30-60 seconds)
   - Netlify will build and deploy your site
   - You'll get a URL like: `https://your-site-name.netlify.app`

5. **Optional: Custom Domain**
   - Go to "Domain settings"
   - Add your custom domain
   - Update DNS records as instructed

### Backend (Email) Setup:
For the email functionality (backend), you'll need to:

1. Go to Netlify dashboard → Your site → Functions
2. Enable Netlify Functions (or use external API service)
3. Add environment variables:
   - `EMAIL_USER` = your-email@outlook.com
   - `EMAIL_PASSWORD` = your-app-password

**Note:** For backend, consider using Netlify Functions or deploying backend separately on Render/Railway.

---

## Option 2: Vercel (Great for Full-Stack) 🔥

### Why Vercel?
- ✅ **FREE** for hobby projects
- ✅ Excellent performance
- ✅ Supports Node.js backend
- ✅ Automatic HTTPS
- ✅ GitHub integration

### Deployment Steps:

1. **Go to Vercel**
   - Visit: https://vercel.com/signup
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Import `Mahesharunaladi/Real-Estate`

3. **Configure**
   - Framework Preset: Other
   - Root Directory: `Real-Estate`
   - Build Command: (leave empty)
   - Output Directory: `.`

4. **Environment Variables**
   - Add `EMAIL_USER`
   - Add `EMAIL_PASSWORD`
   - Add `NODE_ENV=production`

5. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Get URL: `https://your-project.vercel.app`

---

## Option 3: GitHub Pages (100% Free Static) 📄

### Why GitHub Pages?
- ✅ Completely **FREE**
- ✅ Integrated with GitHub
- ✅ Custom domain support
- ✅ HTTPS enabled

### Deployment Steps:

1. **Enable GitHub Pages**
   - Go to your GitHub repository
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)` or `/Real-Estate`
   - Click Save

2. **Wait for Deployment** (2-3 minutes)
   - GitHub Actions will build your site
   - Check progress in "Actions" tab

3. **Access Your Site**
   - URL: `https://mahesharunaladi.github.io/Real-Estate/`
   - Or `https://mahesharunaladi.github.io/Real-Estate/Real-Estate/` depending on structure

4. **Custom Domain (Optional)**
   - Add CNAME file with your domain
   - Configure DNS settings

**Limitation:** GitHub Pages only supports static files (no backend/Node.js)
- Email functionality won't work unless you use external API

---

## Option 4: Render (Best for Backend) 🌐

### Why Render?
- ✅ **FREE** tier available
- ✅ Full Node.js support
- ✅ PostgreSQL database included
- ✅ Automatic HTTPS

### Deployment Steps:

1. **Deploy Static Site**
   - Go to: https://render.com/
   - Sign up with GitHub
   - New → Static Site
   - Connect repository: `Real-Estate`
   - Build Command: (empty)
   - Publish Directory: `Real-Estate`

2. **Deploy Backend (Web Service)**
   - New → Web Service
   - Root Directory: `Real-Estate/backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add Environment Variables:
     - `EMAIL_USER`
     - `EMAIL_PASSWORD`
     - `PORT=3000`

3. **Connect Frontend to Backend**
   - Update API URLs in your frontend code
   - Replace `http://localhost:3000` with your Render backend URL

---

## Option 5: Railway (Modern & Fast) 🚂

### Why Railway?
- ✅ Modern deployment platform
- ✅ Free $5 credit per month
- ✅ Simple GitHub integration
- ✅ Supports full-stack apps

### Deployment Steps:

1. **Go to Railway**
   - Visit: https://railway.app/
   - Sign up with GitHub

2. **New Project**
   - Click "New Project"
   - "Deploy from GitHub repo"
   - Select `Real-Estate`

3. **Configure**
   - Railway auto-detects Node.js
   - Add environment variables in dashboard
   - Deploy automatically

4. **Custom Domain**
   - Settings → Generate Domain
   - Or add your custom domain

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [x] ✅ All files committed to GitHub
- [ ] ⚠️ Update backend `.env` with real email credentials
- [ ] 📝 Update API endpoints if using separate backend
- [ ] 🔐 Add environment variables in hosting platform
- [ ] 🌐 Test all functionality after deployment
- [ ] 📱 Check mobile responsiveness
- [ ] 🔍 Test forms and email sending

---

## 🔧 Quick Fixes for Common Issues

### Issue: Email not sending
**Solution:** 
- Check environment variables are set correctly
- Use Outlook App Password, not regular password
- Test with backend/test-email.sh script

### Issue: Images not loading
**Solution:**
- Use relative paths: `./images/` not `/images/`
- Check image files are committed to GitHub

### Issue: Pages show 404
**Solution:**
- Add proper redirect rules (netlify.toml)
- Ensure all HTML files are in root or properly linked

### Issue: Backend not connecting
**Solution:**
- Update API URLs from localhost to production URL
- Enable CORS in backend
- Check backend is deployed and running

---

## 🎯 Recommended Setup

**For Full Functionality:**
1. **Frontend:** Deploy on Netlify or Vercel (FREE)
2. **Backend:** Deploy on Render or Railway (FREE tier)
3. **Database:** Use MongoDB Atlas (FREE tier) if needed later

**For Quick Static Site:**
1. **Frontend Only:** GitHub Pages (100% FREE)
2. **Email:** Use form services like Formspree or EmailJS

---

## 📞 Support

If you encounter any issues:
1. Check the deployment logs in your hosting platform
2. Verify environment variables are set
3. Test locally first: `npm start` in backend folder
4. Check browser console for JavaScript errors

---

## 🎉 Next Steps After Deployment

1. ✅ Test all pages and features
2. 📧 Verify email functionality works
3. 🔐 Set up custom domain (optional)
4. 📊 Add Google Analytics (optional)
5. 🚀 Share your live website!

---

**Your website is ready to go live! Choose a hosting platform above and follow the steps.** 🚀

**Need help?** Each platform has excellent documentation and support.
