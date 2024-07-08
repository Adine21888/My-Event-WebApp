import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../../contexts/AuthContext';

const UserSignIn = () => {
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSignIn = () => {
    setLoading(true);
    axios.post('http://mern-web-app-api.vercel.app/users/signin', { regNo, password })
      .then((response) => {
        setLoading(false);
        alert('Sign In Successful');
        login(response.data.token, response.data.user);
        navigate('/user-home');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Check the console for details.');
        console.log(error);
      });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-3xl mb-8'>Sign In</h1>
      {loading && <Spinner />}
      <input
        type='text'
        placeholder='Registration Number'
        value={regNo}
        onChange={(e) => setRegNo(e.target.value)}
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

export default UserSignIn;
