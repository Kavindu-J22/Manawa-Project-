const Subject = require('../models/Subjects');

// Add a new subject (POST)
const addSubject = async (req, res) => {
  try {
    const { name, grade } = req.body;

    if (!name || !grade) {
      return res.status(400).json({ message: 'Please provide both subject name and grade' });
    }

    const newSubject = new Subject({
      name,
      grade,
    });

    await newSubject.save();
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ message: 'Error adding subject', error });
  }
};

// Get all subjects (GET)
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error });
  }
};

// Get a single subject by ID (GET)
const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subject', error });
  }
};

// Update a subject by ID (PUT)
const updateSubject = async (req, res) => {
  try {
    const { name, grade } = req.body;

    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, grade },
      { new: true } // Return the updated document
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subject', error });
  }
};

// Delete a subject by ID (DELETE)
const deleteSubject = async (req, res) => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
    if (!deletedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subject', error });
  }
};

module.exports = {
  addSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
