import { Builder, By} from 'selenium-webdriver';
import { driver } from 'mocha-webdriver';

const test1 = async () => {
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:3000");
    await driver.findElement(By.name("login")).sendKeys("user_1");
    await driver.findElement(By.name("password")).sendKeys("user_1");
    await (await driver.findElement(By.css('input[type=submit]'))).click();
    var cookies = await driver.manage().getCookies();
    await driver.manage().deleteAllCookies();
    await driver.get("http://localhost:3000");
    await driver.findElement(By.name("login")).sendKeys("user_1");
    await driver.findElement(By.name("password")).sendKeys("user_1");
    await (await driver.findElement(By.css('input[type=submit]'))).click();
    await driver.get("http://localhost:3000/change_password");
    await driver.findElement(By.name("new_password")).sendKeys("new_pass");
    await (await driver.findElement(By.css('input[type=submit]'))).click();
    await driver.get("http://localhost:3000");
}

test1()
    .then((ret) => console.log('PASS'))
    .catch((err) => console.log('ERROR', err))


    