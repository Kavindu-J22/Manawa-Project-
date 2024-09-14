import React, { useState } from 'react';
import { registerStudent } from '../services/studentService';

function StudentRegistrationPage() {
  // State to hold form data
  const [formData, setFormData] = useState({
    studentNumber: '',
    name: '',
    grade: '',
    phoneNumber: '',
    parentPhoneNumber: '',
    address: '',
    year: '',
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields and show appropriate alerts
    if (!formData.studentNumber) {
      return alert('Please fill in the Student Number');
    }
    if (!formData.name) {
      return alert('Please fill in the Student Name');
    }
    if (!formData.grade) {
      return alert('Please fill in the Grade');
    }
    if (!formData.year) {
      return alert('Please fill in the Year');
    }
    if (!formData.phoneNumber) {
      return alert('Please fill in the Phone Number');
    }
    if (!formData.parentPhoneNumber) {
      return alert('Please fill in the Parent Phone Number');
    }
    if (!formData.address) {
      return alert('Please fill in the Address');
    }

    try {
      // Attempt to register the student
      await registerStudent(formData);
      alert('Student Registered Successfully!');
      console.log('Student registered successfully!');
    } catch (error) {
      // Check for error related to duplicate student number
      if (error.response && error.response.status === 400) {
        alert('Student Number already registered. Update Student Details or Try with Another One.');
      } else {
        alert('Failed to register student. Please try again.');
      }
      console.error('Error registering student:', error);
    }
  };

  return (
    <div className="container">
      <a href='/studentlist'>View All Students</a>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Student Reg:Number (ID)"
        value={formData.studentNumber}
        onChange={e => setFormData({ ...formData, studentNumber: e.target.value })}
      />
      <input
        type="text"
        placeholder="Student Name"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Grade"
        value={formData.grade}
        onChange={e => setFormData({ ...formData, grade: e.target.value })}
      />
      <input
        type="text"
        placeholder="Year"
        value={formData.year}
        onChange={e => setFormData({ ...formData, year: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
      />
      <input
        type="text"
        placeholder="Parent Phone Number"
        value={formData.parentPhoneNumber}
        onChange={e => setFormData({ ...formData, parentPhoneNumber: e.target.value })}
      />
      <textarea
        placeholder="Address"
        value={formData.address}
        onChange={e => setFormData({ ...formData, address: e.target.value })}
      ></textarea>
      <button type="submit">Register Student</button>
    </form>
    </div>
  );
}

export default StudentRegistrationPage;
