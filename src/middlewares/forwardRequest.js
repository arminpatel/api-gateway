import axios from 'axios';
import routeInfo from '../config/routeInfo.js';

const forwardRequest = async (req, res) => {
  console.log("hello from forwardRequest");
  const routeDetails = req.gateway_route_details;
  const serviceAddress = routeDetails['serviceAddress'];
  console.log(serviceAddress, req.path);
  try {
    const response = await axios({
      method: req.method,
      url: `${serviceAddress}${req.path}`,
      headers: req.headers,
      data: req.body,
    });
    console.log("hello");
    return res.status(response.status).json(response.data);
  } catch(error) {
    return res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal Server Error'});
  }
};

export default forwardRequest;
