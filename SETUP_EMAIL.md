# 📧 How to Receive Emails After Sign Up

## Current Status
✅ Frontend is ready and configured
❌ Backend server needs to be set up

## Quick Start (5 minutes)

### Step 1: Navigate to Backend Folder
```bash
cd "/Users/mahesharunaladi/Downloads/Real estate/Real-Estate/Real-Estate/backend"
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Gmail App Password

1. **Go to Google Account Settings:**
   - Visit: https://myaccount.google.com/apppasswords
   - Sign in with your Gmail account

2. **Generate App Password:**
   - Select "App": **Mail**
   - Select "Device": **Mac** (or your device)
   - Click **Generate**
   - Copy the 16-character password (example: `abcd efgh ijkl mnop`)

3. **Create .env file:**
```bash
cp .env.example .env
```

4. **Edit .env file:**
```bash
nano .env
```

Add your credentials:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
PORT=3000
```

Save: `Ctrl + O`, then `Enter`, then `Ctrl + X`

### Step 4: Start the Backend Server
```bash
npm start
```

You should see:
```
🚀 Server is running on http://localhost:3000
📧 Email service configured for: your-email@gmail.com
```

### Step 5: Test Email (Optional)
Open a new terminal and run:
```bash
curl -X POST http://localhost:3000/api/test-email
```

You should receive a test email in your inbox!

### Step 6: Test Sign Up
1. Open your website: `file:///.../index.html`
2. Go to Register page
3. Fill in the form and submit
4. Check your email inbox (and spam folder)

## ✅ You're Done!

Now whenever someone registers on your website:
- They will receive a professional welcome email
- Email includes their account details
- Styled with your AcreDreams branding

## Troubleshooting

### Not receiving emails?
1. Check spam/junk folder
2. Verify .env file has correct credentials
3. Check backend server is running (no errors in terminal)
4. Try sending a test email first

### "Invalid login" error?
- Make sure you're using an **App Password**, not your regular Gmail password
- The password should be 16 characters with no spaces

### "Connection refused" error?
- Make sure backend server is running
- Check that port 3000 is not being used by another application

### CORS error in browser?
- Backend is already configured with CORS
- Make sure both frontend and backend are running

## Alternative: Use SendGrid (Production Ready)

For production, I recommend SendGrid:

1. Sign up at https://sendgrid.com (100 emails/day free)
2. Get API key
3. Update backend/server.js:

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/api/send-email', async (req, res) => {
    const { to, subject, html } = req.body;
    
    const msg = {
        to: to,
        from: 'noreply@acredreams.com',
        subject: subject,
        html: html,
    };
    
    try {
        await sgMail.send(msg);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});
```

4. Install: `npm install @sendgrid/mail`
5. Add to .env: `SENDGRID_API_KEY=your-key-here`

## Need Help?

Check these files for more details:
- `backend/README.md` - Full backend documentation
- `EMAIL_INTEGRATION.md` - Complete email integration guide

---

Happy coding! 🚀
