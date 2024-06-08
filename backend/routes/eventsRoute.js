import express from 'express';
import { Event } from '../models/eventModel.js';

const router = express.Router();

// Route to create a new event
router.post('', async (request, response) => {
    try {
        if (!request.body.eventName || !request.body.organizerName) {
            return response.status(400).send({
                message: 'Send all required fields: eventName, organizerName',
            });
        }

        const newEvent = {
            eventName: request.body.eventName,
            organizerName: request.body.organizerName,
        };

        const event = await Event.create(newEvent);
        return response.status(201).send(event);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all events from the database
router.get('', async (request, response) => {
    try {
        const events = await Event.find({});
        return response.status(200).json({
            count: events.length,
            data: events,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get a single event by its ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const event = await Event.findById(id);
        return response.status(200).json(event);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to update an event
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Event.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Event not found!' });
        }
        return response.status(200).send({ message: 'Event updated successfully.' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete an event
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Event.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Event not found!' });
        }
        return response.status(200).send({ message: 'Event deleted successfully.' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
