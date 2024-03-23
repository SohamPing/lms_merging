import React, { useState } from 'react';
import { FirebaseApp } from '../lib/helper/firebaseClient';
import { getMessaging, getToken } from "firebase/messaging";

const messaging = getMessaging();
// Add the public key generated from the console here.
getToken(messaging, {vapidKey: "BLqt2iflEqHbpU7tf8lyeX2cLv6octY88VshdZbknRQ2tPboXTC"});

// KP: 
// Pub: BLqt2iflEqHbpU7tf8lyeX2cLv6octY88VshdZbknRQ2tPboXTC
// Priv: tKK1QcsgK7QwpesJ8-5fxtk75vtVY44s2Ta3-9wPyHU



// Initialize Firebase Cloud Messaging and get a reference to the service

function CourseChat({  }) {
  // Sample messages array for testing
  const messages = [
    { id: 1, sender: 'John Lennon', content: 'Hey Jude, how\'s it going?' },
    { id: 2, sender: 'Paul McCartney', content: 'Hello, Goodbye, folks! What\'s up?' },
    { id: 3, sender: 'George Harrison', content: 'Here comes the sun, shining through your window. How are you?' },
    { id: 4, sender: 'Ringo Starr', content: 'I get by with a little help from my friends. I\'m good, thanks for asking!' }
  ];
  
  // Use messages from props if available, otherwise use an empty array
  const messagesToDisplay = messages || sampleMessages;

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    // Logic for sending a new message
    // This can be implemented based on your requirements
    console.log('New message:', newMessage);
    // Clear the text input after sending the message
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    // Check if Enter key is pressed
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '600px',
      margin: '20px auto 0', // Added marginTop
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        marginBottom: '20px'
      }}>Course Chat</h2>
      <ul style={{
        listStyleType: 'none',
        padding: '0'
      }}>
        {messagesToDisplay.map(message => (
          <li key={message.id} style={{ marginBottom: '10px' }}>
            <strong style={{ fontWeight: 'bold', marginRight: '5px' }}>{message.sender}:</strong> 
            <span style={{ display: 'inline-block' }}>{message.content}</span>
          </li>
        ))}
      </ul>
      {/* Text input for new message */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress} // Call handleKeyPress function on key press
          style={{ flex: '1', marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          placeholder="Type your message here..."
        />
        {/* Button for sending new message */}
        <button onClick={handleSendMessage} style={{ padding: '8px', borderRadius: '50%', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#fff"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CourseChat;
