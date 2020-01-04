const puppeteer = require("puppeteer");

async function scrapeMarket() {
  console.log("inside async");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.microsoft.com/en-us/search?q=");

  await page.setViewport({ width: 1440, height: 821 });

  await page.waitForSelector(
    "#pivotregion > #coreui-searchbar-6mb65sr > #searchbar #cli_shellHeaderSearchInput"
  );
  await page.click(
    "#pivotregion > #coreui-searchbar-6mb65sr > #searchbar #cli_shellHeaderSearchInput"
  );

  await page.keyboard.type("borderlands");

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

  console.log(result);

  await browser.close();
}
scrapeMarket();
