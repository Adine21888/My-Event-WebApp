import mongoose from 'mongoose';

const teamSearchPostSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TeamSearchPost = mongoose.model('TeamSearchPost', teamSearchPostSchema);

export default TeamSearchPost;
