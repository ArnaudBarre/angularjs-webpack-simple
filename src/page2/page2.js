import template from './page2.html';

/* @ngInject */
function controller($scope, $rootScope, service) {
  $scope.changeHeader = () => {
    $rootScope.headerText = 'Angularjs is awesome !';
  };

  service.getTitle().then((title) => {
    $scope.title = title;
  }).catch(() => {
    $scope.title = 'An error occured';
  });
}

export default { controller, template, controllerAs: 'props' };
