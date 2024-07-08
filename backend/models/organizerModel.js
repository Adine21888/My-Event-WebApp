import mongoose from 'mongoose';

const organizerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    university: String,
    country: String,
    password: {
      type: String,
      required: true
    },
    tokens: [{
      token: {
        type: String,
        required: true
      }
    }]
  },
  {
    timestamps: true
  }
);

export const Organizer = mongoose.model('Organizer', organizerSchema);
