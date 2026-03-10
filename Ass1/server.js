const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import student routes
const studentRoutes = require('./students'); // make sure student.js is in same folder

// Use /students route
app.use('/students', studentRoutes);

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});