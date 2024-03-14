import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './NavBar'; // Your navigation bar
import AssignmentList from './AssignmentList'; // List of upcoming assignments
import Announcements from './Announcements'; // Announcements component
import CourseDetails from './CourseDetails'; // Details of courses for instructors

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="dashboard-container mt-8 mx-auto p-6 md:p-12 lg:w-4/5 xl:w-3/4">
        <Routes>
          <Route path="assignments" element={<AssignmentList />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="courses" element={<CourseDetails />} />
          {/* Define other routes and components as needed */}
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
