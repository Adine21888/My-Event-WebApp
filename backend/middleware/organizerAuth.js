import jwt from 'jsonwebtoken';
import { Organizer } from '../models/organizerModel.js';

const organizerAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'your_organizer_secret_key');
        const organizer = await Organizer.findOne({ _id: decoded._id });

        if (!organizer) {
            throw new Error();
        }

        req.token = token;
        req.organizer = organizer;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

export default organizerAuth;
