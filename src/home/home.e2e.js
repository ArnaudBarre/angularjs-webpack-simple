beforeAll(async () => {
  await page.goto('http://localhost:4444');
});

it('should exclaim on click', async () => {
  await page.click('home button');
  const text = await page.$eval('home h2', el => el.innerHTML);
  expect(text).toContain('!');
});
