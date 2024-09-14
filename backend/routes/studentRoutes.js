const express = require('express');
const { addStudent, getStudentById, getStudentsByGradeAndYear, getAllStudents } = require('../controllers/studentController');
const router = express.Router();

router.post('/add', addStudent);
router.get('/students', getAllStudents);
router.get('/:id', getStudentById);
router.get('/search', getStudentsByGradeAndYear);


module.exports = router;
