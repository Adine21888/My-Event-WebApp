import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const EditUser = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    regNo: '',
    name: '',
    email: '',
    university: '',
    country: '',
    password: ''
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://mern-web-app-api.vercel.app/users/profile/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const { regNo, name, email, university, country } = response.data;
      setFormData({ regNo, name, email, university, country, password: '' });
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
      console.error('Error fetching profile:', error);
    });
  }, [id, token]);

  const handleUpdateProfile = async () => {
    const updateData = {
      regNo: formData.regNo,
      name: formData.name,
      email: formData.email,
      university: formData.university,
      country: formData.country,
      password: formData.password
    };

    console.log('Updating profile with data:', updateData); // Debugging line

    try {
      const response = await axios.patch(`https://mern-web-app-api.vercel.app/users/profile/${id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Profile updated:', response.data); // Logging success response
      navigate(`/users/profile/${id}`);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl mb-8">Edit Profile</h1>
      <div className="p-4 border rounded w-full max-w-md">
        <div>
          <input
            type="text"
            name="regNo"
            value={formData.regNo}
            onChange={handleChange}
            placeholder="Registration Number"
            className="mb-4 px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="mb-4 px-4 py-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="mb-4 px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            placeholder="University"
            className="mb-4 px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className="mb-4 px-4 py-2 border rounded"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="mb-4 px-4 py-2 border rounded"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleUpdateProfile}
            className="px-4 py-2 bg-green-500 text-white rounded mt-4"
          >
            Save
          </button>
          <button
            onClick={() => navigate(`/users/profile/${id}`)}
            className="px-4 py-2 bg-red-500 text-white rounded mt-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
