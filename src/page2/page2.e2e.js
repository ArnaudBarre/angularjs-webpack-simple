beforeAll(async () => {
  await page.goto('http://localhost:4444/page2');
});

it('should change header', async () => {
  await page.click('page-2 button');
  const text = await page.$eval('header', el => el.innerHTML);
  expect(text.toLowerCase()).toContain('awesome');
});
