export default class Service {
  /* @ngInject */
  constructor($http) {
    this.$http = $http;
  }

  getUser() {
    return this.$http.get('api/user');
  }
}

export const ServiceMock = () => ({
  getUser: jest.fn().mockResolvedValue({ data: { name: 'Test' } }),
});
