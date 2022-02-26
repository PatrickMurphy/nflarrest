const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // set viewport normal
    page.setViewport({width: 900,
        height: 1200,
        deviceScaleFactor: 1});
    
    // goto development index and take SS
    await page.goto('https://nflarrest.com/development/');
    await page.waitForTimeout(4000);
    await page.screenshot({ path: 'devSS.png' });
    
    // set viewport mobile
    page.setViewport({width: 480,
        height: 900,
        deviceScaleFactor: 1});
    
    // goto development index and take mobile ss
    await page.goto('https://nflarrest.com/development/');
    await page.waitForTimeout(4000);
    await page.screenshot({ path: 'devMobileSS.png' });
    
    // goto dev detail page team sea and take ss
    await page.goto('https://nflarrest.com/development/Team.html#SEA');
    await page.waitForTimeout(4000);
    await page.screenshot({ path: 'devDetailPageTeamSEASS.png' });
    
    // set mobile viewport
    page.setViewport({width: 480,
        height: 900,
        deviceScaleFactor: 1});
    
    // goto dev detail page team sea and take mobile ss
    await page.goto('https://nflarrest.com/development/Team.html#SEA');
    await page.waitForTimeout(4000);
    await page.screenshot({ path: 'devDetailPageTeamSEAMobileSS.png' });

    await browser.close();
})();
