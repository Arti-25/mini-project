const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/signModel');  // Correct path to access models
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose
    .connect('mongodb+srv://artiv669:mWrqD8lWbM5POzV7@cluster0.buyz5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0npm', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());  // Parse incoming JSON requests

// Serve static files from 'public' directory
app.use(express.static(__dirname));  // Serve static files from the current directory
 // Serving static files correctly

// Sign Up Route
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

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
