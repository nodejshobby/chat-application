const isAuthenticated = (req, res, next) => {
  if (!req.user) return res.redirect("/user/login");
  next();
};

const redirectIfAuthenticated = (req, res, next) => {
  if (req.user) return res.redirect("/");
  next();
};

module.exports = {
  isAuthenticated,
  redirectIfAuthenticated,
};
