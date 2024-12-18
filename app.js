const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Booking = require('../models/bookingModel'); // Import Booking model
const User = require('../models/userModel');
const Account = require('../models/signModel'); // Import the Account model

// Create Express App
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose
    .connect('mongodb+srv://artiv669:mWrqD8lWbM5POzV7@cluster0.buyz5.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0npm', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,  // Increase timeout
        socketTimeoutMS: 45000,  // Increase socket timeout
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(express.static(__dirname));

// Save Booking
app.post('/api/bookings', async (req, res) => {
    const { pickupLocation, dropLocation, vehicleType, pickupDate, pickupTime, phone } = req.body;

    try {
        const booking = new Booking({
            pickupLocation,
            dropLocation,
            vehicleType,
            pickupDate,
            pickupTime,
            phone,
        });
        await booking.save();
        res.status(201).json({ message: 'Booking saved successfully', booking });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ message: 'Error saving booking', error });
    }
});

// Fetch All Bookings
app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));  // Adjusted the path for the sign-up page
});

app.post('/login', async (req, res) => {
    const { email, password, userType } = req.body;

    try {
        // Find user by email
        let user = await User.findOne({ email });

        if (!user) {
            // If no user found, create a new user
            user = new User({ email, password, name: 'New User' }); // Add a default name or get it from the form
            await user.save(); // Save the new user to the database
            return res.status(201).json({ message: 'User created and logged in', user });
        }

        // Check if password matches
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Serve the signin.html file when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'signin.html'));
});

app.post('/signup', async (req, res) => {
    const { name, email, password, userType, phone } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        user = new User({ name, email, password, userType, phone });
        await user.save();

        res.status(201).json({ message: 'User signed up successfully', user });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Serve the sign-up page when the root URL is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'sign.html'));  // Adjusted the path for the sign-up page
});


// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
