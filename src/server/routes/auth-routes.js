var authController = require("../controllers/authController");

module.exports = function(app, passport) {
    app.get("/api/signup", authController.signup);

    app.get("/api/signin", authController.signin);

    app.post('/api/signup', function(req, res) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) {
                res.status(500).send(JSON.stringify({
                    'message': "Internal Server Error"
                }));
            }
            if (!user) {
                var data = {
                    success: true,
                    message: "That email is already in use!"
                };
                res.status(200).send(data);
            }
            if (user) {
                var data = {
                    success: true,
                    message: "Thanks for registering!"
                };
                res.status(200).send(data);
            }
        })(req, res);
    });

    app.get("/dashboard", isLoggedIn, authController.dashboard);

    app.get("/api/logout", authController.logout);

    app.post('/api/signin', function(req, res) {
        passport.authenticate('local-signin', function(err, user, info) {
            if (err) {
                res.status(500).send(JSON.stringify({
                    'msg': "Internal Server Error"
                }));
            }
            if (!user) {
                var data = {
                    success: true,
                    message: "Invalid user or password!"
                };
                res.status(200).send(data);
            }
            if (user) {
                var data = {
                    success: true,
                    message: "Welcome!"
                }
                res.status(200).send(data)
            }
        })(req, res);
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect("/api/signin");
    }
};
