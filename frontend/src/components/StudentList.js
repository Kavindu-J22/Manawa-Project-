import React, { useState, useEffect } from 'react';
import { getAllStudents } from '../services/studentService'; // Import the service

function StudentListPage() {
  // State to hold student data
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the list of students when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentData = await getAllStudents();
        setStudents(studentData);
        setLoading(false); // Data has been loaded
      } catch (err) {
        setError('Failed to fetch student data');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Render a loading state while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render an error message if fetching fails
  if (error) {
    return <div>{error}</div>;
  }

  // Render the student list in a table format
  return (
    <div>
      <h1>Student List</h1>
      <table>
        <thead>
          <tr>
            <th>Student Number</th>
            <th>Name</th>
            <th>Grade</th>
            <th>Year</th>
            <th>Phone Number</th>
            <th>Parent Phone Number</th>
            <th>Address</th>
            <th>Admission Date</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.studentNumber}</td>
              <td>{student.name}</td>
              <td>{student.grade}</td>
              <td>{student.year}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.parentPhoneNumber}</td>
              <td>{student.address}</td>
              <td>{new Date(student.admissionDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentListPage;
