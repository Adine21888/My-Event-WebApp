import { Event } from '../models/eventModel.js';

// Controller function to create a new event
export const createEvent = async (req, res) => {
  const { eventName, eventDescription, eventDate, coverPhotoUrl, titleVideos } = req.body;
  
  try {
    const newEvent = new Event({
      eventName,
      eventDescription,
      eventDate,
      coverPhotoUrl,
      titleVideos,
      createdBy: req.organizer._id, // Link event to the creating organizer
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
