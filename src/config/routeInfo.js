import dotenv from 'dotenv';
import sessionRouter from '../routes/session.js';

dotenv.config();
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL;
const RESTAURANT_SERVICE_URL = process.env.RESTAURANT_SERVICE_URL;
const DELIVERY_SERVICE_URL = process.env.DELIVERY_SERVICE_URL;

const routeInfo = [
  {
    path: '/api/session',
    method: 'PUT',
    permissions: ['AUTHENTICATED'],
    isLocal: true,
    router: sessionRouter
  },
  {
    path: '/api/login',
    method: 'POST',
    permissions: ['ANY'],
    router: USER_SERVICE_URL
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
  }, 
  {
    path: '/api/user/profile/:userEmail',
    method: 'PUT',
    permissions: ['AUTHENTICATED'],
    serviceAddress: USER_SERVICE_URL
  },
  {
    path: '/api/user/profile/:email/:role',
    method: 'GET',
    permissions: ['AUTHENTICATED'],
    serviceAddress: USER_SERVICE_URL
  },
  {
    path: '/api/address/addAddress',
    method: 'POST',
    permissions: ['AUTHENTICATED'],
    serviceAddress: USER_SERVICE_URL
  },  
  {
    path: '/api/address/getAddresses/:userEmail',
    method: 'GET',
    permissions: ['AUTHENTICATED'],
    serviceAddress: USER_SERVICE_URL
  },
  {
    path: '/api/restaurant',
    method: 'GET',
    permissions: ['AUTHENTICATED'],
    serviceAddress: RESTAURANT_SERVICE_URL
  },
  {
    path: '/api/restaurant',
    method: 'POST',
    permissions: ['AUTHENTICATED'],
    serviceAddress: RESTAURANT_SERVICE_URL
  },
  {
    path: '/api/restaurant/:id',
    method: 'GET',
    permissions: ['AUTHENTICATED'],
    serviceAddress: RESTAURANT_SERVICE_URL
  },
  {
    path: '/api/restaurant/:id',
    method: 'PUT',
    permissions: ['AUTHENTICATED'],
    serviceAddress: RESTAURANT_SERVICE_URL
  }
  ,{
    path: '/api/orders',
    method: 'POST',
    permissions: ['AUTHENTICATED'],
    serviceAddress: ORDER_SERVICE_URL
  },
  {
    path: '/api/orders/:orderId',
    method: 'GET',
    permissions: ['AUTHENTICATED'],
    serviceAddress: ORDER_SERVICE_URL
  },
  {
    path: '/api/orders/customer/:customerId',
    method: 'GET',
    permissions: ['AUTHENTICATED'],
    serviceAddress: ORDER_SERVICE_URL
  },
  {
    path: '/api/orders/restaurant/current/:restaurantId',
    method: 'GET',
    permissions: ['AUTHENTICATED'],
    serviceAddress: ORDER_SERVICE_URL
  },
  {
    path: '/api/orders/restaurant/:restaurantId',
    method: 'GET',
    permissions: ['AUTHENTICATED'],
    serviceAddress: ORDER_SERVICE_URL
  },
  {
    path: '/api/orders/compute-order-value',
    method: 'POST',
    permissions: ['AUTHENTICATED'],
    serviceAddress: ORDER_SERVICE_URL
  },
  {
    path: '/api/restaurant/:restaurantId/menu-item/:itemId',
    method: 'DELETE',
    permissions: ['AUTHENTICATED'],
    serviceAddress: RESTAURANT_SERVICE_URL
  },
  {
    path: '/api/restaurant/:restaurantId/menu-item/:itemId',
    method: 'PUT',
    permissions: ['AUTHENTICATED'],
    serviceAddress: RESTAURANT_SERVICE_URL
  }
  ,
  {
    path: '/api/restaurant/:restaurantId/menu-item',
    method: 'POST',
    permissions: ['AUTHENTICATED'],
    serviceAddress: RESTAURANT_SERVICE_URL
  }
]

export default routeInfo;
