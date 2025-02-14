const authorize = (req, res, next) => {
  const routeDetails = req.gateway_route_details;
  const allowedRoles = routeDetails.permissions;

  if(allowedRoles.includes('ANY') || allowedRoles.includes('AUTHENTICATED')) {
    next();
    return;
  }

  const userRole = req.user.role;

  if(!allowedRoles.includes(userRole)) {
    return res.status(403).json({
      error: "Access Denied"
    })
  }

  next();
}

export default authorize;
