import React from 'react';
import NavbarDefault from '../components/NavbarDefault';
import CarouselComponent from '../components/CarouselComponent';
import Sidebar from '../components/Sidebar';
import EventList from './events/EventList';

const UserHome = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Navbar */}
      <div className="h-1/10 bg-white shadow-md fixed top-0 left-0 w-full z-10">
        <NavbarDefault />
      </div>
      <div className="flex flex-row mt-10 h-9/10"> {/* Adjusted for fixed navbar height */}
        {/* Fixed Sidebar */}
        <div className="hidden sm:block w-1/5 h-full fixed top-16 left-0 bg-white shadow-md z-10">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-100 mt-10 pl-100 overflow-y-auto"> {/* Adjust margin to prevent overlap with sidebar */}
          <div className="container mx-auto py-8 pl-[23rem] pr-[2.5rem]">
            <CarouselComponent />
            <div className="mt-8">
              {/* Main content area */}
              <h2 className="text-2xl font-bold mb-4">Latest Events</h2>
              {/* Display latest events here */}
              <EventList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
