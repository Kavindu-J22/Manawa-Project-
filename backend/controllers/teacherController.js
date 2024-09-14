const Teacher = require('../models/Teachers');

// Controller to add a new teacher
const addTeacher = async (req, res) => {
  try {
    const { teacherNumber, name, subject, teachingGrades, contactNumber } = req.body;

    // Validate required fields
    if (!teacherNumber || !name || !subject || !teachingGrades || !contactNumber) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const existingTeacher = await Teacher.findOne({ teacherNumber });

    if (existingTeacher) {
      return res.status(400).json({ 
        message: 'Student Number already registered. Update student details or try with another one.' 
      });
    }

    // Create a new teacher object
    const newTeacher = new Teacher({
      teacherNumber,
      name,
      subject,
      teachingGrades,
      contactNumber,
    });

    // Save the teacher to the database
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(500).json({ message: 'Error adding teacher', error });
  }
};

// Controller to get all teachers
const getAllTeachers = async (req, res) => {
    try {
      // Retrieve all teachers from the database
      const teachers = await Teacher.find();
  
      // Check if no teachers are found
      if (teachers.length === 0) {
        return res.status(404).json({ message: 'No teachers found' });
      }
  
      // Send the teachers data with a 200 status code
      res.status(200).json(teachers);
    } catch (error) {
      console.error('Error retrieving teachers:', error); // Log error for debugging
      res.status(500).json({ message: 'Error retrieving teachers', error }); // Send a 500 error response
    }
  };
  

module.exports = {
  addTeacher,
  getAllTeachers,
};
