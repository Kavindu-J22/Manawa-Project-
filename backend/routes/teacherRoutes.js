const express = require('express');
const { addTeacher, getAllTeachers } = require('../controllers/teacherController');
const router = express.Router();

// Route to add a new teacher
router.post('/add', addTeacher);

// Route to get all teachers
router.get('/teachers', getAllTeachers);

module.exports = router;
