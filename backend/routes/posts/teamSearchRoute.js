import express from 'express';
import jwt from 'jsonwebtoken';
import TeamSearchPost from '../../models/posts/teamSearchPostModel.js';
import auth from '../../middleware/auth.js';
import { Event } from '../../models/eventModel.js';
import { User } from '../../models/userModel.js';

const router = express.Router();

// Route to create a new team search post
router.post('/create', auth, async (req, res) => {
  const { event, description } = req.body;

  try {
    // Validate event existence
    const eventObj = await Event.findById(event);
    if (!eventObj) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Create new TeamSearchPost object
    const newTeamSearchPost = new TeamSearchPost({
      event,
      description,
      createdBy: req.user._id,
    });

    // Save and respond with created team search post
    const savedTeamSearchPost = await newTeamSearchPost.save();
    res.status(201).json(savedTeamSearchPost);
  } catch (error) {
    // Handle errors
    res.status(400).json({ error: error.message });
  }
});

// Route to get all team search posts
router.get('/', async (req, res) => {
  try {
    const teamSearchPosts = await TeamSearchPost.find().populate('event createdBy');
    res.status(200).json(teamSearchPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a specific team search post
router.get('/:postId', async (req, res) => {
  try {
    const post = await TeamSearchPost.findById(req.params.postId).populate('event createdBy');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
