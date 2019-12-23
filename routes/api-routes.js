module.exports = function(app) {
  // GET route for getting all of the posts
  app.post("/api/post/", function(req, res) {
    res.json(req.body);
  });
};
