import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const markAttendance = async (studentId, isPresent) => {
  const response = await axios.post(`${API_URL}/attendance/mark`, { studentId, isPresent });
  return response.data;
};

export const getAllStudents = async () => {
  const response = await axios.get(`${API_URL}/students/students`);
  return response.data;
};
