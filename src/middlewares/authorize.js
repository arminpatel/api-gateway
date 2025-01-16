import routeInfo from '../config/routeInfo.js';

const authorize = (req, res, next) => {
  const allowedRoles = routeInfo[req.path]?.permissions;

  if(allowedRoles.includes('ANY') || allowedRoles.include('AUTHENTICATED')) {
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
