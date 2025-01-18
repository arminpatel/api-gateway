import axios from 'axios';
import routeInfo from '../config/routeInfo.js';

const forwardRequest = async (req, res) => {
  const routeDetails = req.gateway_route_details;
  if(!routeDetails) {
    return res.status(404).json({
      "error": "no such route"
    });
  }
  console.log("hello", req.path);
  const serviceAddress = routeDetails['serviceAddress'];
  try {
    const response = await axios({
      method: req.method,
      url: `${serviceAddress}${req.path}`,
      headers: req.headers,
      data: req.body,
    });
    console.log(response.data);
    return res.status(response.status).json(response.data);
  } catch(error) {
    console.log("Heelo");
    return res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal Server Error'});
  }
};

export default forwardRequest;
