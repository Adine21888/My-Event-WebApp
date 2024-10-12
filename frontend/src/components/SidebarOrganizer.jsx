import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { AuthContext } from './AuthProvider'; // Assuming AuthProvider is defined in AuthProvider.js
//import { AuthContext } from '../../contexts/AuthContext';
import { OrganizerAuthContext } from '../../contexts/OrganizerAuthContext';

const Sidebar = () => {
  const { logout, organizer } = useContext(OrganizerAuthContext); // Access logout function from AuthContext
  const { id } = useParams();

  return (
    <div className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl bg-white rounded-xl">
      <ul className="space-y-2">
        <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
          <Link to={`/organizers/profile/${organizer._id}`} className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 00-.894.553L5 8H3a1 1 0 000 2h1.382l.724 1.447-1.292 2.585a1 1 0 00.894 1.447h6a1 1 0 00.894-.553L15 8h2a1 1 0 000-2h-1.382l-.724-1.447 1.292-2.585a1 1 0 00-.894-1.447h-6zm1 14a1 1 0 01-1-1v-2a1 1 0 112 0v2a1 1 0 01-1 1z" />
            </svg>
            <span className="ml-3">Our Profile</span>
          </Link>
        </li>
        {/* <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
          <Link to={`/organizer/myposts/${user._id}`} className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 00-.894.553L5 8H3a1 1 0 000 2h1.382l.724 1.447-1.292 2.585a1 1 0 00.894 1.447h6a1 1 0 00.894-.553L15 8h2a1 1 0 000-2h-1.382l-.724-1.447 1.292-2.585a1 1 0 00-.894-1.447h-6zm1 14a1 1 0 01-1-1v-2a1 1 0 112 0v2a1 1 0 01-1 1z" />
            </svg>
            <span className="ml-3">My Posts</span>
          </Link>
        </li> */}
        {/* <li className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer">
          <Link to="/team-posts/create" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 00-.894.553L5 8H3a1 1 0 000 2h1.382l.724 1.447-1.292 2.585a1 1 0 00.894 1.447h6a1 1 0 00.894-.553L15 8h2a1 1 0 000-2h-1.382l-.724-1.447 1.292-2.585a1 1 0 00-.894-1.447h-6zm1 14a1 1 0 01-1-1v-2a1 1 0 112 0v2a1 1 0 01-1 1z" />
            </svg>
            <span className="ml-3">Form Team</span>
          </Link>
          <span className="bg-blue-gray-100 text-blue-gray-900 text-sm px-2 py-0.5 rounded-full">14</span>
        </li> */}
        {/* <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
          <Link to="/team-search-posts/create" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 00-.894.553L5 8H3a1 1 0 000 2h1.382l.724 1.447-1.292 2.585a1 1 0 00-.894 1.447h6a1 1 0 00.894-.553L15 8h2a1 1 0 000-2h-1.382l-.724-1.447 1.292-2.585a1 1 0 00-.894-1.447h-6zm1 14a1 1 0 01-1-1v-2a1 1 0 112 0v2a1 1 0 01-1 1z" />
            </svg>
            <span className="ml-3">Request Team</span>
          </Link>
        </li> */}
        <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
          <Link to="/login" className="flex items-center" onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 00-.894.553L5 8H3a1 1 0 000 2h1.382l.724 1.447-1.292 2.585a1 1 0 00.894 1.447h6a1 1 0 00.894-.553L15 8h2a1 1 0 000-2h-1.382l-.724-1.447 1.292-2.585a1 1 0 00-.894-1.447h-6zm1 14a1 1 0 01-1-1v-2a1 1 0 112 0v2a1 1 0 01-1 1z" />
            </svg>
            <span className="ml-3">Log Out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
