/* @ngInject */
export default function ($timeout) {
  this.getTitle = () => $timeout(() => 'Welcome to page 2 !', 1000);
}