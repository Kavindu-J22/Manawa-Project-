import React, { useState, useEffect } from 'react';
import { markFeePayment, getAllStudents } from '../services/feeService';

function FeePage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const studentList = await getAllStudents();
      setStudents(studentList);
    }
    fetchData();
  }, []);

  const handleFeePayment = async (studentId, month, year, status) => {
    try {
      const feeData = { studentId, month, year, status };
      await markFeePayment(feeData); 
      alert('Fee Payment Recorded!');
    } catch (error) {
      console.error('Error recording fee payment:', error);
      alert('Failed to record fee payment. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Manage Fees</h1>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            {student.name} - Grade: {student.grade}
            <button onClick={() => handleFeePayment(student._id)}>Mark Fee as Paid</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeePage;
