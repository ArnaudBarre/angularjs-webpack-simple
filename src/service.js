export default class Service {
  /* @ngInject */
  constructor($timeout) {
    this.$timeout = $timeout;
  }

  getTitle() {
    return this.$timeout(() => 'Welcome to page 2 !', 1000);
  }
}
