import express from "express";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import redisClient from '../config/redis.js';

import dotenv from 'dotenv';

dotenv.config();

const AUTH_SERVICE_URL = `${process.env.USER_SERVICE_URL}/api/user/login`;
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
      role: userRole
    });

    if(authResponse.status !== 200) {
      console.log(authResponse.data)
      return res.status(authResponse.status).json(authResponse.data);
    }

    const user = authResponse.data;
    console.log(user);
    const sessionData = {
      user: user,
      createdAt: new Date().toISOString()
    }

    console.log(user);
    const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: SESSION_EXPIRY_SECONDS * 1000}); // time in ms

    await redisClient.set(`session:${token}`, JSON.stringify(sessionData), {
      EX: SESSION_EXPIRY_SECONDS
    });

    return res.status(200).json({
      token,
      user: sessionData.user
    });
  } catch(error) {
    console.log(AUTH_SERVICE_URL, process.env.USER_SERVICE_URL);
    console.error("Login error: ", error.message, error.response?.data);
    res.status(500).json({
      error: "Login failed"
    })
  }
});

export default router;
