import express from 'express';
import jwt from 'jsonwebtoken';
import { TeamPost } from '../../models/posts/teamPostModel.js';
import auth from '../../middleware/auth.js';
import { Event } from '../../models/eventModel.js';
import { User } from '../../models/userModel.js';

const router = express.Router();

// Route to create a new team forming post
router.post('/create', auth, async (req, res) => {
    const { event, maxTeamSize, teamName } = req.body;
  
    try {
      // Validate event existence
      const eventObj = await Event.findById(event);
      if (!eventObj) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      // Create new TeamPost object
      const newTeamPost = new TeamPost({
        event,
        teamName,
        createdBy: req.user._id,
        maxTeamSize,
      });
  
      // Save and respond with created team post
      const savedTeamPost = await newTeamPost.save();
      res.status(201).json(savedTeamPost);
    } catch (error) {
      // Handle errors
      res.status(400).json({ error: error.message });
    }
});

// Route to get all team forming posts
router.get('/', async (req, res) => {
  try {
    const teamPosts = await TeamPost.find().populate('event createdBy interestedUsers.user');
    res.status(200).json(teamPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to express interest in a team forming post
router.post('/:postId/interested', auth, async (req, res) => {
  try {
    const post = await TeamPost.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const alreadyInterested = post.interestedUsers.some(
      (user) => user.user.toString() === req.user._id.toString()
    );

    if (alreadyInterested) {
      return res.status(400).json({ error: 'Already expressed interest' });
    }

    post.interestedUsers.push({ user: req.user._id });
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to accept or decline interest
router.patch('/:postId/interested/:userId', auth, async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const { status } = req.body;

    const post = await TeamPost.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this post' });
    }

    const userInterest = post.interestedUsers.find(
      (user) => user.user.toString() === userId
    );

    if (!userInterest) {
      return res.status(404).json({ error: 'Interest not found' });
    }

    userInterest.status = status;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get a single team post by ID
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await TeamPost.findById(postId).populate('event createdBy interestedUsers.user');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update user status in a team post
router.patch('/:postId/interested', auth, async (req, res) => {
  const { postId } = req.params;
  const { userId, status } = req.body;
  try {
    const post = await TeamPost.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the current user is the creator of the post
    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this post' });
    }

    // Find the interested user in the post
    const userInterest = post.interestedUsers.find(user => user.user.toString() === userId);
    if (!userInterest) {
      return res.status(404).json({ error: 'User interest not found in post' });
    }

    // Update user's status
    userInterest.status = status;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
