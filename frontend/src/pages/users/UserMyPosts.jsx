import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../../contexts/AuthContext';
import PostCard from '../../components/posts/PostCard'; 

const UserMyPosts = () => {
  const { user, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    axios.get(`http://localhost:5555/users/${user._id}/posts`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      setPosts(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching user posts:', error);
      setLoading(false);
    });
  }, [user, token]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-wrap justify-center p-4">
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      )}
    </div>
  );
};

export default UserMyPosts;
