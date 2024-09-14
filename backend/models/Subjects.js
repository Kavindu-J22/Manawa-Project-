const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Subject name
  grade: { type: String, required: true }  // Grade associated with the subject
});

module.exports = mongoose.model('Subject', subjectSchema);
