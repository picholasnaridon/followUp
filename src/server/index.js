var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");
var path = require("path");
var exphbs = require("express-handlebars");
var passport = require("passport");
var session = require("express-session");

var app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, '../../src/server/views'));

app.use(express.static(path.join(__dirname, "/public")));
app.use("/scripts", express.static(__dirname + "/node_modules"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require("./config/passport/passport.js")(passport, db.User);

require("./routes/api-routes")(app, passport);
require("./routes/html-routes")(app, passport);
require("./routes/auth-routes.js")(app, passport);



db.sequelize.sync({}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
