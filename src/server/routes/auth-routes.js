var authController = require("../controllers/authController");

module.exports = function (app, passport) {
  app.get("/api/signup", authController.signup);

  app.get("/api/signin", authController.signin);

  app.post(
    "/api/signup",
    passport.authenticate("local-signup"),
    (req, res) => {
      console.log('logged in', req.user);
      var userInfo = {
        user: req.user
      }
      res.send(userInfo)
    }
  );

  app.get("/dashboard", isLoggedIn, authController.dashboard);

  app.get("/logout", authController.logout);

  app.post(
    "/api/signin",
    passport.authenticate("local-signin"),
    (req, res) => {
      console.log('logged in', req.user);
      res.send(req.user)
    }
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/api/signin");
  }
};
