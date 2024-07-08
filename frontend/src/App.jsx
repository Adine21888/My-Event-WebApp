import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import UserSignIn from './pages/users/UserSignIn';
import UserSignUp from './pages/users/UserSignUp';
import ProfilePage from './pages/users/ProfilePage';
import DeleteUser from './pages/users/DeleteUser';
import EditUser from './pages/users/EditUser';
import ShowUser from './pages/users/ShowUser';

import OrganizerSignIn from './pages/organizers/OrganizerSignIn';
import OrganizerSignUp from './pages/organizers/OrganizerSignUp';
import OrganizerProfile from './pages/organizers/OrganizerProfile';

import Login from './pages/Login';

import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from '../contexts/AuthContext';
import AuthProvider from '../contexts/AuthContext';
import OrganizerAuthProvider from '../contexts/OrganizerAuthContext';
import OrganizerPrivateRoute from './components/OrganizerPrivateRoute';
import EditOrganizer from './pages/organizers/EditOrganizer';
import DeleteOrganizer from './pages/organizers/DeleteOrganizer';

import CreateEventForm from './pages/posts/CreateEventForm';
import EventList from './pages/events/EventList';

import TeamPostCreate from './pages/posts/TeamPostCreate';
// import TeamPostList from './pages/posts/TeamPostList';
import TeamPostList from './pages/posts/TeamPostList';
import DetailedPostView from './components/posts/DetailedPostView';
import ManageTeam from './pages/posts/ManageTeam';
import CreareTeamSearchPost from './pages/posts/CreareTeamSearchPost';
import TeamSearchPostList from './pages/posts/TeamSearchPostList';

import UserHome from './pages/UserHome';
import Posts from './pages/Posts';
import EventListPage from './pages/events/EventListPage';
import UserMyPosts from './pages/users/UserMyPosts';


const App = () => {
  return (
    <AuthProvider>
      <OrganizerAuthProvider>
        <Routes>
          {/* Routes */}
          <Route path='/' element={<Home />} />

          {/* Routes for users */}
          <Route path='/users/details/:id' element={<ShowUser />} />
          <Route path='/users/delete/:id' element={<DeleteUser />} />


          {/* Sign in or Sign up for users */}
          <Route path='/users/signin' element={<UserSignIn />} />
          <Route path='/users/signup' element={<UserSignUp />} />
          <Route path="/users/profile/:id" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path='/users/edit/:id' element={<PrivateRoute><EditUser /></PrivateRoute>} />

          {/* Sign in or Sign up for organizers */}
          <Route path='/organizers/signin' element={<OrganizerSignIn />} />
          <Route path='/organizers/signup' element={<OrganizerSignUp />} />
          <Route path="/organizers/profile/:id" element={<OrganizerPrivateRoute><OrganizerProfile /></OrganizerPrivateRoute>} />
          <Route path='/organizers/edit/:id' element={<OrganizerPrivateRoute><EditOrganizer /></OrganizerPrivateRoute>} />
          <Route path='/organizers/delete/:id' element={<DeleteOrganizer />} />

          {/* Login */}
          <Route path='/login' element={<Login />} />


          <Route path='/organizers/events/create' element={<OrganizerPrivateRoute><CreateEventForm /></OrganizerPrivateRoute>} />
          <Route path='/events' element={<EventList />} />
          
          <Route path='/team-posts' element={<TeamPostList />} />
          <Route path='/team-posts/create' element={<TeamPostCreate />} />
          <Route path='/team-posts/:id' element={<DetailedPostView />} />
          <Route path="/team-posts/manage-team/:postId" element={<ManageTeam />} />
          <Route path="/team-search-posts/create" element={<CreareTeamSearchPost />} />
          <Route path="/team-search-posts" element={<PrivateRoute><TeamSearchPostList /></PrivateRoute>} />
          
          <Route path='/user-home' element={<PrivateRoute><UserHome /></PrivateRoute>} />
          <Route path='/posts' element={<PrivateRoute><Posts /></PrivateRoute>} />
          <Route path='/page-events' element={<PrivateRoute><EventListPage /></PrivateRoute>} />
          <Route path='/users/myposts/:id' element={<PrivateRoute><UserMyPosts /></PrivateRoute>} />
          
          
          
          

        </Routes>
      </OrganizerAuthProvider>
    </AuthProvider>
  );
};

export default App;
