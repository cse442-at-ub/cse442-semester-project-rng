module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

module.exports.isNotLoggedIn = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/courses');
  }
  next();
}