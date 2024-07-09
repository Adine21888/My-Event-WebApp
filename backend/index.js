import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { User } from "./models/userModel.js";
import usersRoute from "./routes/usersRoute.js";
import organizerRoute from "./routes/organizerRoute.js";
import eventRoute from "./routes/eventRoute.js";
import teamPostRoute from "./routes/posts/teamPostRoute.js"
import teamSearchRoute from "./routes/posts/teamSearchRoute.js"
import cors from 'cors';



const app = express();

//Middle-ware to parsing request body
app.use(express.json());

//Middle-ware to handle cors poilicy
//option 1
app.use(cors(
  {
    origin: 'https://mern-web-app-frontend.vercel.app', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true
  }
));
//CORS configuration 2
// const corsOptions = {
//     origin: 'https://mern-web-app-frontend.vercel.app', // Allow only this origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     // allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
//     credentials: true
//   };
  
  // Apply CORS middleware
  // app.use(cors(corsOptions));
  // app.options('*', cors(corsOptions)); // Enable preflight requests for all routes
  
  // Middleware to ensure CORS headers are present
//   app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://mern-web-app-frontend.vercel.app');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });

//Middle-ware for routes
app.use('/users', usersRoute); 
app.use('/events', eventRoute);
app.use('/organizers', organizerRoute);
app.use('/team-posts', teamPostRoute);
app.use('/team-search-posts', teamSearchRoute);


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App is connected to the database');

        app.listen(PORT, ()=>{
            console.log(`App is listening to port: ${PORT}`);
        });

    })
    .catch((error) => {
        console.log(error)
    });