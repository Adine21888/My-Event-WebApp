import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showOrganizerOptions, setShowOrganizerOptions] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl mb-8">Welcome to the Event Management System</h1>
      <div className="flex space-x-4">
        <div
          className="w-1/2 bg-white p-8 border rounded-lg cursor-pointer"
          onClick={() => setShowUserOptions(!showUserOptions)}
        >
          <h2 className="text-2xl mb-4 text-center">User</h2>
          {showUserOptions && (
            <div className="flex flex-col items-center">
              <Link
                to="/users/signin"
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
              >
                User Sign In
              </Link>
              <Link
                to="/users/signup"
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                User Sign Up
              </Link>
            </div>
          )}
        </div>

        <div
          className="w-1/2 bg-white p-8 border rounded-lg cursor-pointer"
          onClick={() => setShowOrganizerOptions(!showOrganizerOptions)}
        >
          <h2 className="text-2xl mb-4 text-center">Organizer</h2>
          {showOrganizerOptions && (
            <div className="flex flex-col items-center">
              <Link
                to="/organizers/signin"
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
              >
                Organizer Sign In
              </Link>
              <Link
                to="/organizers/signup"
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Organizer Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
