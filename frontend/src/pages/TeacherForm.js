import React, { useState } from 'react';
import { addTeacher } from '../services/teacherService'; // Import the addTeacher function

const TeacherForm = () => {
  const [teacherNumber, setTeacherNumber] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [grades, setGrades] = useState(['']); // Initialize with an empty grade
  const [contactNumber, setContactNumber] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remove any empty strings and convert to array of numbers
    const gradesArray = grades.filter(grade => grade.trim() !== '').map(grade => parseInt(grade.trim(), 10));

    try {
      await addTeacher({ teacherNumber, name, subject, teachingGrades: gradesArray, contactNumber });
      setMessage('Teacher added successfully');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Teacher ID already registered. Update Teacher Details or Try with Another One.');
      }else{
        setMessage('Error adding teacher');
      }
      console.error('Error adding teacher:', error);
    }
  };

  // Handle adding a new grade input
  const handleAddGrade = () => {
    setGrades([...grades, '']); // Add a new empty string for the new grade input
  };

  // Handle changing a grade input
  const handleGradeChange = (index, value) => {
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);
  };

  return (
    <div>
      <h2>Teacher Form</h2>
      <a href='/teacherlist'>View All Teachers</a>
      <form onSubmit={handleSubmit}>
      <label>
          Teacher ID:
          <input
            type="text"
            value={teacherNumber}
            onChange={(e) => setTeacherNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Teaching Grades:
          {grades.map((grade, index) => (
            <div key={index}>
              <input
                type="text"
                value={grade}
                onChange={(e) => handleGradeChange(index, e.target.value)}
                placeholder={`Grade ${index + 1}`}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddGrade}>Add More Grades</button>
        </label>
        <br />
        <label>
          Contact Number:
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Add Teacher</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TeacherForm;
