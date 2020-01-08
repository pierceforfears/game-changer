const cheerio = require("cheerio");
const axios = require("axios");

module.exports = function scrapeGamestop(searchTerm, res) {
  const encodedSearch = encodeURI(searchTerm);

  axios
    .get(
      `https://www.gamestop.com/video-games/xbox-one/games?q=${encodedSearch}`
    )
    .then(function(response) {
      var $ = cheerio.load(response.data);

      const result = {};
      //title - #product-search-results > div.row.align-items-start > div.product-grid-wrapper > div.row.product-grid > div.row.infinitescroll-results-grid > div:nth-child(2) > div > div > div.tile-body > div.product-tile-header > div.pdp-link > a
      //price - #product-search-results > div.row.align-items-start > div.product-grid-wrapper > div.row.product-grid > div.row.infinitescroll-results-grid > div:nth-child(2) > div > div > div.tile-body > div.condition-pricing.pb-1 > ul > li:nth-child(1) > span.price.pull-right > div > span > span > span
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
        .children("span.price")
        .children("div")
        .children("span")
        .children("span")
        .children("span")
        .attr("content");

      console.log("this is the RESULT log");
      console.log(result);
      res.json(result);
    });
};
