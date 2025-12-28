#!/bin/bash

# AcreDreams Real Estate - Quick Deployment Script
# This script helps you choose and deploy to your preferred hosting platform

echo "🏠 AcreDreams Real Estate - Deployment Helper"
echo "=============================================="
echo ""
echo "Choose your hosting platform:"
echo ""
echo "1) Netlify (Recommended - Easy & Free)"
echo "2) Vercel (Great for Full-Stack)"
echo "3) GitHub Pages (100% Free Static)"
echo "4) Render (Best for Backend)"
echo "5) Railway (Modern & Fast)"
echo "6) Show deployment status"
echo "7) Exit"
echo ""

read -p "Enter your choice (1-7): " choice

case $choice in
  1)
    echo ""
    echo "📦 Preparing for Netlify deployment..."
    echo ""
    echo "✅ netlify.toml configuration file is ready"
    echo ""
    echo "Next steps:"
    echo "1. Install Netlify CLI: npm install -g netlify-cli"
    echo "2. Login to Netlify: netlify login"
    echo "3. Deploy: netlify deploy --prod"
    echo ""
    echo "Or deploy via web:"
    echo "👉 https://app.netlify.com/start"
    echo ""
    read -p "Install Netlify CLI now? (y/n): " install
    if [ "$install" = "y" ]; then
      npm install -g netlify-cli
      echo ""
      echo "✅ Netlify CLI installed!"
      echo "Run: netlify login"
    fi
    ;;

  2)
    echo ""
    echo "📦 Preparing for Vercel deployment..."
    echo ""
    echo "✅ vercel.json configuration file is ready"
    echo ""
    echo "Next steps:"
    echo "1. Install Vercel CLI: npm install -g vercel"
    echo "2. Login to Vercel: vercel login"
    echo "3. Deploy: vercel --prod"
    echo ""
    echo "Or deploy via web:"
    echo "👉 https://vercel.com/new"
    echo ""
    read -p "Install Vercel CLI now? (y/n): " install
    if [ "$install" = "y" ]; then
      npm install -g vercel
      echo ""
      echo "✅ Vercel CLI installed!"
      echo "Run: vercel login"
    fi
    ;;

  3)
    echo ""
    echo "📦 Preparing for GitHub Pages deployment..."
    echo ""
    echo "Your repository: Mahesharunaladi/Real-Estate"
    echo ""
    echo "Steps to deploy:"
    echo "1. Go to: https://github.com/Mahesharunaladi/Real-Estate/settings/pages"
    echo "2. Under 'Source', select branch: main"
    echo "3. Select folder: / (root)"
    echo "4. Click 'Save'"
    echo "5. Wait 2-3 minutes for deployment"
    echo ""
    echo "Your site will be available at:"
    echo "👉 https://mahesharunaladi.github.io/Real-Estate/"
    echo ""
    echo "Note: GitHub Pages only supports static files (no backend)"
    ;;

  4)
    echo ""
    echo "📦 Preparing for Render deployment..."
    echo ""
    echo "Steps to deploy:"
    echo "1. Go to: https://render.com/"
    echo "2. Sign up/Login with GitHub"
    echo "3. Click 'New +' → 'Static Site'"
    echo "4. Connect repository: Mahesharunaladi/Real-Estate"
    echo "5. Configure:"
    echo "   - Build Command: (leave empty)"
    echo "   - Publish Directory: Real-Estate"
    echo "6. Click 'Create Static Site'"
    echo ""
    echo "For backend (optional):"
    echo "7. Click 'New +' → 'Web Service'"
    echo "8. Root Directory: Real-Estate/backend"
    echo "9. Build Command: npm install"
    echo "10. Start Command: npm start"
    echo "11. Add environment variables"
    ;;

  5)
    echo ""
    echo "📦 Preparing for Railway deployment..."
    echo ""
    echo "Steps to deploy:"
    echo "1. Go to: https://railway.app/"
    echo "2. Sign up/Login with GitHub"
    echo "3. Click 'New Project'"
    echo "4. Select 'Deploy from GitHub repo'"
    echo "5. Choose: Mahesharunaladi/Real-Estate"
    echo "6. Railway will auto-configure"
    echo "7. Add environment variables in dashboard"
    echo "8. Deploy automatically starts"
    echo ""
    echo "👉 https://railway.app/new"
    ;;

  6)
    echo ""
    echo "📊 Checking deployment status..."
    echo ""
    
    # Check if site is on GitHub Pages
    echo "Checking GitHub Pages..."
    curl -s -o /dev/null -w "GitHub Pages: %{http_code}\n" https://mahesharunaladi.github.io/Real-Estate/
    
    echo ""
    echo "To check other platforms, visit their dashboards:"
    echo "- Netlify: https://app.netlify.com/"
    echo "- Vercel: https://vercel.com/dashboard"
    echo "- Render: https://dashboard.render.com/"
    echo "- Railway: https://railway.app/dashboard"
    ;;

  7)
    echo ""
    echo "👋 Goodbye! Your site is ready to deploy."
    echo "Check DEPLOYMENT.md for detailed instructions."
    exit 0
    ;;

  *)
    echo ""
    echo "❌ Invalid choice. Please run the script again."
    exit 1
    ;;
esac

echo ""
echo "================================================"
echo "📚 For detailed instructions, see DEPLOYMENT.md"
echo "================================================"
echo ""
echo "Need help? Check the documentation or platform support."
echo ""
