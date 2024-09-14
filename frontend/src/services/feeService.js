import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const markFeePayment = async (studentId) => {
  const response = await axios.post(`${API_URL}/fees/mark`, { studentId });
  return response.data;
};

export const getAllStudents = async () => {
  const response = await axios.get(`${API_URL}/students/students`);
  return response.data;
};
