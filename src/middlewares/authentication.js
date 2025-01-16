import jwt from 'jsonwebtoken';
import redisClient from '../config/redis.js';
import routeInfo from '../config/routeInfo.js';

const authenticate = async (req, res, next) => {
  console.log(req);
  const anyAllowed = routeInfo[req.path]?.['permissions'].includes('ANY');

  if(!routeInfo[req.path]) {
    return res.status(404).json({
      error: "no such route"
    });
  }

  if(anyAllowed) {
    next();
    return;
  }

  const token = req.headers["authorization"]?.split(' ')[1];

  if(!token) {
    return res.status(401).json({
      error: 'Token missing'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const session = await redisClient.get(`session:${decoded.user.id}`);
    if(!session) {
      return res.status(401).json({
        error: "Session expired or invalid"
      });
    }

    req.user = JSON.parse(session);
    next();
  } catch(error) {
    res.status(403).json({
      error: "Invalid or expired token"
    })
  }
};

export default authenticate;
