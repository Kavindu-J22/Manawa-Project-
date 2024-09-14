// src/components/SubjectListPage.js
import React, { useState, useEffect } from 'react';
import { getAllSubjects } from '../services/subjectService'; // Import the service

const SubjectListPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all subjects when component mounts
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getAllSubjects();
        setSubjects(data);
      } catch (error) {
        setError('Error fetching subjects');
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div>
      <h2>Subject List</h2>
      {error && <p>{error}</p>}
      <ul>
        {subjects.map((subject) => (
          <li key={subject._id}>
            <h3>{subject.name}</h3>
            <p>Grade: {subject.grade}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectListPage;
