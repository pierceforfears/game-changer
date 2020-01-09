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
      const result = {};

      $("div.product-grid-tile-wrapper").each(function(i, element) {
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
        if (!allGames.includes(result.title)) {
          allGames.push(result.title.toUpperCase());
        } else return;
        console.log(allGames);
      });
      for (let i = 0; i < allGames.length; i++) {
        let winner = allGames[i];
        let searchedTerm = searchTerm.toUpperCase();
        if (searchedTerm == winner) {
          console.log("this is the GAME", winner);
          return winner;
        }
      }

      res.json(result);
    });
};
