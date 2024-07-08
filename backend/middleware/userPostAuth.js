import jwt from 'jsonwebtoken';


// Middleware to authenticate users using JWT
const userAuth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'Authorization denied, token missing.' });
    }
  
    try {
      const decoded = jwt.verify(token, 'your_secret_key');
      if (decoded.role !== 'user') { // Ensure only users can access
        return res.status(403).json({ error: 'Access denied, users only.' });
      }
      req.user = decoded; // Attach user data to request object
      next();
    } catch (error) {
      res.status(401).json({ error: 'Token is not valid.' });
    }
  };