#!/bin/bash

echo "🧪 Testing Email Configuration..."
echo ""

# Check if server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Backend server is not running!"
    echo ""
    echo "Start it with:"
    echo "  cd backend"
    echo "  npm start"
    exit 1
fi

echo "✅ Server is running!"
echo ""
echo "Sending test email..."
echo ""

# Send test email
response=$(curl -s -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -w "\n%{http_code}")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" = "200" ]; then
    echo "✅ SUCCESS! Test email sent!"
    echo "$body" | python3 -m json.tool 2>/dev/null || echo "$body"
    echo ""
    echo "📬 Check your email inbox (and spam folder)!"
else
    echo "❌ FAILED! Error sending email"
    echo "$body"
    echo ""
    echo "Common issues:"
    echo "  1. Check if .env has real email credentials (not placeholder text)"
    echo "  2. Check if email password is correct"
    echo "  3. For Gmail: Use App Password, not regular password"
    echo "  4. Check server console for detailed error messages"
fi
