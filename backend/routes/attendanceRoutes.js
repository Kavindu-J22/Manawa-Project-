const express = require('express');
const { markAttendance, getAttendanceByStudent } = require('../controllers/attendanceController');
const router = express.Router();

router.post('/mark', markAttendance);
router.get('/:id', getAttendanceByStudent);

module.exports = router;
