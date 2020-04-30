import puppeteer from "puppeteer";
import typeForm from "../utils/type-form";
import prtScr from "../utils/prt-scr";
import { dev } from "../data/login.json";
import { localhost, mobile } from "../data/config.json";

let browser, page;
const login = async () => {
    await page.goto(`${localhost}/auth/login`);
    await typeForm(page, dev);
    await page.click('button.btn.btn-submit.btn-primary.btn-lg');
    //await page.waitForNavigation({ waitUntil: 'networkidle2' })
    await page.waitForSelector('.widget-login__user-icon');
    await prtScr(page,'login');
}

beforeAll(async () => {
    browser = await puppeteer.launch(mobile);
    page = await browser.newPage();
    await login();
})

it('can go view a pedigree request page', async () => {
    await page.goto(localhost);
    await page.click('.widget-login');
    //await page.waitForSelector('.widget-login li:nth-child(2) a');
    await page.click('.widget-login li:nth-child(2) a');
    await page.waitForSelector('.documents-page__right .Card:nth-child(2) .Card__links a:first-child');
    await page.click('.documents-page__right .Card:nth-child(2) .Card__links a:first-child');
    await page.waitForSelector('.btn.btn-green');

    //let s = await page.waitForSelector('#buttons a:first-child:not([href=""])')
    //let x = await s.getProperty('href')
    //console.log(await x.jsonValue())
    //await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: './download/'});
    //await page.click('#buttons a:first-child')
    await prtScr(page,'pedigree');
})

afterAll(async () => {
    await browser.close();
})
