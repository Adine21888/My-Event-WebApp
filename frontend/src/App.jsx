import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateUser from './pages/users/CreateUser';
import DeleteUser from './pages/users/DeleteUser';
import EditUser from './pages/users/EditUser';
import ShowUser from './pages/users/ShowUser';
import CreateEvent from './pages/events/CreateEvent';
import DeleteEvent from './pages/events/DeleteEvent';
import EditEvent from './pages/events/EditEvent';
import ShowEvent from './pages/events/ShowEvent';

const App = () => {
  return (
    <Routes>
      {/* Routes for users */}
      <Route path='/' element={<Home />} />
      <Route path='/users/create' element={<CreateUser />} />
      <Route path='/users/details/:id' element={<ShowUser />} />
      <Route path='/users/edit/:id' element={<EditUser />} />
      <Route path='/users/delete/:id' element={<DeleteUser />} />

      {/* Routes for events */}
      <Route path='/events/create' element={<CreateEvent />} />
      <Route path='/events/details/:id' element={<ShowEvent />} />
      <Route path='/events/edit/:id' element={<EditEvent />} />
      <Route path='/events/delete/:id' element={<DeleteEvent />} />
    </Routes>
  );
};

export default App;
