const db = require("../models");
const passport = require("../config/passport");

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

  app.post("/api/search", function(req, res) {
    res.json({
      image:
        "https://pbs.twimg.com/profile_images/419166699028365312/v_HVJsCo.png",
      title: "borderlands",
      price: "15.00"
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

  //logout
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  app.get("/api/test", function(req, res) {
    res.json({ status: works });
  });
};
