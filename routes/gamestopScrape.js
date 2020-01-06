const puppeteer = require("puppeteer");

module.exports = async function scrapeGamestop() {
  console.log("2 inside async 2");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.gamestop.com/");

  await page.setViewport({ width: 1440, height: 821 });

  await page.waitForSelector(
    ".header-search > .site-search > #simpleSearch > .input-group > .form-control"
  );

  await page.click(
    ".header-search > .site-search > #simpleSearch > .input-group > .form-control"
  );

  await page.keyboard.type("the witcher");

  await page.waitForSelector(
    ".site-search > #simpleSearch > .input-group > .input-group-append > .btn"
  );

  await page.click(
    ".site-search > #simpleSearch > .input-group > .input-group-append > .btn"
  );

  let gamestopGame = "the witcher";
  gamestopGame = encodeURI(gamestopGame);
  const gamestopSelector = `a[href="/video-games/xbox-one/games?q=${gamestopGame}"]`;

  await page.waitForSelector(gamestopSelector);

  await page.click(gamestopSelector);
  //await page.click(gamestopSelector);
  /* console.log("GOOOOODBYEEEEEEEEEE");
    await Promise.all([page.click(gamestopSelector), page.waitForNavigation()]);
    const results = await page.evaluate(() => {
      let fuckThisApi = document.querySelector(
        "li:nth-child(1) > .values > li:nth-child(2) > .values > li:nth-child(1) > .category-link > span"
      ).textContent;
      console.log(fuckThisApi);
    });
    console.log("HELOOOOOOOOOOOOOOO"); */

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
};
//scrapeGamestop();
