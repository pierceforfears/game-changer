const cheerio = require("cheerio");
const axios = require("axios");

module.exports = function scrapeMarket(searchTerm, res) {
  const encodedSearch = encodeURI(searchTerm);

  axios
    .get(`https://www.microsoft.com/en-us/search/shop/games?q=${encodedSearch}`)
    .then(function(response) {
      var $ = cheerio.load(response.data);

      //title - #coreui-productplacementlist-1g76zxk_0 > h3
      //price - #coreui-productplacementlist-1g76zxk_0 > div.c-channel-placement-price > div > span:nth-child(5)
      //image - #coreui-productplacementlist-1g76zxk > div:nth-child(3) > div.c-group.f-wrap-items.context-list-page > div:nth-child(1) > a > div.c-channel-placement-image > picture > img

      const result = {};

      result.title = $("#coreui-productplacementlist-1g76zxk_0")
        .children("h3")
        .text();
      result.price = $("#coreui-productplacementlist-1g76zxk_0")
        .children("div.c-channel-placement-price")
        .children("div")
        .children("span:nth-child(5)")
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

      console.log(result);
      res.json(result);
    });
};
