// src/components/SubjectForm.js
import React, { useState } from 'react';
import { addSubject} from '../services/subjectService';

function SubjectForm() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
  });

  const [message, setMessage] = useState('');

  // Handle Add Subject
  const handleAddSubject = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      return alert('Please fill in the Subject Name');
    }
    if (!formData.grade) {
      return alert('Please fill in the Grade');
    }

    try {
      await addSubject(formData);
      alert('Subject added successfully!');
      setMessage('Subject added successfully!');
    } catch (error) {
      alert('Error adding subject.');
      setMessage('Error adding subject');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Subject Form</h2>
      <a href='/subjectlist'>View All  Subjects</a>

      {/* Add Subject Form */}
      <form onSubmit={handleAddSubject}>
        <input
          type="text"
          placeholder="Subject Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Grade"
          value={formData.grade}
          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
        />
        <button type="submit">Add Subject</button>
      </form> 

      {/* Display message */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default SubjectForm;
