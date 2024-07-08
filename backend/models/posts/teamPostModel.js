import mongoose from 'mongoose';

const teamPostSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
    teamName: {
    type: String,
    required: true,
  },
  maxTeamSize: {
    type: Number,
    required: true,
  },
  interestedUsers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending',
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const TeamPost = mongoose.model('TeamPost', teamPostSchema);
