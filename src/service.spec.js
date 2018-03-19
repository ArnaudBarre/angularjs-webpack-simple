import Service from './service';

let service;
const timeoutSpy = jest.fn();

beforeAll(() => {
  service = new Service(timeoutSpy);
});

it('should use $timeout', () => {
  service.getTitle();
  expect(timeoutSpy.mock.calls).toHaveLength(1);
});
