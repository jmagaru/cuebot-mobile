/*
 * Copyright 2020 Jonathan L. Magaru <jonathan.magaru.code@gmail.com>
 * Licensed under the MIT license. See LICENSE.
 *
 * Cuebot -Appium Mobile Web Builder - MobileBuilder
 */
const fs = require('fs');
const path = require('path');
const colors = require('chalk');
const wd = require('wd');

const saveImage = (filename, base64data) => {
    var data = base64data.replace(/^data:image\/\w+;base64,/, '');
    var buf = Buffer.from(data, 'base64');
    fs.writeFileSync(`${filename}.png`, buf);
};

class MobileBuilder {
    constructor() {
        this.driver = null;
        this.caps = {
            platformName: 'iOS',
            platformVersion: '13.0',
            deviceName: 'iPhone X',
            app: '',
            autoAcceptAlerts: true,
            autoDismissAlerts: true
        };
    }

    hasApp() {
        return this.caps.app !== '';
    }

    async waitFor(seconds) {
        await this.driver.sleep(seconds * 1000);
    }

    async platform(name, version) {
        this.caps.platformName = name;
        this.caps.platformVersion = version;
    }

    async deviceName(name) {
        this.caps.deviceName = name;
    }

    async appLocation(pathOrURL) {
        this.caps.app = pathOrURL;
    }
    
    async initialize(remoteServer) {
        this.driver = wd.promiseChainRemote(remoteServer);
        await this.driver.init(this.caps);
    }

    async capture(path) {
        let screenshot = await this.driver.takeScreenshot();
        saveImage(Store.sanitize(path), screenshot);
    }

    async swipe(direction) {
        await this.driver.execute('mobile: swipe', { 
            direction: direction
        });
    }

    async tap(target) {
        await target.click();
    }
    
    async tapWithCoordinates(x, y) {
        await (new wd.TouchAction(this.driver))
            .tap({ 
                x: x, 
                y: y })
            .perform();
    }

    async accessibilityId(target) {
        let element = await this.driver.elementByAccessibilityId(target);
        return element;
    }

    async xpath(target) {
        let element = await this.driver.elementByXPath(target);
        return element;
    }

    async text(target, value = null) {
        if(value) {
            await target.sendKeys(value);
        } else {
            return await target.text();
        }
    }

    async getDriver() {
        return await this.driver;
    }

    async closeSession() {
        await this.driver.quit();
    }

    resolveInt(intResolveValue) {
        return parseInt(intResolveValue);
    }
}

module.exports.MobileBuilder = MobileBuilder;
