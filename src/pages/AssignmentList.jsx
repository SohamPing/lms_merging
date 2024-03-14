import React from 'react';

function Assignments() {
  // Sample assignments data
  const assignments = [
    {
      id: 1,
      title: 'Assignment 1',
      course: 'Course 1',
      description: 'This is the first assignment.',
      dueDate: '2023-03-15',
      created_at: new Date(2023, 2, 10),
    },
    {
      id: 2,
      title: 'Assignment 2',
      course: 'Course 2',
      description: 'This is the second assignment.',
      dueDate: '2023-04-05',
      created_at: new Date(2023, 2, 20),
    },
    // Add more assignments as needed
  ];

  // Simple date formatter
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-center font-bold text-2xl mb-7">Assignments</h1>
      {assignments.map((assignment) => (
        <div key={assignment.id} className="flex flex-col gap-3 mb-7 shadow-md p-4">
          <h2 className="font-bold text-xl">{assignment.title}</h2>
          <h3 className="text-sm font-semibold">{assignment.course}</h3>
          <p>{assignment.description}</p>
          <p>Due Date: {formatDate(assignment.dueDate)}</p>
          <p>Posted on: {formatDate(assignment.created_at)}</p>
        </div>
      ))}
    </div>
  );
}

export default Assignments;
