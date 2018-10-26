import * as webdriver from 'selenium-webdriver';
import { should } from 'chai';
import chrome from 'selenium-webdriver/chrome';
import * as fs from 'fs';
import 'mocha';
should();

describe('Selenium Demo Test Suite', function () {
    let driver;
    // time out for test execution
    this.timeout(60000);
    
    before(function () {
        // initializing chrome driver
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
        // maximizing chrome browser
        driver.manage().window().maximize();
    });
    
    afterEach(function () {
        let testCaseName: string = this.currentTest.title;
        let testCaseStatus: string | undefined = this.currentTest.state;
        if (testCaseStatus === 'failed') {
            console.log(`Test: ${testCaseName}, Status: Failed!`);
            // capturing screenshot if test fails
            driver.takeScreenshot().then((data) => {
                let screenshotPath = `./TestResults/Screenshots/${testCaseName}.png`;
                console.log(`Saving Screenshot as: ${screenshotPath}`);
                fs.writeFileSync(screenshotPath, data, 'base64');
            });
        } else if (testCaseStatus === 'passed') {
            console.log(`Test: ${testCaseName}, Status: Passed!`);
        } else {
            console.log(`Test: ${testCaseName}, Status: Unknown!`);
        }
    });

    after(function () {
        driver.quit();
    });

    it('C2775 should load bitly.com logged out home page', function () {
        const url = "http://bitly.com";
        const domain = 'bitly.com';
        return driver.get(url).then(() => {
            console.log(`Page "${url}" opened`);
        }).then(() => {
            return driver.getCurrentUrl().then((currentUrl) => {
                currentUrl.should.include(
                    domain,
                    `Expected url: ${domain}, Actual url: ${currentUrl}`);
            });
        });
    });
});