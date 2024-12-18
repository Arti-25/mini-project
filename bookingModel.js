const mongoose = require('mongoose');

// Define the schema for the booking
const bookingSchema = new mongoose.Schema({
    pickupLocation: {
        type: String,
        required: true
    },
    dropLocation: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    pickupDate: {
        type: Date,
        required: true
    },
    pickupTime: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    }
});

// Create a model based on the schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
