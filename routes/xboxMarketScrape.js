const puppeteer = require("puppeteer");

module.exports = async function scrapeMarket(searchTerm, res) {
  console.log("inside async");
  const browser = await puppeteer.launch({ headless: true, args: [‘--no-sandbox’] });
  const page = await browser.newPage();

  await page.keyboard.type(searchTerm);

  const encodedSearch = encodeURI(searchTerm);

  await page.goto(
    `https://www.microsoft.com/en-us/search/shop/games?q=${encodedSearch}`
  );

  await page.setViewport({ width: 1440, height: 821 });

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

    return {
      title,
      price,
      image
    };
  });

  res.json(result);

  await browser.close();
};
