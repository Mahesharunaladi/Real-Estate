# Email Integration Guide for AcreDreams

This guide explains how to set up email functionality for user registration.

## Current Implementation

The frontend is ready to send welcome emails. Currently, it logs the email data to the console for demonstration purposes.

## Backend Integration Options

### Option 1: Node.js with Nodemailer (Recommended for beginners)

```javascript
// server.js or api/send-email.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // or 'outlook', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER, // your-email@gmail.com
        pass: process.env.EMAIL_PASSWORD // your app password
    }
});

// Email sending endpoint
router.post('/api/send-email', async (req, res) => {
    const { to, subject, html } = req.body;
    
    try {
        await transporter.sendMail({
            from: '"AcreDreams" <noreply@acredreams.com>',
            to: to,
            subject: subject,
            html: html
        });
        
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = router;
```

**Setup:**
```bash
npm install express nodemailer dotenv
```

**.env file:**
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Option 2: SendGrid (Recommended for production)

```javascript
// api/send-email.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/api/send-email', async (req, res) => {
    const { to, subject, html } = req.body;
    
    const msg = {
        to: to,
        from: 'noreply@acredreams.com', // verified sender
        subject: subject,
        html: html,
    };
    
    try {
        await sgMail.send(msg);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('SendGrid error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});
```

**Setup:**
```bash
npm install @sendgrid/mail
```

**Get API Key:** https://sendgrid.com/

### Option 3: AWS SES (Best for scalability)

```javascript
// api/send-email.js
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

router.post('/api/send-email', async (req, res) => {
    const { to, subject, html } = req.body;
    
    const params = {
        Source: 'noreply@acredreams.com',
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Subject: { Data: subject },
            Body: { Html: { Data: html } }
        }
    };
    
    try {
        await ses.sendEmail(params).promise();
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('AWS SES error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});
```

**Setup:**
```bash
npm install aws-sdk
```

### Option 4: Mailgun

```javascript
// api/send-email.js
const mailgun = require('mailgun-js');
const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});

router.post('/api/send-email', async (req, res) => {
    const { to, subject, html } = req.body;
    
    const data = {
        from: 'AcreDreams <noreply@acredreams.com>',
        to: to,
        subject: subject,
        html: html
    };
    
    try {
        await mg.messages().send(data);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Mailgun error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});
```

**Setup:**
```bash
npm install mailgun-js
```

## Frontend Integration

Update the `sendWelcomeEmail` function in `auth.js`:

```javascript
async function sendWelcomeEmail(userData) {
    const emailData = {
        to: userData.email,
        subject: 'Welcome to AcreDreams! 🏡',
        html: `... (your HTML email template) ...`
    };
    
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
        });
        
        if (response.ok) {
            console.log('Welcome email sent successfully');
            return true;
        } else {
            console.error('Failed to send welcome email');
            return false;
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}
```

## Email Templates

The welcome email includes:
- ✅ Personalized greeting with user's name
- ✅ Account confirmation message
- ✅ List of features/benefits
- ✅ Call-to-action button
- ✅ Account details summary
- ✅ Contact information
- ✅ Professional branding

## Testing

### Using Gmail for Development:
1. Enable "Less secure app access" or use App Password
2. Use your Gmail credentials in the nodemailer config

### Using Mailtrap for Testing:
```javascript
const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "your-mailtrap-user",
        pass: "your-mailtrap-pass"
    }
});
```

## Security Best Practices

1. **Never expose API keys in frontend code**
2. **Use environment variables** for sensitive data
3. **Implement rate limiting** to prevent email spam
4. **Verify email addresses** before sending
5. **Use HTTPS** for all API calls
6. **Sanitize user input** in email content
7. **Add unsubscribe links** (required by law in many countries)

## Additional Email Types to Implement

1. **Password Reset Email**
2. **Email Verification/Confirmation**
3. **Property Inquiry Notification**
4. **New Property Alert**
5. **Booking Confirmation**
6. **Newsletter Subscription**

## Cost Comparison

| Service | Free Tier | Pricing |
|---------|-----------|---------|
| SendGrid | 100 emails/day | $19.95/mo for 50k |
| Mailgun | 5,000 emails/mo | $35/mo for 50k |
| AWS SES | 62,000 emails/mo | $0.10 per 1k |
| Gmail SMTP | Limited | Not recommended for production |

## Next Steps

1. Choose an email service provider
2. Set up your backend server (Node.js/Express)
3. Configure email credentials
4. Update the frontend API endpoint
5. Test with real email addresses
6. Deploy to production

## Support

For questions or issues, contact the development team.
