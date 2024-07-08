import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import auth from '../middleware/auth.js';

const router = express.Router();  

// Sign Up
router.post('/signup', async (req, res) => {
    const { regNo, name, email, password, university, country } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ regNo, name, email, university, country, password: hashedPassword });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Sign In
router.post('/signin', async (req, res) => {
    const { regNo, password } = req.body;
    try {
        const user = await User.findOne({ regNo });
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error('Invalid login credentials');
        }
        const token = jwt.sign({ _id: user._id }, /*{  role: 'user' },*/ 'your_secret_key');
        user.tokens = user.tokens.concat({ token }); // Add token to user tokens array
        await user.save();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Get any User Profile
router.get('/profile/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclude password field
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
});

// Update User Profile
router.patch('/profile/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['regNo', 'name', 'password', 'email', 'university', 'country'];
  
    // Ensure the authenticated user can only update their own profile
    if (req.params.id !== req.user._id.toString()) { // Use req.user._id and convert to string
      return res.status(403).send({ error: 'You are not authorized to update this profile.' });
    }
  
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }
  
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send({ error: 'User not found.' });
      }
  
      updates.forEach(update => user[update] = req.body[update]);
      await user.save();
  
      res.send(user);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
  

// Delete User Account
router.delete('/profile/:id', auth, async (req, res) => {
    const userId = req.params.id;

    try {
        // Check if the authenticated user is deleting their own account
        if (userId !== req.user._id.toString()) { // Use req.user._id and convert to string
            return res.status(403).send({ error: 'You are not authorized to delete this account.' });
        }

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found.' });
        }

        res.status(200).send({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: 'Server error.' });
    }
});

export default router;
