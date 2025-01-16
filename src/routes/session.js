import express from "express";
import authenticate from "../middlewares/authentication.js";
import redisClient from "../config/redis.js";

const router = express.Router();

//router.use(authenticate);
router.put('/', async (req, res) => {
  const { session } = req.body;

  if(!session) {
    return res.status(400).json({
      error: "session details not found"
    });
  }

  const token = req.headers["authorization"]?.split(' ')[1];

  console.log(token);

  try {
    await redisClient.set(`session:${token}`, JSON.stringify(session), {
      KEEPTTL: true
    });
    return res.status(200).json({
      data: "update successful"
    })
  } catch(error) {
    console.log(error.message);
    return res.status(500).json({
      data: "update failed"
    });
  }
});

export default router;
