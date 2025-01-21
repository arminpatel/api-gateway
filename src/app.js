import express from 'express';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import authentication from './middlewares/authentication.js';
import authorize from './middlewares/authorize.js';
import injectUserDetails from './middlewares/injectUserDetails.js';
import forwardRequest from './middlewares/forwardRequest.js';
import loginRouter from './routes/login.js';
import injectRouteDetails from './middlewares/injectRouteDetails.js';

import routeInfo from './config/routeInfo.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.put('/api/user/restaurant-manager/:userEmail/link-restaurant', (req, res) => {
  const {userEmail} = req.params;
  const restaurantId = req.body.restaurantId;

  console.log(userEmail, restaurantId, req.body);

  return res.status(200).json({
    "hello": "world"
  })
})

app.use('/api', loginRouter);

app.use((req, res, next) => {
  console.log("got request for ", req.path, "with", req.method);
  next();
});

for(let ind in routeInfo) {
  const route = routeInfo[ind];
  if(route.isLocal) {
    app.use(route.path, route.router);
  } else if(route.method === 'GET') {
    app.get(route.path, injectRouteDetails(route));
  } else if(route.method ==='POST') {
    app.post(route.path, injectRouteDetails(route));
  } else if(route.method === 'PUT') {
    app.put(route.path, injectRouteDetails(route));
  } else if(route.method === 'PATCH') {
    app.patch(route.path, injectRouteDetails(route));
  } else if(route.method === 'DELETE') {
    app.delete(route.path, injectRouteDetails(route));
  }
}

app.use(authentication, authorize, injectUserDetails, forwardRequest);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`API Gateway active on port ${PORT}`);
});

