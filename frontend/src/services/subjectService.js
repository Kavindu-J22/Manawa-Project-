import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Add a console log to check if API_URL is loaded correctly
console.log('API URL:', API_URL); // Debugging

// Function to add a new subject
export const addSubject = async (subjectData) => {
  const response = await axios.post(`${API_URL}/subjects/add`, subjectData);
  return response.data;
};

// Function to get all subjects
export const getAllSubjects = async () => {
  const response = await axios.get(`${API_URL}/subjects/subjects`);
  return response.data;
};

// // Function to get a specific subject by ID
// export const getSubjectById = async (subjectId) => {
//   const response = await axios.get(`${API_URL}/subjects/${subjectId}`);
//   return response.data;
// };

// // Function to update a subject by ID
// export const updateSubject = async (subjectId, updatedData) => {
//   const response = await axios.put(`${API_URL}/subjects/${subjectId}`, updatedData);
//   return response.data;
// };

// // Function to delete a subject by ID
// export const deleteSubject = async (subjectId) => {
//   const response = await axios.delete(`${API_URL}/subjects/${subjectId}`);
//   return response.data;
// };
