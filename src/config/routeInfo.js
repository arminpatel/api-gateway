import dotenv from 'dotenv';
import sessionRouter from '../routes/session.js';

dotenv.config();
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL;
const RESTAURANT_SERVICE_URL = process.env.RESTAURANT_SERVICE_URL;
const DELIVERY_SERVICE_URL = process.env.DELIVERY_SERVICE_URL;

console.log(USER_SERVICE_URL);

const routeInfo = [
  {
    path: '/api/session',
    method: 'PUT',
    permissions: ['AUTHENTICATED'],
    isLocal: true,
    router: sessionRouter
  },
  {
    path: '/api/user/signUp',
    method: 'POST',
    permissions: ['ANY'],
    serviceAddress: USER_SERVICE_URL
  },
  {
    path: '/api/user/changePassword',
    method: 'PUT',
    permissions: ['AUTHENTICATED'],
    serviceAddress: USER_SERVICE_URL
  }
]

export default routeInfo;
