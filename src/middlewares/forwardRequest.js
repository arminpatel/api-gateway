import axios from 'axios';
import routeInfo from '../config/routeInfo.js';

const forwardRequest = async (req, res) => {
  const serviceAddress = routeInfo[req.path]['serviceAddress'];
  try {
    const response = await axios({
      method: req.method,
      url: `${serviceAddress}${req.path}`,
      headers: req.headers,
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch(error) {
    res.statu(error.response?.status || 500).json(err.response?.data || { error: 'Internal Server Error'});
  }
};

export default forwardRequest;
