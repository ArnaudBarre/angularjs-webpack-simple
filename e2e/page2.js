beforeAll(async () => {
  await page.goto('http://localhost:8080/page2');
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
