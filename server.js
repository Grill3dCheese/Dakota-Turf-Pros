require("dotenv").config();

const express = require("express"),
  app = express(),
  flash = require("connect-flash"),
  bodyParser = require("body-parser");

// Routing
const indexRoute = require("./routes/index"),
  contactRoute = require("./routes/contact");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());

app.use(
  require("express-session")({
    secret: process.env.APPSECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(indexRoute);
app.use(contactRoute);

app.listen(process.env.PORT || 3000, process.env.IP, () => {
  console.log("*Server has started successfully*");
});
