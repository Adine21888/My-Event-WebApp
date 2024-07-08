// OrganizerSignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const OrganizerSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    setLoading(true);
    axios.post('https://mern-web-app-api.vercel.app/organizers/signup', { name, email, university, country, password })
      .then(() => {
        setLoading(false);
        alert('Sign Up Successful');
        navigate('/organizers/signin');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Check the console for details.');
        console.log(error);
      });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-3xl mb-8'>Organizer Sign Up</h1>
      {loading && <Spinner />}
      <input
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='mb-4 px-4 py-2 border rounded'
      />
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='mb-4 px-4 py-2 border rounded'
      />
      <input
        type='text'
        placeholder='University'
        value={university}
        onChange={(e) => setUniversity(e.target.value)}
        className='mb-4 px-4 py-2 border rounded'
      />
      <input
        type='text'
        placeholder='Country'
        value={country}
        onChange={(e) => setCountry(e.target.value)}
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
        onClick={handleSignUp}
        className='px-4 py-2 bg-blue-500 text-white rounded'
      >
        Sign Up
      </button>
    </div>
  );
};

export default OrganizerSignUp;
