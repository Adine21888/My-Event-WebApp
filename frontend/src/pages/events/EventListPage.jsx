import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../../components/home/EventCard';
import Spinner from '../../components/Spinner';
// import Navbar from '../Navbar'; // Update path as per your project structure
import NavbarDefault from '../../components/NavbarDefault';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5555/events')
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <NavbarDefault />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center p-4">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;
