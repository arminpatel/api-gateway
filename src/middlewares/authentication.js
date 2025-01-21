import jwt from 'jsonwebtoken';
import redisClient from '../config/redis.js';

const authenticate = async (req, res, next) => {
  const routeDetails = req.gateway_route_details;

  if(!routeDetails) {
    return res.status(404).json({
      error: "no such route",
    });
  }

  const anyAllowed = routeDetails['permissions'].includes('ANY');

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
    console.log(decoded);
    const session = await redisClient.get(`session:${token}`);
    console.log(token);
    if(!session) {
      return res.status(401).json({
        error: "Session expired or invalid"
      });
    }

    req.user = JSON.parse(session);
    next();
  } catch(error) {
    console.log("hello",error);
    res.status(403).json({
      error: "Invalid or expired token"
    })
  }
};

export default authenticate;
