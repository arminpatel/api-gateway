const injectRouteDetails = ((routeDetails) => (req, res, next) => {
  console.log("hello from injectRouteDetails");
  req.gateway_route_details = routeDetails; 
  next();
});

export default injectRouteDetails;
