import { App } from './app';
import { ServiceMock } from './service';

let app;
let serviceMock;

beforeEach(() => {
  serviceMock = ServiceMock();
  app = new App(jest.fn(), serviceMock);
  app.$onInit();
});

test('it should call getUser on init', () => {
  expect(serviceMock.getUser).toHaveBeenCalledTimes(1);
});
