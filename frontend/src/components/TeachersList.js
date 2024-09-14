// src/components/TeacherList.js
import React, { useState, useEffect } from 'react';
import { getAllTeachers } from '../services/teacherService'; // Import the function from your service

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getAllTeachers();
        setTeachers(data);
      } catch (error) {
        setError('Error fetching teachers');
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Teacher List</h2>
      <table>
        <thead>
          <tr>
          <th>Teacher ID</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Teaching Grades</th>
            <th>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td>{teacher.teacherNumber}</td>
                <td>{teacher.name}</td>
                <td>{teacher.subject}</td>
                <td>{teacher.teachingGrades.join(', ')}</td>
                <td>{teacher.contactNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No teachers available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherList;
