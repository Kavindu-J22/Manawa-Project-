const express = require('express');
const cors = require('cors'); // Import the cors module
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const feeRoutes = require('./routes/feeRoutes');
const subjectRoutes = require('./routes/subjectRoutes')
const teacherRoutes = require('./routes/teacherRoutes')
require('dotenv').config();

const app = express();

// Connect to the database
connectDB();

// Apply CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL if different
  methods: 'GET,POST,PUT,DELETE', // Specify allowed methods if needed
  credentials: true // Enable if you need to pass cookies with requests
}));

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/teachers', teacherRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
