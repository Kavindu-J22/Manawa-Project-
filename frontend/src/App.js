import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Import necessary components from react-router-dom
import { CssBaseline } from '@mui/material'; // To reset default browser styling
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import StudentRegistrationPage from './pages/StudentRegistrationPage';
import AttendancePage from './pages/AttendancePage';
import FeePage from './pages/FeePage';
import Subjects from './pages/SubjectPage';
import Teachersform from './pages/TeacherForm';
import Studentlist from './components/StudentList';
import Subjectlist from './components/SubjectList';
import Teacherlist from './components/TeachersList';
// import StudentDetailsPage from './pages/StudentDetailsPage';



function App() {
  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline /> {/* Reset default styling */}
      <Navbar />
      <main
        style={{
          flexGrow: 1,
          padding: '20px',
          backgroundColor: '#f4f4f4',
          minHeight: '100vh',
        }}
      >
        <Routes>
          {/* Define routes with the element prop */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<StudentRegistrationPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/fees" element={<FeePage />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/teachers" element={<Teachersform />} />
          <Route path="/studentlist" element={<Studentlist />} />
          <Route path="/subjectlist" element={<Subjectlist />} />
          <Route path="/teacherlist" element={<Teacherlist />} />
          {/* <Route path="/student/:id" element={<StudentDetailsPage />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
