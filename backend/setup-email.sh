#!/bin/bash

echo "================================================"
echo "  AcreDreams Email Configuration Setup"
echo "================================================"
echo ""
echo "This script will help you configure email for your Real Estate app."
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << EOL
# Email Configuration
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password-here
PORT=3000
EOL
fi

echo "Current configuration:"
cat .env
echo ""
echo "================================================"
echo ""
echo "📧 EMAIL SETUP INSTRUCTIONS:"
echo ""
echo "Choose your email provider:"
echo ""
echo "1️⃣  GMAIL (Recommended for personal use)"
echo "   - Go to: https://myaccount.google.com/apppasswords"
echo "   - Create App Password"
echo "   - Use: your-email@gmail.com and 16-char app password"
echo "   - Update server.js: change service to 'gmail'"
echo ""
echo "2️⃣  OUTLOOK/HOTMAIL (Easiest - no app password needed!)"
echo "   - Just use your regular email and password"
echo "   - Use: your-email@outlook.com or @hotmail.com"
echo "   - Server.js already configured for Outlook"
echo ""
echo "================================================"
echo ""
echo "📝 TO CONFIGURE:"
echo "1. Edit the .env file that just opened in TextEdit"
echo "2. Replace 'your-email@outlook.com' with YOUR email"
echo "3. Replace 'your-password-here' with YOUR password"
echo "4. Save and close the file"
echo ""
echo "🚀 TO START THE SERVER:"
echo "   npm start"
echo ""
echo "🧪 TO TEST:"
echo "   curl -X POST http://localhost:3000/api/test-email"
echo ""
echo "================================================"
