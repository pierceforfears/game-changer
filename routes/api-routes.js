const db = require("../models");
const passport = require("../config/passport");
const xboxMarket = require("./xboxMarketScrape");
const gamestopMarket = require("./gamestopScrape");

module.exports = function(app) {
  // user creation
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
      });
  });

  app.post("/api/saveResults", function(req, res) {
    if (req.user) {
      db.Searches.create(req.body).then(a => res.json(a));
    }
  });

  // user login post authenticates using the "local" strat in the passport.js
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    //send empty json if no user is logged in
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });

  //logout
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.post("/api/xbox/search", function(req, res) {
    xboxMarket(req.body.searchTerm, res);
  });

  app.post("/api/gamestop/search", function(req, res) {
    gamestopMarket(req.body.searchTerm, res);
  });
};
