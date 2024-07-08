import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

const PostCard = ({ post }) => {
  return (
    <Card className="w-96 m-4">
      <CardHeader floated={false} className="h-80">
        <img
          src={post.event.coverPhotoUrl || "https://via.placeholder.com/150"}
          alt="event-cover"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {post.teamName || post.description}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          Event: {post.event.name}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          Created by: {post.createdBy.name}
        </Typography>
        {post.maxTeamSize && (
          <Typography color="blue-gray" className="font-medium" textGradient>
            Max Team Size: {post.maxTeamSize}
          </Typography>
        )}
        <Typography color="blue-gray" className="font-medium" textGradient>
          Interested Users: {post.interestedUsers?.length || 'N/A'}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Event Date">
          <Typography
            as="span"
            variant="lead"
            color="blue"
            textGradient
          >
            {new Date(post.event.eventDate).toDateString()}
          </Typography>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
