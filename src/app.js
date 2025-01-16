import express from 'express';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';

dotenv.config();

import authentication from './middlewares/authentication.js';
import authorize from './middlewares/authorize.js';
import injectUserDetails from './middlewares/injectUserDetails.js';
import forwardRequest from './middlewares/forwardRequest.js';
import loginRouter from './routes/login.js';
import sessionRouter from './routes/session.js';

const app = express();
app.use(bodyParser.json());

app.use('/api/session', sessionRouter);
app.use('/api', loginRouter);
app.use(authentication, authorize, injectUserDetails, forwardRequest);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`API Gateway active on port ${PORT}`);
});

