const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const path = require('path'); // Required to handle file paths

// Your Twilio credentials
const accountSid = 'ACf0fceb2bbde75c04b08ca91c19baeed2'; // Replace with your Twilio Account SID
const authToken = '66505923e3da65a7d256282372f461c8'; // Replace with your Twilio Auth Token

const client = new twilio(accountSid, authToken);

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve driver.html from the same level as backend (public folder)
app.get('/driver', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'driver.html')); // Serve file from the same directory
});

// Route to send message
app.post('/send-message', (req, res) => {
    const { passengerPhone, message } = req.body;

    // Sending SMS via Twilio
    client.messages.create({
        body: message,
        from: '+12293408964', // Replace with your Twilio number
        to: passengerPhone
    })
    .then(message => {
        console.log('Message sent:', message.sid);
        res.status(200).send({ success: true, messageSid: message.sid });
    })
    .catch(error => {
        console.error('Error sending message:', error);
        res.status(500).send({ success: false, error: error.message });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
