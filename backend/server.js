const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'outlook', // Changed to Outlook for easier setup
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'AcreDreams API is running!' });
});

// Send email endpoint
app.post('/api/send-email', async (req, res) => {
    const { to, subject, html } = req.body;
    
    if (!to || !subject || !html) {
        return res.status(400).json({ 
            error: 'Missing required fields: to, subject, html' 
        });
    }
    
    const mailOptions = {
        from: `"AcreDreams" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        html: html
    };
    
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        res.status(200).json({ 
            message: 'Email sent successfully',
            messageId: info.messageId 
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            error: 'Failed to send email',
            details: error.message 
        });
    }
});

// Test email endpoint
app.post('/api/test-email', async (req, res) => {
    const testEmail = {
        from: `"AcreDreams" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // Send to yourself
        subject: 'Test Email from AcreDreams',
        html: '<h1>Test Email</h1><p>If you receive this, your email setup is working!</p>'
    };
    
    try {
        const info = await transporter.sendMail(testEmail);
        res.status(200).json({ 
            message: 'Test email sent successfully',
            messageId: info.messageId 
        });
    } catch (error) {
        console.error('Error sending test email:', error);
        res.status(500).json({ 
            error: 'Failed to send test email',
            details: error.message 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📧 Email service configured for: ${process.env.EMAIL_USER}`);
});
