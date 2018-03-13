import template from './page2.html';

/* @ngInject */
function controller($scope, $rootScope, service) {
  $scope.changeHeader = () => {
    $rootScope.headerText = 'AngularJS is awesome !';
  };

  service.getTitle().then((title) => {
    $scope.title = title;
  }).catch(() => {
    $scope.title = 'An error occurred';
  });
}

export default { controller, template, controllerAs: 'props' };
