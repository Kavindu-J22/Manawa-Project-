const Student = require('../models/Student');
const mongoose = require('mongoose');

// Add a new student

const addStudent = async (req, res) => {
  try {
    // Extract student data from request body
    const { studentNumber, name, address, phoneNumber, parentPhoneNumber, grade, year } = req.body;

    // Validate required fields
    if (!studentNumber || !name || !address || !phoneNumber || !parentPhoneNumber || !grade || !year) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Check if the student number already exists in the database
    const existingStudent = await Student.findOne({ studentNumber });
    
    // If a student with the same student number exists, return an error
    if (existingStudent) {
      return res.status(400).json({ 
        message: 'Student Number already registered. Update student details or try with another one.' 
      });
    }

    // Create a new student object
    const newStudent = new Student({
      studentNumber,
      name,
      address,
      phoneNumber,
      parentPhoneNumber,
      grade,
      year
      // studentNumber will be auto-generated if using the auto-generation method
    });

    // Save the new student to the database
    await newStudent.save();

    // Return the newly created student with a success status
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Error adding student', error });
  }
};

module.exports = {
  addStudent,
};

// Function to get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students from the database
    res.status(200).json(students); // Return the students as a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving students', error });
  }
};

// Get a student by ID
const getStudentById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid student ID format' });
    }
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving student', error });
  }
};

// Search students by grade and year
const getStudentsByGradeAndYear = async (req, res) => {
  try {
    const { grade, year } = req.query;
    const students = await Student.find({ grade, year });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving students', error });
  }
};

module.exports = { addStudent, getStudentById, getStudentsByGradeAndYear, getAllStudents };
