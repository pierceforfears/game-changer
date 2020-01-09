const cheerio = require("cheerio");
const axios = require("axios");

module.exports = function scrapeMarket(searchTerm, res) {
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
};

/*module.exports = function scrapeMarket(searchTerm, res) {
  const encodedSearch = encodeURI(searchTerm);

  axios
    .get(`https://www.microsoft.com/en-us/search/shop/games?q=${encodedSearch}`)
    .then(function(response) {
      var $ = cheerio.load(response.data);

      const titles = [];

      $("#coreui-productplacementlist-1g76zxk_0").each(function(i, element) {
        const result = {};

        result.title = $("")
          .children("h3")
          .text();

        result.price = $(this)
          .children("div.c-channel-placement-price")
          .children("div")
          .children("span")
          .text();

        result.image = $(this)
          .children("div:nth-child(3)")
          .children("div.c-group.f-wrap-items.context-list-page")
          .children("div:nth-child(1)")
          .children("a")
          .children("div.c-channel-placement-image")
          .children("picture")
          .children("img")
          .attr("data-src");

        if (!titles.includes(result.title)) {
          titles.push(result.title);
        } else return;
      });

      var remove = result.price.trim(" ");

      console.log(remove);
      res.json(result);
    });
};*/
