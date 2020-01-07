const puppeteer = require("puppeteer");

module.exports = async function scrapeGamestop(searchTerm, res) {
  console.log("2 inside async 2");

  let startTime, endTime;
  startTime = Date.now();

  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--proxy-server='direct://'",
      "--proxy-bypass-list=*",
      "--headlesss",
      "--hide-scrollbars",
      "--mute-audio",
      "--disable-gl-drawing-for-tests"
    ]
  });
  const page = await browser.newPage();

  await page.setJavaScriptEnabled(false);

  //await page.keyboard.type(searchTerm);
  try {
    const encodedSearch = encodeURI(searchTerm);

    const url = `https://www.gamestop.com/video-games/xbox-one/games?q=${encodedSearch}`;

    await page.goto(url, {
      waitUntil: "domcontentloaded"
    });

    await page.setViewport({ width: 1440, height: 821 });

    const linkSelector =
      ".product-grid-tile-wrapper:nth-child(2) > .product > .product-tile > .image-container > a > .tile-image";
    await page.waitForSelector(linkSelector);

    await Promise.all([page.click(linkSelector), page.waitForNavigation()]);

    await page.waitForSelector(
      "body > div.page > div.product-detail.product-wrapper > div.product-detail-top-section.apple-pay-available > div.product-details-container > div.row.justify-content-between > div.primary-details > div.product-details-top-desktop > div.product-name-section > h1"
    );
    await page.waitForSelector(
      "body > div.page > div.product-detail.product-wrapper > div.product-detail-top-section.apple-pay-available > div.product-details-container > div.row.justify-content-between > div.primary-details > div.primary-details-row > div.product-variation-attributes > div:nth-child(3) > div > div > div.card.condition-attribute-card.not-orderable.selectable > div > div.condition-prices > div > span > span > span, body > div.page > div.product-detail.product-wrapper > div.product-detail-top-section.apple-pay-available > div.product-details-container > div.row.justify-content-between > div.primary-details > div.primary-details-row > div.product-variation-attributes > div:nth-child(3) > div > div > div.card.condition-attribute-card.orderable.selected.selectable > div > div.condition-prices > div > span > span > span"
    );

    const result = await page.evaluate(() => {
      let title = document.querySelector(
        "body > div.page > div.product-detail.product-wrapper > div.product-detail-top-section.apple-pay-available > div.product-details-container > div.row.justify-content-between > div.primary-details > div.product-details-top-desktop > div.product-name-section > h1"
      ).innerText;
      let price = document.querySelector(
        "body > div.page > div.product-detail.product-wrapper > div.product-detail-top-section.apple-pay-available > div.product-details-container > div.row.justify-content-between > div.primary-details > div.primary-details-row > div.product-variation-attributes > div:nth-child(3) > div > div > div.card.condition-attribute-card.not-orderable.selectable > div > div.condition-prices > div > span > span > span, body > div.page > div.product-detail.product-wrapper > div.product-detail-top-section.apple-pay-available > div.product-details-container > div.row.justify-content-between > div.primary-details > div.primary-details-row > div.product-variation-attributes > div:nth-child(3) > div > div > div.card.condition-attribute-card.orderable.selected.selectable > div > div.condition-prices > div > span > span > span"
      ).innerText;

      return {
        title,
        price
      };
    });

    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }

  endTime = Date.now();
  console.log("TOTAL RUNNING TIME:", endTime - startTime);

  await browser.close();
};
