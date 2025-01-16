const injectUserDetails = (req, res, next) => {
  req.body.user = req.user;
  next();
};

export default injectUserDetails;
