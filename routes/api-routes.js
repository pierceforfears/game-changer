const db = require("../models");
const passport = require("../config/passport");
const xboxMarket = require("./xboxMarketScrape");
const gamestopMarket = require("./gamestopScrape");
const puppeteer = require("puppeteer");

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

  app.post("/api/xbox/search", function(req, res) {
    scrapeMarket(req.body.searchTerm, res);
  });


  app.post("/api/gamestop/search", function(req, res) {
    scrapeGamestop(req.body.searchTerm, res);
  });
};

async function scrapeMarket(searchTerm) {

  console.log("inside async");
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto("https://www.microsoft.com/en-us/search?q=");

  await page.setViewport({ width: 1440, height: 821 });

  await page.waitForSelector(
    "#pivotregion > #coreui-searchbar-6mb65sr > #searchbar #cli_shellHeaderSearchInput"
  );
  await page.click(
    "#pivotregion > #coreui-searchbar-6mb65sr > #searchbar #cli_shellHeaderSearchInput"
  );

  await page.keyboard.type(searchTerm);

  await page.waitForSelector(
    "#pivotregion > #coreui-searchbar-6mb65sr > #searchbar #search"
  );
  await page.click(
    "#pivotregion > #coreui-searchbar-6mb65sr > #searchbar #search"
  );
  await page.waitForSelector(
    "div > ul > li:nth-child(3) > .c-refine-item > span"
  );
  await page.click("div > ul > li:nth-child(3) > .c-refine-item > span");

  const linkSelector =
    "#coreui-productplacementlist-1g76zxk > div:nth-child(3) > div.c-group.f-wrap-items.context-list-page > div:nth-child(1) > a > div.c-channel-placement-image > picture > img";
  await page.waitForSelector(linkSelector);

  await Promise.all([page.click(linkSelector), page.waitForNavigation()]);

  const result = await page.evaluate(() => {
    let title = document.querySelector("#DynamicHeading_productTitle")
      .innerText;
    let price = document.querySelector(
      "#ProductPrice_productPrice_PriceContainer > span.price-disclaimer > span, #ProductPrice_productPrice_PriceContainer > span:nth-child(1)"
    ).innerText;
    let image = document.querySelector("#dynamicImage_image_picture > img").src;

    console.log(title);
    console.log(price);

    return {
      title,
      price,
      image
    };
  });

  console.log(result);

  await browser.close();
}

async function scrapeGamestop(searchTerm) {
  console.log("2 inside async 2");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.gamestop.com/");

  await page.setViewport({ width: 1440, height: 821 });

  await page.waitForSelector(
    ".header-search > .site-search > #simpleSearch > .input-group > .form-control"
  );

  await page.click(
    ".header-search > .site-search > #simpleSearch > .input-group > .form-control"
  );

  await page.keyboard.type(searchTerm);

  await page.waitForSelector(
    ".site-search > #simpleSearch > .input-group > .input-group-append > .btn"
  );

  await page.click(
    ".site-search > #simpleSearch > .input-group > .input-group-append > .btn"
  );

  let gamestopGame = searchTerm;
  gamestopGame = encodeURI(gamestopGame);
  const gamestopSelector = `a[href="/video-games/xbox-one/games?q=${gamestopGame}"]`;

  await page.waitForSelector(gamestopSelector);

  await page.click(gamestopSelector);

  const linkSelector =
    ".product-grid-tile-wrapper:nth-child(2) > .product > .product-tile > .image-container > a > .tile-image";
  await page.waitForSelector(linkSelector);

  await Promise.all([page.click(linkSelector), page.waitForNavigation()]);

  const result = await page.evaluate(() => {
    let title = document.querySelector(
      "body > div.page > div.product-detail.product-wrapper > div.product-detail-top-section.apple-pay-available > div.product-details-container > div.row.justify-content-between > div.primary-details > div.product-details-top-desktop > div.product-name-section > h1"
    ).innerText;
    let price = document.querySelector(
      "body > div.page > div.product-detail.product-wrapper > div.product-detail-top-section.apple-pay-available > div.product-details-container > div.row.justify-content-between > div.primary-details > div.primary-details-row > div.product-variation-attributes > div:nth-child(3) > div > div > div.card.condition-attribute-card.not-orderable.selectable > div > div.condition-prices > div > span > span > span, body > div.page > div.product-detail.product-wrapper > div.product-detail-top-section.apple-pay-available > div.product-details-container > div.row.justify-content-between > div.primary-details > div.primary-details-row > div.product-variation-attributes > div:nth-child(3) > div > div > div.card.condition-attribute-card.orderable.selected.selectable > div > div.condition-prices > div > span > span > span"
    ).innerText;

    console.log(title);
    console.log(price);

    return {
      title,
      price
    };
  });

  console.log(result);

  await browser.close();
}
