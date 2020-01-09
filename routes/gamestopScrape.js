const cheerio = require("cheerio");
const axios = require("axios");

/*module.exports = function scrapeGamestop(searchTerm, res) {
  const encodedSearch = encodeURI(searchTerm);

  axios
    .get(
      `https://www.gamestop.com/video-games/xbox-one/games?q=${encodedSearch}`
    )
    .then(function(response) {
      var $ = cheerio.load(response.data);

      const result = {};
      result.title = $("div.row.infinitescroll-results-grid")
        .children("div:nth-child(2)")
        .children("div")
        .children("div")
        .children("div.tile-body")
        .children("div.product-tile-header")
        .children("div.pdp-link")
        .children("a")
        .text();

      result.price = $("div.row.infinitescroll-results-grid")
        .children("div:nth-child(2)")
        .children("div")
        .children("div")
        .children("div.tile-body")
        .children("div.condition-pricing.pb-1")
        .children("ul")
        .children("li:nth-child(1)")
        .children("span")
        .text();

      result.price2 = $("div.row.infinitescroll-results-grid")
        .children("div:nth-child(2)")
        .children("div")
        .children("div")
        .children("div.tile-body")
        .children("div.condition-pricing.pb-1")
        .children("ul")
        .children("li:nth-child(2)")
        .children("span")
        .text();

      console.log("this is the RESULT log");
      console.log(result);
      res.json(result);
    });
};*/

module.exports = function scrapeGamestop(searchTerm, res) {
  const encodedSearch = encodeURI(searchTerm);

  axios
    .get(
      `https://www.gamestop.com/video-games/xbox-one/games?q=${encodedSearch}`
    )
    .then(function(response) {
      var $ = cheerio.load(response.data);

      const allGames = [];

      $("div.product-grid-tile-wrapper").each(function(i, element) {
        const result = {};

        result.title = $(this)
          .children("div")
          .children("div")
          .children("div.tile-body")
          .children("div.product-tile-header")
          .children("div.pdp-link")
          .children("a")
          .text();

        result.price = $(this)
          .children("div")
          .children("div")
          .children("div.tile-body")
          .children("div.condition-pricing.pb-1")
          .children("ul.list-group")
          .children("li:nth-child(1)")
          .children("span")
          .text();

        result.price2 = $(this)
          .children("div")
          .children("div")
          .children("div.tile-body")
          .children("div.condition-pricing.pb-1")
          .children("ul")
          .children("li:nth-child(2)")
          .children("span")
          .text();

        console.log("result.title", result.title);
        console.log("result.price", result.price);
        console.log("result.price2", result.price2);
        result.title = result.title.toUpperCase();
        allGames.push(result);
      });

      const winner = allGames.find(
        game => game.title === searchTerm.toUpperCase()
      );

      res.json(winner);
    });
};
