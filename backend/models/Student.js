const mongoose = require('mongoose');

// Define your schema
const studentSchema = new mongoose.Schema({
  studentNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  parentPhoneNumber: { type: String, required: true },
  grade: { type: String, required: true },
  year: { type: Number, required: true },
  admissionDate: { type: Date, default: Date.now },
  feesPaid: [
    {
      month: String,
      year: Number,
      status: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
    },
  ],
  attendance: [
    {
      date: Date,
      status: { type: String, enum: ['Present', 'Absent'], default: 'Absent' },
    },
  ],
  studentID: { type: Number } // Define studentID field
});

// Create the index
studentSchema.index({ studentID: 1 }, { unique: true, sparse: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
