import { Home } from './home';

let home;

beforeEach(() => {
  home = new Home();
});

test('change message should remove name', () => {
  home.changeMessage();
  expect(home.message).toContain('!');
});
