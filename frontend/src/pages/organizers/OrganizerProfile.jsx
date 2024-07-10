import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { OrganizerAuthContext } from '../../../contexts/OrganizerAuthContext';
import Spinner from '../../components/Spinner';
import UserBackButton from '../../components/UserBackButton';

const OrganizerProfile = () => {
  const { id } = useParams();
  const { token, organizer } = useContext(OrganizerAuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5555/organizers/profile/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setProfile(response.data);
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
      console.error('Error fetching profile:', error);
    });
  }, [id, token]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <UserBackButton />
      <h1 className="text-3xl my-4">Organizer Profile</h1>
      {profile && (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 max-w-md mx-auto">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Name:</span>
            <span>{profile.name}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Email:</span>
            <span>{profile.email}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">University:</span>
            <span>{profile.university}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Country:</span>
            <span>{profile.country}</span>
          </div>
          {organizer._id === id && (
            <Link
              to={`/organizers/edit/${id}`}
              className="px-4 py-2 bg-blue-500 text-white rounded mt-4 inline-block"
            >
              Edit Profile
            </Link>
          )}
          {organizer._id === id && (
            <Link
              to={`/organizers/delete/${id}`}
              className="px-4 py-2 bg-red-500 text-white rounded mt-4 inline-block"
            >
              Delete Profile
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default OrganizerProfile;
