'use strict';

const puppeteer = require('puppeteer');
const logger = require('../runtime').logger;
const appData = require('../runtime').appData;
const tools = require('../runtime').tools;
const baseDir="data/screenshot/";

exports.screenshot = async function () {

    //????
    tools.clearDir(baseDir);

    const browser = await puppeteer.launch();
    logger.info(await browser.version());
    const page = await browser.newPage();
    await screenshotGroup(page);
    await browser.close();
}

async function screenshotGroup(page) {
    var groups = appData.getMonitorUrls();
    for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        logger.info("begin screenshort [%s] pages...", group.name);
        var urls = group.urls;
        for (var j = 0; j < urls.length; j++) {
            var url = urls[j];
            await screenshotPage(page, group, url);
        }
        logger.info("end screenshort [%s] pages", group.name);
    }
}

async function screenshotPage(page, group, url) {
    logger.info("begin screenshort page [%s] page...", url.url);
    await page.goto(url.url);
    await page.setViewport({
        width: 2000,
        height:3000
    });
    await page.waitFor(7000);
    await autoScroll(page);
    await page.screenshot({
        path: 'data/screenshot/' + group.name + '_' + url.name + '.png',
        fullPage: true
    });
    logger.info("end screenshort page [%s] page", url.url);
}

function autoScroll(page) {
    return page.evaluate(() => {
        return new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 200;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 200);
        })
    });
}