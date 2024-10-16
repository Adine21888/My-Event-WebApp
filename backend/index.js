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
app.use(cors());
//option 2
// app.use(
//     cors({
//         origin: 'https://mern-web-app-frontend.vercel.app',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type', 'Authorization'],
//         credentials: true
//     })
// );

// app.options('*', cors()); // Enable preflight across the board

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://your-frontend.vercel.app');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });
  

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to Trial Project 01')
});

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
