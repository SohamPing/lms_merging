import React, { useState } from 'react';

function InstructorAnnouncement() {
  const initialAnnouncements = [
    {
      id: 1,
      title: 'Announcement 1',
      course: 'Course 1',
      description: 'This is the first announcement.',
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Announcement 2',
      course: 'Course 2',
      description: 'This is the second announcement.',
      created_at: new Date().toISOString(),
    },
    // Add more announcements as needed
  ];

  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [description, setDescription] = useState('');
  const [searchAnnouncement, setSearchAnnouncement] = useState('');
  const [announcementSort, setAnnouncementSort] = useState('NeOl');

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    const newAnnouncement = {
      id: announcements.length + 1,
      title,
      course,
      description,
      created_at: new Date().toISOString(),
    };
    setAnnouncements([...announcements, newAnnouncement]);
    setShowForm(false); // Hide form after creation
    setTitle(''); // Reset title
    setCourse(''); // Reset course
    setDescription(''); // Reset description
  };

  let filteredAnnouncements = announcements
    .filter((announcement) =>
      announcement.title.toLowerCase().includes(searchAnnouncement.toLowerCase())
    )
    .sort((a, b) =>
      announcementSort === 'NeOl'
        ? new Date(b.created_at) - new Date(a.created_at)
        : new Date(a.created_at) - new Date(b.created_at)
    );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-center mb-6">Announcements</h1>
      <input
        type="text"
        placeholder="Search Announcement"
        value={searchAnnouncement}
        onChange={(e) => setSearchAnnouncement(e.target.value)}
        className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-[#0fa3b1] transition-colors mb-4"
      />
      <select
        value={announcementSort}
        onChange={(e) => setAnnouncementSort(e.target.value)}
        className="w-full p-3 mt-3 rounded-lg border-2 border-[#0fa3b1] text-[#0fa3b1] bg-white focus:outline-none focus:ring-[#0fa3b1] focus:border-[#0fa3b1] transition-colors"
      >
        <option value="NeOl">Newest to Oldest</option>
        <option value="OlNe">Oldest to Newest</option>
      </select>
      <button onClick={() => setShowForm(!showForm)} className="w-full py-2 mt-4 bg-[#0fa3b1] text-white rounded-lg border-2 border-[#bee1e6] hover:bg-[#bee1e6] hover:text-[#0fa3b1] hover:border-[#0fa3b1] flex justify-center items-center transition-colors duration-300">
        {showForm ? 'Cancel' : 'Add New Announcement'}
      </button>
      {showForm && (
        <form onSubmit={handleCreateAnnouncement} className="mt-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-[#0fa3b1] transition-colors mb-4"
          />
          <input
            type="text"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-[#0fa3b1] transition-colors mb-4"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-[#0fa3b1] transition-colors mb-4"
          />
          <button type="submit" className="w-full py-2 bg-[#0fa3b1] text-white rounded-lg border-2 border-[#bee1e6] hover:bg-[#bee1e6] hover:text-[#0fa3b1] hover:border-[#0fa3b1] flex justify-center items-center transition-colors duration-300">
            Create Announcement
          </button>
        </form>
      )}
      {filteredAnnouncements.map((announcement) => (
        <div key={announcement.id} className="mb-4 p-4 border-b border-gray-200">
          <h2 className="font-bold">{announcement.title}</h2>
          <p>{announcement.course}</p>
          <p>{announcement.description}</p>
          <p>Posted on: {new Date(announcement.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default InstructorAnnouncement;
