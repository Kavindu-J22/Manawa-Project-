const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  teacherNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  subject: { type: String, required: true },
  teachingGrades: [{ type: Number, required: true }], // Array to store multiple grades
  contactNumber: { type: String, required: true },
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;


