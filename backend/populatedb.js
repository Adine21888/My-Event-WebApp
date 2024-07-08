import mongoose from 'mongoose';
import { User } from './models/userModel.js'; // Adjust the path as per your project structure

const MONGODB_URI = 'mongodb+srv://root:1234@web-app-mern.jcnojz4.mongodb.net/profiles-collection?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'profiles-collection', // Specify your database name explicitly
});

const db = mongoose.connection;

db.once('open', async () => {
  console.log('Connected to MongoDB database');

  try {
    // Remove all existing users (optional)
    await User.deleteMany({});

    const users = [];

    for (let i = 0; i < 100; i++) {
      const year = 2020 + Math.floor(i / 25); // Years will be 2020, 2021, 2022, 2023 for 25 users each
      const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generate random 4-digit number
      const regNo = `EG/${year}/${randomDigits}`;
      const name = `User-${i + 1}`; // Example name format (can be any random name)

      users.push({ name, regNo });
    }

    await User.insertMany(users);
    console.log('Database populated with 100 users');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    // Close the connection after populating the database
    mongoose.disconnect();
  }
});
