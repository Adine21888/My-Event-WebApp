import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeamPostCreate = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [maxTeamSize, setMaxTeamSize] = useState('');
  const [teamName, setteamName] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5555/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You need to be logged in to create a team post.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5555/team-posts/create', {
        event: selectedEvent,
        maxTeamSize: parseInt(maxTeamSize),
        teamName: teamName,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Team post created successfully!');
      navigate(`/team-posts`);
      setSelectedEvent('');
      setMaxTeamSize('');
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || 'Something went wrong.'}`);
    }
  };

  return (
    <div className="max-w-sm mx-auto my-10">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl text-center mb-6">Create Team Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Event</label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="block w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="">Select an event...</option>
              {events.map(event => (
                <option key={event._id} value={event._id.toString()}>{event.eventName}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Max Team Size</label>
            <input
              type="number"
              value={maxTeamSize}
              onChange={(e) => setMaxTeamSize(e.target.value)}
              className="block w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Team Name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setteamName(e.target.value)}
              className="block w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Create Post
          </button>
        </form>
        {message && (
          <p className="text-red-500 text-xs italic mt-4 text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default TeamPostCreate;
