// Import required modules
const express = require('express');
const twilio = require('twilio');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Twilio credentials (store these securely in .env)
const accountSid = process.env.ACf0fceb2bbde75c04b08ca91c19baeed2;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.+12293408964;

// Twilio client
const client = twilio(accountSid, authToken);

// Route to send SMS
app.post('/send-message', (req, res) => {
    const { recipientPhone, message } = req.body;

    // Validate input
    if (!recipientPhone || !message) {
        return res.status(400).json({ error: 'Recipient phone number and message are required.' });
    }

    // Send SMS using Twilio
    client.messages
        .create({
            body: message,
            from: twilioPhoneNumber,
            to: recipientPhone,
        })
        .then(message => {
            console.log('Message sent:', message.sid);
            res.status(200).json({ success: true, sid: message.sid });
        })
        .catch(err => {
            console.error('Error:', err.message);
            res.status(500).json({ success: false, error: err.message });
        });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
