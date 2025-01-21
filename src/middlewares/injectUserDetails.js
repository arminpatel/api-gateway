const injectUserDetails = (req, res, next) => {
  req.body.auth_user = req.user?.user;
  next();
};

export default injectUserDetails;