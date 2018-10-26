"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webdriver = __importStar(require("selenium-webdriver"));
var chai_1 = require("chai");
var chrome_1 = __importDefault(require("selenium-webdriver/chrome"));
var fs = __importStar(require("fs"));
require("mocha");
chai_1.should();
describe('Selenium Demo Test Suite', function () {
    var driver;
    // time out for test execution
    this.timeout(60000);
    before(function () {
        // initializing chrome driver
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome_1.default.Options().headless())
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
        // maximizing chrome browser
        driver.manage().window().maximize();
    });
    afterEach(function () {
        var testCaseName = this.currentTest.title;
        var testCaseStatus = this.currentTest.state;
        if (testCaseStatus === 'failed') {
            console.log("Test: " + testCaseName + ", Status: Failed!");
            // capturing screenshot if test fails
            driver.takeScreenshot().then(function (data) {
                var screenshotPath = "./TestResults/Screenshots/" + testCaseName + ".png";
                console.log("Saving Screenshot as: " + screenshotPath);
                fs.writeFileSync(screenshotPath, data, 'base64');
            });
        }
        else if (testCaseStatus === 'passed') {
            console.log("Test: " + testCaseName + ", Status: Passed!");
        }
        else {
            console.log("Test: " + testCaseName + ", Status: Unknown!");
        }
    });
    after(function () {
        driver.quit();
    });
    it('C2775 should load bitly.com logged out home page', function () {
        var url = "http://bitly.com";
        var domain = 'bitly.com';
        return driver.get(url).then(function () {
            console.log("Page \"" + url + "\" opened");
        }).then(function () {
            return driver.getCurrentUrl().then(function (currentUrl) {
                currentUrl.should.include(domain, "Expected url: " + domain + ", Actual url: " + currentUrl);
            });
        });
    });
});
