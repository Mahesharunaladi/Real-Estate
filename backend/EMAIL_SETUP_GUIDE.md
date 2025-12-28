# Email Setup Guide for AcreDreams

## 🚀 Quick Setup (5 minutes)

Your emails are not being sent because you need to configure real email credentials in the `.env` file.

## Option 1: Using Gmail (Most Common)

### Step 1: Enable 2-Step Verification
1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification"

### Step 2: Create App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Other (Custom name)"
3. Name it "AcreDreams"
4. Click "Generate"
5. Copy the 16-character password (remove spaces)

### Step 3: Update .env file
```bash
# Open .env file
cd backend
open -e .env
```

Update with your credentials:
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
PORT=3000
```

### Step 4: Update server.js
Change line 16 in `backend/server.js`:
```javascript
service: 'gmail', // Change from 'outlook' to 'gmail'
```

## Option 2: Using Outlook/Hotmail (Easier - No App Password needed!)

### Step 1: Create/Use Outlook Account
- Go to https://outlook.live.com
- Sign up for free if you don't have one

### Step 2: Update .env file
```bash
cd backend
open -e .env
```

Update with your credentials:
```
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-regular-outlook-password
PORT=3000
```

### Step 3: Server.js is already configured for Outlook
No changes needed - it's already set to use 'outlook'

## Option 3: Using Other Email Providers

### Yahoo Mail
```javascript
// In server.js
service: 'yahoo'
```

### Custom SMTP
```javascript
// In server.js
host: 'smtp.your-provider.com',
port: 587,
secure: false,
```

## 🎯 After Configuration

### 1. Start the Backend Server
```bash
cd backend
npm install  # Only needed first time
npm start
```

You should see:
```
🚀 Server is running on http://localhost:3000
📧 Email service configured for: your-email@example.com
```

### 2. Test Email Functionality
Open a new terminal and run:
```bash
curl -X POST http://localhost:3000/api/test-email
```

### 3. Test Registration
1. Open `register.html` in browser
2. Fill in the registration form
3. Submit
4. Check your email inbox!

## 📧 Email Will Be Sent To

When a user registers, the welcome email will be sent to **the email they enter in the registration form**, not to your email.

## ⚠️ Troubleshooting

### "Invalid login: 535-5.7.8" (Gmail)
- You need to create an App Password (see Option 1)
- Regular Gmail password won't work

### "Connection timeout" or "ECONNREFUSED"
- Backend server is not running
- Start it with: `cd backend && npm start`

### "Everything up-to-date" but no email
- Check if .env has real credentials (not placeholder text)
- Check if backend server is running
- Check console for errors

### Email goes to Spam
- This is normal for development
- Check spam/junk folder
- In production, use professional email service (SendGrid, AWS SES)

## 🔒 Security Notes

1. **Never commit .env file to Git**
   - Already in .gitignore
   - Contains sensitive passwords

2. **For Production**
   - Use environment variables on your hosting platform
   - Consider using professional email services:
     - SendGrid (100 emails/day free)
     - AWS SES (62,000 emails/month free)
     - Mailgun (5,000 emails/month free)

## ✅ Quick Test

After setup, test with this curl command:
```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-test-email@example.com",
    "subject": "Test from AcreDreams",
    "html": "<h1>It works!</h1>"
  }'
```

## 📱 Contact

If you still have issues, check the server console for detailed error messages.
