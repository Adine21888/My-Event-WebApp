// ManageTeam.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";

const ManageTeam = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://mern-web-app-api.vercel.app/team-posts/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const handleUserStatus = async (userId, status) => {
    try {
      const response = await axios.patch(`http://mern-web-app-api.vercel.app/team-posts/${postId}/interested`, {
        userId,
        status,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPost(response.data);
    } catch (error) {
      console.error(`Error updating user status to ${status}:`, error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full p-4 shadow-lg">
      <Typography variant="h5" color="blue-gray" className="mb-4">
        Manage Team for {post.teamName}
      </Typography>
      <List>
        {post.interestedUsers.map((user, index) => (
          <ListItem key={index}>
            <ListItemPrefix>
              <Avatar variant="circular" alt={user.user.name} src="https://via.placeholder.com/150" />
            </ListItemPrefix>
            <div className="flex justify-between w-full">
              <div>
                <Typography variant="h6" color="blue-gray">
                  {user.user.name}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  Status: {user.status}
                </Typography>
              </div>
              {user.status === 'pending' && (
                <div className="flex gap-2">
                  <Button variant="filled" color="green" size="sm" onClick={() => handleUserStatus(user.user._id, 'accepted')}>
                    Accept
                  </Button>
                  <Button variant="filled" color="red" size="sm" onClick={() => handleUserStatus(user.user._id, 'declined')}>
                    Decline
                  </Button>
                </div>
              )}
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default ManageTeam;
