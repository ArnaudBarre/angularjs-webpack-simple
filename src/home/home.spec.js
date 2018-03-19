import { dummyChangeMessage } from './home';

const testString = 'Hi form test';

test('dummyChangeMessage should remove name', () => {
  expect(dummyChangeMessage(testString)).not.toContain('test');
});

test('dummyChangeMessage should add \'!\'', () => {
  expect(dummyChangeMessage(testString)).toContain('!');
});
