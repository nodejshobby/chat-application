const isAuthenticated = (req, res, next) => {
  if (req.isUnauthenticated()) return res.redirect("/user/login");
  next();
};

const redirectIfAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/");
  next();
};

module.exports = {
  isAuthenticated,
  redirectIfAuthenticated,
};
