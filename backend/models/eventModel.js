import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  coverPhotoUrl: {
    type: String,
    default: '', // Optional field for cover photo URL
  },
  titleVideos: [
    {
      title: {
        type: String,
        required: true,
      },
      videoUrl: {
        type: String,
        default: '', // Optional field for video URL
      },
    }
  ]
});

export const Event = mongoose.model('Event', eventSchema);
