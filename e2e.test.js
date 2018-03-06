/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const puppeteer = require('puppeteer');
const serve = require('serve');

const server = serve(__dirname, {
  port: 1470,
  ignore: ['node_modules'],
  single: true,
});

describe('e2e', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  describe('home', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:1470');
    });

    it('should say hello world on click', async () => {
      await page.click('home button');
      const text = await page.$eval('home h2', el => el.innerHTML);
      expect(text.toLowerCase()).toContain('hello world');
    });
  });

  describe('page2', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:1470/page2');
    });

    it('should change header', async () => {
      await page.click('page-2 button');
      const text = await page.$eval('header h3', el => el.innerHTML);
      expect(text.toLowerCase()).toContain('awesome');
    });

    it('should display welcome after one second', async () => {
      let text = await page.$eval('page-2', el => el.innerHTML);
      expect(text.toLowerCase()).not.toContain('welcome');
      await page.waitFor(1010);
      text = await page.$eval('page-2', el => el.innerHTML);
      expect(text.toLowerCase()).toContain('welcome');
    });
  });

  afterAll(async () => {
    await browser.close();
  });
});

server.stop();
