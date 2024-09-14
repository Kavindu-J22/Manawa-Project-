const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    default: 'Absent',
    set: function (value) {
      return value === true ? 'Present' : 'Absent'; // Convert true/false to Present/Absent
    }
  }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
