const express = require('express');
const {
  addSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject
} = require('../controllers/subjectController');
const router = express.Router();

// Routes for subject operations
router.post('/add', addSubject);             // Add a new subject
router.get('/subjects', getAllSubjects);     // Get all subjects
router.get('/:id', getSubjectById);          // Get a specific subject by ID
router.put('/:id', updateSubject);           // Update a subject by ID
router.delete('/:id', deleteSubject);        // Delete a subject by ID

module.exports = router;
