# 📧 Email Not Working? - QUICK FIX GUIDE

## ⚠️ THE PROBLEM

Your `.env` file has **placeholder credentials**, not real ones:
```
EMAIL_USER=your-email@outlook.com  ❌ This is NOT a real email!
EMAIL_PASSWORD=your-regular-password  ❌ This is NOT a real password!
```

## ✅ THE SOLUTION (3 Steps)

### Step 1: Open the .env file
```bash
cd backend
open -e .env
```

### Step 2: Replace with YOUR real email

**Using Outlook/Hotmail (EASIEST):**
```env
EMAIL_USER=mahesharunaladi@outlook.com
EMAIL_PASSWORD=YourActualPassword123
PORT=3000
```

**Using Gmail:**
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
PORT=3000
```

⚠️ **For Gmail**: You MUST use an App Password, not your regular password!
- Go to: https://myaccount.google.com/apppasswords
- Generate App Password
- Copy the 16-character code

### Step 3: Start the server
```bash
npm install  # First time only
npm start
```

You should see:
```
🚀 Server is running on http://localhost:3000
📧 Email service configured for: your-email@example.com
```

## 🧪 TEST IT

Open a NEW terminal and run:
```bash
cd backend
./test-email.sh
```

Or manually:
```bash
curl -X POST http://localhost:3000/api/test-email
```

## ✅ If Working

You'll see:
```json
{
  "message": "Test email sent successfully",
  "messageId": "..."
}
```

And receive an email! (Check spam folder if not in inbox)

## ❌ If NOT Working

### Error: "Invalid login: 535-5.7.8"
- **Gmail users**: You're using regular password instead of App Password
- **Solution**: Create App Password at https://myaccount.google.com/apppasswords

### Error: "ECONNREFUSED" or "Connection refused"
- **Problem**: Backend server is not running
- **Solution**: Run `npm start` in backend folder

### Error: "Invalid email/password"
- **Problem**: Wrong credentials in .env
- **Solution**: Double-check your email and password in .env file

### No error but no email received
- **Check**: Spam/Junk folder
- **Check**: Email address is correct in .env
- **Check**: Server console for error messages

## 📝 IMPORTANT NOTES

1. **Gmail requires App Password** - Regular password won't work!
2. **Outlook/Hotmail** - Regular password works fine
3. **Check spam folder** - First emails often go to spam
4. **Server must be running** - Keep it running in one terminal
5. **Never commit .env** - Contains sensitive passwords (already in .gitignore)

## 🎯 After Setup Works

1. Go to `register.html` in browser
2. Fill in registration form with a test email
3. Submit
4. Check that email's inbox for welcome message!

## 🆘 Still Having Issues?

1. Check server console for detailed error messages
2. Verify .env file has real credentials (not placeholder text)
3. Make sure backend server is running
4. Try the test script: `./test-email.sh`

## 📚 More Info

See `EMAIL_SETUP_GUIDE.md` for detailed instructions and troubleshooting.
