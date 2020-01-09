const db = require("../models");
const passport = require("../config/passport");
const xboxMarket = require("./xboxMarketScrape");
const gamestopMarket = require("./gamestopScrape");

module.exports = function(app) {
  // user creation
  app.post("/api/signup", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    db.User.findOne({ where: { username: req.body.username } }).then(function(
      response
    ) {
      if (response) {
        res.redirect(307, "/api/login");
      } else {
        db.User.create({
          username: username,
          password: password
        })
          .then(function() {
            res.redirect(307, "/api/login");
          })
          .catch(function(err) {
            console.log(err);
            res.json(err);
          });
      }
    });
    /*     db.User.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
      }); */
  });

  app.post("/api/saveResults", function(req, res) {
    if (req.user) {
      db.Searches.create(req.body).then(a => res.json(a));
    }
  });

  // GET route for getting all of the searches
  app.get("/api/searches", function(req, res) {
    var query = {};
    if (req.user.id) {
      query.UserId = req.user.id;
    }
    db.Searches.findAll({
      where: query
    }).then(function(dbPost) {
      res.json(dbPost);
    });
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

  app.get("/api/user", function(req, res) {
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
