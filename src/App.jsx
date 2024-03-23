// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FirstPage from './pages/firstpage.jsx';
import Login from "./pages/login";
import Signup from "./pages/signup";
import PasswordRecovery from "./pages/passwordrecovery";
import CourseChat from "./pages/CourseChat.jsx";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element ={<FirstPage/>} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='password-recovery' element={<PasswordRecovery />} />
        <Route path='class-chat/' element={<CourseChat />} />
      </Routes>
  
    
    </BrowserRouter>
  );
}

export default App;

// src/App.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FirstPage from './pages/firstpage.jsx';
import Login from "./pages/login";
import Signup from "./pages/signup";
import PasswordRecovery from "./pages/passwordrecovery";
import DuoAuthPage from "./features/authentication/DuoAuthPage.jsx";
import Dashboard from './pages/Dashboard';
import SubjectDetails from './pages/SubjectDetails';
// import Announcements from "./pages/Announcements.jsx";
// import AssignmentList from "./pages/AssignmentList.jsx";
// import CourseDetails from "./pages/CourseDetails.jsx";
import InstructorDashboard from './pages/InstructorDashboard.jsx';
import ManageCourses from "./components/ManageCourses";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route exact path="/" element ={<FirstPage/>} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='password-recovery' element={<PasswordRecovery />} />
        <Route path='DuoAuthPage' element={<DuoAuthPage />} />
        <Route path="dashboard/*" element={<Dashboard/>} />
        <Route path="/subject/:subjectId" element={<SubjectDetails />} />

    
        <Route path="instructor-dashboard/*" element={<InstructorDashboard/>} />
        {/* <Route path="/Announcements" element={<Announcements/>} />
        <Route path="/Assignments" element={<AssignmentList/>} />
        <Route path="/Courses" element={<CourseDetails/>} /> */}
        <Route path="manage-courses/:subjectId" element={<ManageCourses />} />
      
        
      </Routes>
  
    
    </BrowserRouter>
  );
}

export default App;
