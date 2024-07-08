// DeleteOrganizer.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import OrganizerBackButton from '../../components/OrganizerBackButton';
import Spinner from '../../components/Spinner';
import { OrganizerAuthContext } from '../../../contexts/OrganizerAuthContext';

const DeleteOrganizer = () => {
  const { token, logout } = useContext(OrganizerAuthContext); // assuming logout function in context
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteFunction = () => {
    setLoading(true);
    axios
      .delete(`http://mern-web-app-api.vercel.app/organizers/profile/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        setLoading(false);
        alert('Organizer deleted successfully.');
        logout(); // Call logout function to clear token from context or localStorage
        navigate('/organizers/signin');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Check the console for details.');
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <OrganizerBackButton />
      <h1 className='text-3xl my-4'>Delete Organizer</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this organizer?</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full rounded-lg'
          onClick={handleDeleteFunction}
        >
          Yes, Delete Organizer
        </button>
      </div>
    </div>
  );
};

export default DeleteOrganizer;
