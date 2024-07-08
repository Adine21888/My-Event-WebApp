import express from 'express';
import organizerAuth from '../middleware/organizerAuth.js';
import { Event } from '../models/eventModel.js';

const router = express.Router();

// Route to create a new event
router.post('/create', organizerAuth, async (req, res) => {
  const { eventName, eventDescription, eventDate, coverPhotoUrl, titleVideos } = req.body;

  try {
    const newEvent = new Event({
      eventName,
      eventDescription,
      eventDate,
      coverPhotoUrl: coverPhotoUrl || '', // Default value if not provided
      titleVideos: titleVideos || [], // Default value if not provided
      createdBy: req.organizer._id, // Link event to the creating organizer
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Route to get all events
router.get('/', async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


export default router;
