import axios from 'axios';

const forwardRequest = async (req, res) => {
  const routeDetails = req.gateway_route_details;
  if(!routeDetails) {
    return res.status(404).json({
      "error": "no such route"
    });
  }
  console.log("hello", routeDetails);
  const serviceAddress = routeDetails['serviceAddress'];
  console.log("forward request", req.body, req.method);
  console.log(req.headers["authorization"]);
  console.log(req.path, req.originalUrl);
  try {
    const headers = {
      ...req.headers,
      'Content-Type': req.headers['content-type'] || 'application/json',
    };

    console.log(req.body);

    const response = await axios({
      method: req.method,
      url: `${serviceAddress}${req.originalUrl}`,
      headers: {
        Authorization: req.headers["authorization"]
      },
      data:req.body
    });
    console.log(response.data);
    return res.status(response.status).json(response.data);
  } catch(error) {
    console.log("Heelo", error);
    return res.status(error.response?.status || 500).json(error.response?.error || { error: 'Internal Server Error'});
  } 
};

export default forwardRequest;
