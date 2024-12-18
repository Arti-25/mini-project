const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Booking = require('../models/bookingModel');  // Import the booking model

const app = express();

// MongoDB connection
mongoose.connect('mongodb+srv://artiv669:mWrqD8lWbM5POzV7@cluster0.buyz5.mongodb.net/quickcab?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve root directory files
app.use(express.static(path.join(__dirname, 'public'))); // Serve 'public' folder files

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});




// Booking Route (to save the booking data)
app.post('/api/book-ride', async (req, res) => {
    const { pickupLocation, dropLocation, vehicleType, pickupDate, pickupTime, phone, distance } = req.body;

    try {
        // Create a new booking document
        const newBooking = new Booking({ 
            pickupLocation,
            dropLocation,
            vehicleType,
            pickupDate,
            pickupTime,
            phone,
            distance 
        });

        // Save the booking to the database
        await newBooking.save();

        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error('Error during booking:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// 404 Error handling
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
