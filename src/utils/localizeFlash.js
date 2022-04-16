function localizeFlash(req, res, next) {
  res.locals.errors = req.flash("errors");
  res.locals.success_message = req.flash("success_message");
  res.locals.error_message = req.flash("error_message");
  res.locals.error = req.flash("error");
  next();
}

module.exports = localizeFlash;
