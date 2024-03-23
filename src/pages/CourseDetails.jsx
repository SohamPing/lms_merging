import React, { useState } from 'react';

function CourseDetails() {
  // Sample data for courses
  const initialCourses = [
    { id: 1, name: 'Course 1', instructor: 'Instructor 1', createdAt: new Date(2021, 1, 1) },
    { id: 2, name: 'Course 2', instructor: 'Instructor 2', createdAt: new Date(2022, 1, 1) },
    // Add more courses as needed
  ];

  const [courses, setCourses] = useState(initialCourses);
  const [showForm, setShowForm] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newInstructorName, setNewInstructorName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('NeOl'); // 'NeOl' for Newest to Oldest, 'OlNe' for Oldest to Newest

  const handleCreateCourse = (e) => {
    e.preventDefault();
    const newCourse = {
      id: courses.length + 1,
      name: newCourseName,
      instructor: newInstructorName,
      createdAt: new Date(),
    };
    setCourses([...courses, newCourse]);
    setShowForm(false); // Hide form after course creation
    setNewCourseName(''); // Reset course name input
    setNewInstructorName(''); // Reset instructor name input
  };

  const filteredCourses = courses
    .filter((course) => course.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortOrder === 'NeOl' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt);

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search courses"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-[#0fa3b1] transition-colors'
      />
      <select
        onChange={(e) => setSortOrder(e.target.value)}
        className="w-full p-3 mt-3 rounded-lg border-2 border-[#0fa3b1] text-[#0fa3b1] bg-white focus:outline-none focus:ring-[#0fa3b1] focus:border-[#0fa3b1] transition-colors">
        <option value="NeOl">Newest to Oldest</option>
        <option value="OlNe">Oldest to Newest</option>
    </select>
      <button onClick={() => setShowForm(!showForm)} className='w-full py-2 bg-[#0fa3b1] text-white rounded-lg border-2 border-[#bee1e6] hover:bg-[#bee1e6] hover:text-[#0fa3b1] hover:border-[#0fa3b1] flex justify-center items-center transition-colors duration-300'>
        {showForm ? 'Cancel' : 'Add New Course'}
      </button>
      {showForm && (
        <form onSubmit={handleCreateCourse} className="mt-4">
          <input
            type="text"
            placeholder="Course name"
            value={newCourseName}
            onChange={(e) => setNewCourseName(e.target.value)}
            className="border rounded p-1 mr-2"
          />
          <input
            type="text"
            placeholder="Instructor name"
            value={newInstructorName}
            onChange={(e) => setNewInstructorName(e.target.value)}
            className="border rounded p-1 mr-2"
          />
          <button type="submit" className='w-full py-2 bg-[#0fa3b1] text-white rounded-lg border-2 border-[#bee1e6] hover:bg-[#bee1e6] hover:text-[#0fa3b1] hover:border-[#0fa3b1] flex justify-center items-center transition-colors duration-300'>Create Course</button>
        </form>
      )}
      <div className="mt-4">
        {filteredCourses.map((course) => (
          <div key={course.id} className="p-4 border-b">
            <h3>{course.name}</h3>
            <p>Instructor: {course.instructor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetails;
