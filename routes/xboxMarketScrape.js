const cheerio = require("cheerio");
const axios = require("axios");

/*module.exports = function scrapeMarket(searchTerm, res) {
  const encodedSearch = encodeURI(searchTerm);

  axios
    .get(`https://www.microsoft.com/en-us/search/shop/games?q=${encodedSearch}`)
    .then(function(response) {
      var $ = cheerio.load(response.data);

      const result = {};

      result.title = $("#coreui-productplacementlist-1g76zxk_0")
        .children("h3")
        .text();

      result.price = $("#coreui-productplacementlist-1g76zxk_0")
        .children("div.c-channel-placement-price")
        .children("div")
        .children("span")
        .text();

      result.image = $("#coreui-productplacementlist-1g76zxk")
        .children("div:nth-child(3)")
        .children("div.c-group.f-wrap-items.context-list-page")
        .children("div:nth-child(1)")
        .children("a")
        .children("div.c-channel-placement-image")
        .children("picture")
        .children("img")
        .attr("data-src");

      var remove = result.price.trim(" ");

      console.log(remove);
      res.json(result);
    });
};*/

module.exports = function scrapeMarket(searchTerm, res) {
  const encodedSearch = encodeURI(searchTerm);

  axios
    .get(`https://www.microsoft.com/en-us/search/shop/games?q=${encodedSearch}`)
    .then(function(response) {
      var $ = cheerio.load(response.data);

      const allGames = [];
      const result = {};
      //#coreui-productplacementlist-1g76zxk_0
      $("div.m-channel-placement-item").each(function(i, element) {
        result.title = $(this)
          .children("a")
          .children("div:nth-child(2)")
          .children("h3")
          .text();

        result.price = $(this)
          .children("a")
          .children("div:nth-child(2)")
          .children("div.c-channel-placement-price")
          .children("div.c-price")
          .children("span")
          .text();

        result.image = $(this)
          .children("a")
          .children("div.c-channel-placement-image")
          .children("picture")
          .children("img")
          .attr("data-src");

        console.log("result.title", result.title);
        console.log("result.price", result.price);
        console.log("result.image", result.image);
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
