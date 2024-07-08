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

const TeamSearchPostList = () => {
  const [teamSearchPosts, setTeamSearchPosts] = useState([]);
  const userToken = localStorage.getItem('token');
  const currentUser = userToken ? JSON.parse(atob(userToken.split('.')[1])) : null;

  useEffect(() => {
    fetchTeamSearchPosts();
  }, []);

  const fetchTeamSearchPosts = async () => {
    try {
      const response = await axios.get('https://mern-web-app-api.vercel.app/team-search-posts');
      setTeamSearchPosts(response.data);
    } catch (error) {
      console.error('Error fetching team search posts:', error);
    }
  };

  const handleInterest = async (postId) => {
    try {
      const response = await axios.post(`https://mern-web-app-api.vercel.app/team-search-posts/${postId}/interested`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Update the state to reflect the new interested user
      setTeamSearchPosts(teamSearchPosts.map(post => post._id === postId ? response.data : post));
    } catch (error) {
      console.error('Error expressing interest:', error);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {teamSearchPosts.map(post => (
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
              </div>
            </div>
            <Typography variant="body" color="blue-gray" className="mb-2">
              {post.description}
            </Typography>
          </div>

          {currentUser && post.createdBy._id === currentUser._id && (
            <div className="flex justify-end mt-4">
              <Button variant="outlined" color="blue" size="sm" onClick={() => window.location.href = `/team-search-posts/manage-team/${post._id}`}>
                Manage Team
              </Button>
            </div>
          )}

          {currentUser && (
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

export default TeamSearchPostList;
