const injectRouteDetails = ((routeDetails) => (req, res, next) => {
  req.gateway_route_details = routeDetails; 
  next();
});

export default injectRouteDetails;
