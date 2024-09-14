import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Add a console log to check if API_URL is loaded correctly
console.log('API URL:', API_URL); // Debugging

export const registerStudent = async (studentData) => {
  const response = await axios.post(`${API_URL}/students/add`, studentData);
  return response.data;
};

export const getAllStudents = async () => {
  const response = await axios.get(`${API_URL}/students/students`);
  return response.data;
};
