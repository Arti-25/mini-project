const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(bodyParser.json());

// Serve cash.html from the main folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'cash.html'));
});

// POST route to handle booking confirmation (without Twilio)
app.post('/confirm-booking', (req, res) => {
    const { name, address, phone } = req.body;

    // You can still process the data or save it to a database if needed
    // For now, we just send a success message
    console.log(`Booking confirmed for ${name} at ${address}. Contact: ${phone}`);

    res.json({ message: 'Booking confirmed!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
