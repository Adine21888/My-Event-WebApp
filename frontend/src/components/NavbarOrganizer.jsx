import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { OrganizerAuthContext } from '../../contexts/OrganizerAuthContext';

const NavbarDefault = () => {
  const { logout, organizer } = useContext(OrganizerAuthContext); 

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Left side with My Event */}
          <div className="flex-shrink-0">
            <Link to="/organizer-home" className="text-white text-xl font-bold">
              My Event
            </Link>
          </div>
          {/* Right side with navigation links */}
          <div className="flex-1 flex items-center justify-end">
            <div className="hidden sm:flex space-x-4">
              <Link
                to="/organizer-home"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/page-events"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Completed Events
              </Link>
              <Link
                to="/posts"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Current Event
              </Link>
              <Link
                to="/organize-event"
                className="text-gray-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-l hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Organize Event
              </Link>
              <Link
                to={`/organizers/profile/${organizer._id}`}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </Link>
              <Link
                to="/login"
                onClick={logout}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDefault;
