module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.send('Please login to access this page');
  }
  next();
}