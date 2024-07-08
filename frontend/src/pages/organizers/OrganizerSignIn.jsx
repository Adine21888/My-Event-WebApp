import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { OrganizerAuthContext } from '../../../contexts/OrganizerAuthContext';

const OrganizerSignIn = () => {
  const { login } = useContext(OrganizerAuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    setLoading(true);
    axios.post('https://mern-web-app-api.vercel.app/organizers/signin', { email, password })
      .then((response) => {
        setLoading(false);
        alert('Sign In Successful');
        login(response.data.token, response.data.organizer);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('Invalid login credentials. Check the console for details.');
        console.log(error);
      });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-3xl mb-8'>Organizer Sign In</h1>
      {loading && <Spinner />}
      <input
        type='text'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='mb-4 px-4 py-2 border rounded'
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='mb-4 px-4 py-2 border rounded'
      />
      <button
        onClick={handleSignIn}
        className='px-4 py-2 bg-blue-500 text-white rounded'
      >
        Sign In
      </button>
    </div>
  );
};

export default OrganizerSignIn;
