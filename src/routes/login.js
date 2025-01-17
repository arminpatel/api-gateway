import express from "express";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import redisClient from '../config/redis.js';

const AUTH_SERVICE_URL = `${process.env.USER_SERVICE_URL}/api/login`;
const SESSION_EXPIRY_SECONDS = 3600;

const router = express.Router();

// login
router.post('/login', async (req, res) => {
  console.log("Hello");
  const { userEmail, password, userRole } = req.body;

  if(!userEmail || !password || !userRole) {
    return res.status(400).json({
      error: "userEmail, password and userRole are required"
    });
  }

  try {
    const authResponse = await axios.post(AUTH_SERVICE_URL, {
      userEmail,
      password,
      userRole
    });

    console.log(authResponse);

    if(authResponse.status !== 200) {
      return res.status(authResponse.status).json(authResponse.data);
    }

    const user = authResponse.data;
    const sessionData = {
      user: user.data,
      createdAt: new Date().toISOString()
    }

    const token = jwt.sign({userEmail}, process.env.JWT_SECRET, {expiresIn: SESSION_EXPIRY_SECONDS * 1000}) // time in ms

    await redisClient.set(`session:${token}`, JSON.stringify(sessionData), {
      EX: SESSION_EXPIRY_SECONDS
    });

    return res.status(200).json({
      token,
      user: sessionData.user
    });
  } catch(error) {
    console.error("Login error: ", error.message);
    res.status(500).json({
      error: "Login failed"
    })
  }
});

export default router;
