// src/pages/posts/TeamPostList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Progress,
  Button,
} from "@material-tailwind/react";

const TeamPostList = () => {
  const [teamPosts, setTeamPosts] = useState([]);

  useEffect(() => {
    fetchTeamPosts();
  }, []);

  const fetchTeamPosts = async () => {
    try {
      const response = await axios.get('http://mern-web-app-api.vercel.app/team-posts');
      setTeamPosts(response.data);
    } catch (error) {
      console.error('Error fetching team posts:', error);
    }
  };

  const handleInterest = async (postId) => {
    try {
      const response = await axios.post(`http://mern-web-app-api.vercel.app/team-posts/${postId}/interested`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Update the state to reflect the new interested user
      setTeamPosts(teamPosts.map(post => post._id === postId ? response.data : post));
    } catch (error) {
      console.error('Error expressing interest:', error);
    }
  };

  const userToken = localStorage.getItem('token');
  const currentUser = userToken ? JSON.parse(atob(userToken.split('.')[1])) : null;

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {teamPosts.map(post => (
        <Card key={post._id} className="w-96 mb-4 p-4 shadow-lg">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Avatar variant="circular" alt={post.createdBy.name} src="https://via.placeholder.com/150" />
              <div className="ml-4">
                <Typography variant="h6" color="blue-gray">
                  {post.createdBy.name}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {post.event.eventName}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  Team: {post.teamName}
                </Typography>
              </div>
            </div>
            <Progress value={(post.interestedUsers.filter(user => user.status === 'accepted').length / post.maxTeamSize) * 100} size="sm" color="blue" />
            <Typography variant="small" color="gray" className="mt-2">
              {post.interestedUsers.filter(user => user.status === 'accepted').length}/{post.maxTeamSize} team members
            </Typography>
          </div>

          <List>
            {post.interestedUsers.filter(user => user.status === 'accepted').map((user, index) => (
              <ListItem key={index}>
                <ListItemPrefix>
                  <Avatar variant="circular" alt={user.user.name} src="https://via.placeholder.com/150" />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {user.user.name}
                  </Typography>
                </div>
              </ListItem>
            ))}
          </List>

          {currentUser && post.createdBy._id === currentUser._id && (
            <div className="flex justify-end mt-4">
              <Button variant="outlined" color="blue" size="sm" onClick={() => window.location.href = `/team-posts/manage-team/${post._id}`}>
                Manage Team
              </Button>
            </div>
          )}

          {currentUser && post.createdBy._id !== currentUser._id && post.interestedUsers.length < post.maxTeamSize && !post.interestedUsers.some(user => user.user._id === currentUser._id) && (
            <div className="flex justify-end mt-4">
              <Button variant="filled" color="blue" size="sm" onClick={() => handleInterest(post._id)}>
                Interested? Click to join
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default TeamPostList;
