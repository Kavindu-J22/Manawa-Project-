import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Add a console log to check if API_URL is loaded correctly
console.log('API URL:', API_URL); // Debugging

export const addTeacher = async (teacherData) => {
  const response = await axios.post(`${API_URL}/teachers/add`, teacherData);
  return response.data;
};

export const getAllTeachers = async () => {
  const response = await axios.get(`${API_URL}/teachers/teachers`);
  return response.data;
};
