// Function to handle form submission, save booking data, and redirect to the appropriate vehicle type page
async function submitBookingForm(event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Get form values
    const pickupLocation = document.getElementById("pickup-location").value;
    const dropLocation = document.getElementById("drop-location").value;
    const vehicleType = document.getElementById("vehicle-type").value;
    const pickupDate = document.getElementById("pickup-date").value;
    const pickupTime = document.getElementById("pickup-time").value;
    const phone = document.getElementById("phone").value;

    // Validate all fields
    if (pickupLocation && dropLocation && vehicleType && pickupDate && pickupTime && phone) {
        const today = new Date().toISOString().split("T")[0]; // Today's date
        if (pickupDate < today) {
            alert("Please select a valid date (not in the past).");
        } else {
            try {
                // Create the booking data object
                const bookingData = {
                    pickupLocation,
                    dropLocation,
                    vehicleType,
                    pickupDate,
                    pickupTime,
                    phone
                };

                // Send the data to the backend API using Fetch API
                const response = await fetch('http://localhost:3000/api/bookings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bookingData)
                });

                // Handle the response
                if (response.ok) {
                    const data = await response.json();
                    alert('Booking saved successfully!');
                    console.log(data); // Log the response from the backend

                    // Redirect to the appropriate vehicle type page with booking details as query parameters
                    const bookingId = data.booking._id; // Assuming you return the booking _id from the backend
                    const url = `${vehicleType}.html?pickup=${encodeURIComponent(pickupLocation)}&drop=${encodeURIComponent(dropLocation)}&date=${encodeURIComponent(pickupDate)}&time=${encodeURIComponent(pickupTime)}&phone=${encodeURIComponent(phone)}&bookingId=${bookingId}`;
                    window.location.href = url;
                } else {
                    const errorData = await response.json();
                    alert('Error saving booking: ' + errorData.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error sending request to the server.');
            }
        }
    } else {
        alert("Please fill in all required fields.");
    }
}
