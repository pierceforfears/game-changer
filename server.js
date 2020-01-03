require("dotenv").config();
const express = require("express");
//const routes = require("./routes");
const session = require("express-session");
const passport = require("passport");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
//app.use(routes);

//initializing session
const sessionStore = new SequelizeStore({
  db: db.sequelize
});

app.use(
  session({
    //hide secret?
    secret: "keyboard cat",
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);
sessionStore.sync();
app.use(passport.initialize());
app.use(passport.session());

require("./routes/api-routes")(app);

// Start the API server
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});
