import React from 'react';
//import NavbarDefault from '../components/NavbarDefault';
import NavbarOrganizer from '../components/NavbarOrganizer';
import CarouselComponent from '../components/CarouselComponent';
//import Sidebar from '../components/Sidebar';
import SidebarOrganizer from '../components/SidebarOrganizer';
import EventList from './events/EventList';

const OrganizerHome = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <NavbarOrganizer />
      {/* Content */}
      {/* <div className="flex flex-1"> */}
        {/* Sidebar */}
        {/* <div className="hidden sm:block w-1/4">
          <SidebarOrganizer />
        </div> */}

        {/* Main Content */}
        {/* <div className="flex-1">
          <div className="container mx-auto px-4 py-8 ">
            <CarouselComponent />
            <div className="mt-8"> */}
              {/* Main content area */}
              {/* <h2 className="text-2xl font-bold mb-4">Latest Events</h2> */}
              {/* Display latest events here */}
              {/* <EventList /> */}
            {/* </div> */}
          {/* </div> */}
        {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default OrganizerHome;
