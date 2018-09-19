var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");
var path = require("path");
var exphbs = require("express-handlebars");
var passport = require("passport");
var session = require("express-session");
var cookieParser = require('cookie-parser')

var app = express();
var PORT = process.env.PORT || 8080;



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("dist"));

app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 30 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions



require("./config/passport/passport.js")(passport, db.User);

require("./routes/api-routes")(app, passport);
// require("./routes/html-routes")(app, passport);
require("./routes/auth-routes.js")(app, passport);



db.sequelize.sync({}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});

