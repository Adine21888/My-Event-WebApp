import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { OrganizerAuthContext } from '../../../contexts/OrganizerAuthContext';

const CreateEventForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [coverPhotoUrl, setCoverPhotoUrl] = useState('');
  const [titleVideos, setTitleVideos] = useState([{ title: '', videoUrl: '' }]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(OrganizerAuthContext); // Get the token 
  const navigate = useNavigate();

  const handleAddTitleVideo = () => {
    setTitleVideos([...titleVideos, { title: '', videoUrl: '' }]);
  };

  const handleRemoveTitleVideo = (index) => {
    const updatedTitleVideos = [...titleVideos];
    updatedTitleVideos.splice(index, 1);
    setTitleVideos(updatedTitleVideos);
  };

  const handleTitleVideoChange = (index, field, value) => {
    const updatedTitleVideos = [...titleVideos];
    updatedTitleVideos[index][field] = value;
    setTitleVideos(updatedTitleVideos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const eventDetails = {
      eventName,
      eventDescription,
      eventDate,
      coverPhotoUrl,
      titleVideos: titleVideos.filter(video => video.title || video.videoUrl), // Filter out empty title videos
    };

    axios.post('https://mern-web-app-api.vercel.app/events/create', eventDetails, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        setLoading(false);
        alert('Event created successfully!');
        navigate('/'); // Redirect to homepage or event list
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred while creating the event. Please try again.');
        console.error('Error:', error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl mb-8">Create Event</h1>
      {loading && <Spinner />}
      <form onSubmit={handleSubmit} className="max-w-lg w-full">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full"
          required
        />
        <textarea
          placeholder="Event Description"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full h-32 resize-none"
          required
        />
        <input
          type="date"
          placeholder="Event Date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full"
          required
        />
        <input
          type="url"
          placeholder="Cover Photo URL (Optional)"
          value={coverPhotoUrl}
          onChange={(e) => setCoverPhotoUrl(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full"
        />
        <h2 className="text-xl mb-2">Title Videos (Optional)</h2>
        {titleVideos.map((titleVideo, index) => (
          <div key={index} className="flex items-center mb-4">
            <input
              type="text"
              placeholder={`Title ${index + 1} (Optional)`}
              value={titleVideo.title}
              onChange={(e) => handleTitleVideoChange(index, 'title', e.target.value)}
              className="mr-2 px-4 py-2 border rounded w-1/2"
            />
            <input
              type="url"
              placeholder="Video URL (Optional)"
              value={titleVideo.videoUrl}
              onChange={(e) => handleTitleVideoChange(index, 'videoUrl', e.target.value)}
              className="mr-2 px-4 py-2 border rounded w-1/2"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveTitleVideo(index)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddTitleVideo}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Title Video
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
