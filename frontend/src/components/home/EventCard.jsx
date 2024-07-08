import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

const EventCard = ({ event }) => {
  return (
    <Card className="w-96 m-4">
      <CardHeader floated={false} className="h-80">
        <img src={event.coverPhotoUrl || "https://via.placeholder.com/150"} alt="event-cover" className="h-full w-full object-cover" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {event.eventName}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          {event.eventDescription}
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
            {new Date(event.eventDate).toDateString()}
          </Typography>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
