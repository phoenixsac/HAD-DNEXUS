const express = require('express');
const app = express();
const scriptRoutes = require('./routes/scriptRoutes');

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the script routes
app.use('/api', scriptRoutes);

// Start the server
const PORT = 5003; // Set the port to 5003
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
