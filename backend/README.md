# AcreDreams Backend API

Backend server for handling email notifications and API requests.

## Quick Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Email Settings

**Option A: Using Gmail (Easiest for testing)**

1. Create a `.env` file in the backend folder:
```bash
cp .env.example .env
```

2. Get Gmail App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Sign in to your Google account
   - Select "Mail" and your device
   - Click "Generate"
   - Copy the 16-character password

3. Update `.env` file:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
PORT=3000
```

**Option B: Using Other Email Services**

For Outlook:
```javascript
service: 'outlook'
```

For Yahoo:
```javascript
service: 'yahoo'
```

For custom SMTP:
```javascript
host: 'smtp.example.com',
port: 587,
secure: false
```

### 3. Start the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start at: `http://localhost:3000`

### 4. Test Email Setup

Send a test email to yourself:
```bash
curl -X POST http://localhost:3000/api/test-email
```

Or visit in browser: `http://localhost:3000`

## API Endpoints

### POST /api/send-email
Send an email.

**Request Body:**
```json
{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "html": "<h1>Email Content</h1>"
}
```

**Response:**
```json
{
  "message": "Email sent successfully",
  "messageId": "<message-id>"
}
```

### POST /api/test-email
Send a test email to the configured email address.

**Response:**
```json
{
  "message": "Test email sent successfully",
  "messageId": "<message-id>"
}
```

## Frontend Integration

The frontend `auth.js` file will automatically connect to this backend when you uncomment the API call section.

Update the API URL in `auth.js`:
```javascript
const response = await fetch('http://localhost:3000/api/send-email', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData)
});
```

## Troubleshooting

### "Invalid login" error
- Make sure you're using an App Password, not your regular password
- Enable "Less secure app access" in Gmail settings (not recommended)
- Try a different email service

### "Connection timeout" error
- Check your internet connection
- Verify firewall settings
- Try a different SMTP port (465 or 587)

### CORS errors
- The server is configured with CORS enabled
- Make sure the server is running
- Check browser console for specific errors

## Security Notes

⚠️ **Important:**
- Never commit the `.env` file to Git
- Keep your email credentials secret
- Use environment variables in production
- Consider using a dedicated email service like SendGrid for production

## Production Deployment

For production, consider using:
- **SendGrid** (100 emails/day free)
- **AWS SES** (62,000 emails/month free)
- **Mailgun** (5,000 emails/month free)

See `EMAIL_INTEGRATION.md` for more details.

## Support

If you encounter issues:
1. Check the server console for error messages
2. Verify your `.env` configuration
3. Test with the `/api/test-email` endpoint first
4. Check the email spam folder
