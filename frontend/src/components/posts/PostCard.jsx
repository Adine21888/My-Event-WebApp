import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="border rounded p-4 m-2">
      <h2 className="text-xl font-bold">{post.teamName || post.description}</h2>
      <p>Event: {post.event.name}</p>
      <p>Created by: {post.createdBy.name}</p>
      <p>Max Team Size: {post.maxTeamSize}</p>
      <p>Interested Users: {post.interestedUsers.length}</p>
    </div>
  );
};

export default PostCard;
