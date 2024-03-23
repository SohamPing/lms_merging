import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DuoAuthPage() {
  const [username, setUsername] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [passcode, setPasscode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSendPush = async () => {
    console.log('Sending push notification...');
    // Add logic to handle sending a push notification for authentication
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const authData = { username, passphrase, passcode, rememberMe };
  //   try {
  //     const response = await verifyDuoAuth(authData);
  //     if (response.success) {
  //       navigate('/dashboard'); // Navigate to the dashboard
  //     } else {
  //       alert('Authentication failed. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error during authentication:', error);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const authData = { username, passphrase, passcode, rememberMe };
    try {
      const response = await verifyDuoAuth(authData);
      if (response.success) {
        // Use a regular expression to test if the passcode is numeric
        if (/^\d+$/.test(passcode)) {
          navigate('/dashboard'); // Navigate to the Dashboard
        } else if (/^[A-Za-z]+$/.test(passcode)) {
          navigate('/instructor-dashboard'); // Navigate to the Instructor Dashboard
        } else {
          alert('Passcode must be either all digits or all alphabets.');
        }
      } else {
        alert('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-20 bg-[#e1eaef]'>
      <div className='flex flex-col gap-6 bg-[#bee1e6] shadow-xl p-10 rounded-lg'>
        <h2 className="text-2xl font-bold text-center text-gray-800">Two-Step (Duo)</h2>
        <div className="space-y-6">
          <button
            type="button"
            className='w-full py-2 bg-[#0fa3b1] text-white rounded-lg border-2 border-[#bee1e6] hover:bg-[#bee1e6] hover:text-[#0fa3b1] hover:border-[#0fa3b1] flex justify-center items-center transition-colors duration-300'
            onClick={handleSendPush}
          >
            Send Me a Push
          </button>
          <div>
            <h3 className="text-lg font-medium text-gray-800">Passcode:</h3>
            <input
              type="text"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode here"
              className='w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-[#0fa3b1] transition-colors'
            />
          </div>
          <div className="flex items-center justify-center">
            <input 
              id="rememberMe" 
              type="checkbox" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)} 
              className="form-checkbox h-5 w-5 text-[#0fa3b1]"
            />
            <label htmlFor="rememberMe" className="ml-2 text-gray-900">
              Remember me for 7 days
            </label>
          </div>
          <button
            onClick={handleSubmit}
            className='w-full py-2 mt-4 bg-[#0fa3b1] text-white rounded-lg border-2 border-[#bee1e6] hover:bg-[#bee1e6] hover:text-[#0fa3b1] hover:border-[#0fa3b1] flex justify-center items-center transition-colors duration-300'
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

// Replace with your actual API call for authentication
async function verifyDuoAuth(authData) {
  console.log('Verifying authentication with:', authData);
  // Simulate an API call response
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
}

export default DuoAuthPage;
