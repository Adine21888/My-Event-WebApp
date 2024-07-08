// organizerRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Organizer } from '../models/organizerModel.js';
import organizerAuth from '../middleware/organizerAuth.js';

const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
  const { name, email, university, country, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const organizer = new Organizer({ name, email, university, country, password: hashedPassword });
    await organizer.save();
    res.status(201).send(organizer);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const organizer = await Organizer.findOne({ email });
    if (!organizer || !await bcrypt.compare(password, organizer.password)) {
      throw new Error('Invalid login credentials');
    }
    const token = jwt.sign({ _id: organizer._id }, 'your_organizer_secret_key');
    organizer.tokens = organizer.tokens.concat({ token }); // Add token to organizer tokens array
    await organizer.save();
    res.send({ organizer, token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get Organizer Profile
router.get('/profile/:id', organizerAuth, async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.id).select('-password'); // Exclude password field
    if (!organizer) {
      return res.status(404).send();
    }
    res.send(organizer);
  } catch (error) {
    res.status(500).send();
  }
});

// Update Organizer Profile
router.patch('/profile/:id', organizerAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'password', 'email', 'university', 'country'];

  // Ensure the authenticated organizer can only update their own profile
  if (req.params.id !== req.organizer._id.toString()) { // Use req.organizer._id and convert to string
    return res.status(403).send({ error: 'You are not authorized to update this profile.' });
  }

  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const organizer = await Organizer.findById(req.params.id);
    if (!organizer) {
      return res.status(404).send({ error: 'Organizer not found.' });
    }

    updates.forEach(update => organizer[update] = req.body[update]);
    await organizer.save();

    res.send(organizer);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete Organizer Account
router.delete('/profile/:id', organizerAuth, async (req, res) => {
  const organizerId = req.params.id;

  try {
    // Check if the authenticated organizer is deleting their own account
    if (organizerId !== req.organizer._id.toString()) { // Use req.organizer._id and convert to string
      return res.status(403).send({ error: 'You are not authorized to delete this account.' });
    }

    const organizer = await Organizer.findByIdAndDelete(organizerId);
    if (!organizer) {
      return res.status(404).send({ error: 'Organizer not found.' });
    }

    res.status(200).send({ message: 'Organizer deleted successfully.' });
  } catch (error) {
    res.status(500).send({ error: 'Server error.' });
  }
});

export default router;
