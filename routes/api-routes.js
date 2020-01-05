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

  app.get("/api/gamestop/search", function(req, res) {
    const result = gamestopMarket(req.body, res);
    res.json(result);
  });
};
async function scrapeMarket(searchTerm, res) {
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

    console.log(title);
    console.log(price);

    return {
      title,
      price
    };
  });

  res.json(result);

  console.log(result);

  await browser.close();
}
