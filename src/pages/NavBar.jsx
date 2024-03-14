// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link to="/assignments">Assignments</Link></li>
        <li><Link to="/announcements">Announcements</Link></li>
        <li><Link to="/courses">Courses</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
