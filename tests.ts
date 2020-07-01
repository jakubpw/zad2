import { Builder, By } from 'selenium-webdriver';
import { driver } from 'mocha-webdriver';

const test1 = async () => {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000");
    await driver.findElement(By.name("login")).sendKeys("user_1");
    await driver.findElement(By.name("password")).sendKeys("user_1");
    await driver.find('input[type=submit]').doClick();
    var cookies = await driver.manage().getCookies();
    await driver.manage().deleteAllCookies();
    await driver.get("http://localhost:3000");
    await driver.findElement(By.name("login")).sendKeys("user_1");
    await driver.findElement(By.name("password")).sendKeys("user_1");
    await driver.find('input[type=submit]').doClick();
    await driver.get("http://localhost:3000/change_password");
    await driver.findElement(By.name("new_password")).sendKeys("new_pass");
    await driver.find('input[type=submit]').doClick();
    await driver.get("http://localhost:3000");
    await driver.manage().deleteAllCookies();
    for (var cookie of cookies) {
        await driver.manage().addCookie(cookie)
    }
}

test1()
    .then((ret) => console.log('PASS'))
    .catch((err) => console.log('ERROR', err))