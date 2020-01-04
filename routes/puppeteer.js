const puppeteer = require("puppeteer");

(async function scrape() {
  console.log("inside async");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.microsoft.com/en-us/search?q=");

  await page.setViewport({ width: 1440, height: 821 });

  await page.waitForSelector(
    "#pivotregion > #coreui-searchbar-6mb65sr > #searchbar #cli_shellHeaderSearchInput"
  );
  await page.click(
    "#pivotregion > #coreui-searchbar-6mb65sr > #searchbar #cli_shellHeaderSearchInput"
  );

  await page.keyboard.type("the witcher");

  await page.waitForSelector(
    "#pivotregion > #coreui-searchbar-6mb65sr > #searchbar #search"
  );
  await page.click(
    "#pivotregion > #coreui-searchbar-6mb65sr > #searchbar #search"
  );

  const linkSelector =
    "#coreui-productplacement-0eghfz1_br765873cqjd > .m-channel-placement-item > a > #coreui-productplacement-0eghfz1_0 > .c-subheading-6";
  await page.waitForSelector(linkSelector);

  await Promise.all([page.click(linkSelector), page.waitForNavigation()]);

  const result = await page.evaluate(() => {
    let title = document.querySelector("#DynamicHeading_productTitle")
      .innerText;
    let price = document.querySelector(
      "#ProductPrice_productPrice_PriceContainer > span.price-disclaimer > span"
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
})();
