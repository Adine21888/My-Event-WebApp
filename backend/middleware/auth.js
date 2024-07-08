import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

// const auth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '');
//         const decoded = jwt.verify(token, 'your_secret_key');
//         const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

//         if (!user) {
//             throw new Error();
//         }

//         req.token = token;
//         req.user = user;
//         next();
//     } catch (error) {
//         res.status(401).send({ error: 'Please authenticate.' });
//     }
// };

// Middleware to authenticate users using JWT

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'your_secret_key');

    // // Ensure only users can access
    // if (decoded.role !== 'user') {
    //   return res.status(403).json({ error: 'Access denied, users only.' });
    // }

    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};


export default auth;
