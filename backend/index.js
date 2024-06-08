import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { User } from "./models/userModel.js";
import usersRoute from "./routes/usersRoute.js";
import eventsRoute from "./routes/eventsRoute.js"
import cors from 'cors';



const app = express();

//Middle-ware to parsing request body
app.use(express.json());

//Middle-ware to handle cors poilicy
//option 1
// app.use(cors());
//option 2
app.use(
    cors({
        origin: 'http://localhost:5555',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to Trial Project')
});

//Middle-ware for routes
app.use('/users', usersRoute); 
app.use('/events', eventsRoute);

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