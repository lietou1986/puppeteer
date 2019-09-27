const monitor = require('./services/monitor');
const logger = require('./runtime').logger;

//监控截屏
logger.info("monitor screenshot begin...");

(async () => {
    //抓屏
    await monitor.screenshot();

    process.exit()
})();