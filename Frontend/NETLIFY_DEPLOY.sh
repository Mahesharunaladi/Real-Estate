#!/bin/bash

echo "🚀 Deploying to Netlify..."
echo ""
echo "Step 1: Install Netlify CLI"
npm install -g netlify-cli

echo ""
echo "Step 2: Login to Netlify (browser will open)"
netlify login

echo ""
echo "Step 3: Deploy your site"
netlify deploy --prod

echo ""
echo "✅ Done! Your site is now live on Netlify!"
