const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// Mark attendance for a student
const markAttendance = async (req, res) => {
  try {
    const { studentId, status } = req.body;
    const attendance = new Attendance({ studentId, status });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error marking attendance', error });
  }
};

// Get attendance for a student
const getAttendanceByStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const attendanceRecords = await Attendance.find({ studentId });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving attendance', error });
  }
};

module.exports = { markAttendance, getAttendanceByStudent };
