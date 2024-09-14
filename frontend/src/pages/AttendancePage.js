import React, { useState, useEffect } from 'react';
import { markAttendance, getAllStudents } from '../services/attendanceService';

function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const studentList = await getAllStudents();
      setStudents(studentList);
    }
    fetchData();
  }, []);

  const handleAttendance = async (studentId, isPresent) => {
    try {
      await markAttendance(studentId, isPresent);
      alert('Attendance Marked!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Mark Attendance</h1>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            {student.name}
            <button onClick={() => handleAttendance(student._id, true)}>Present</button>
            <button onClick={() => handleAttendance(student._id, false)}>Absent</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AttendancePage;
