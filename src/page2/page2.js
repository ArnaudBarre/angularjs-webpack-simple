import template from './page2.html';

/* @ngInject */
function controller($scope, $rootScope) {
  $scope.changeHeader = () => $rootScope.headerText = 'Angularjs is awesome !';
}

const props = {
  title: '<'
};

export default {controller, template, bindings: props, controllerAs: 'props'};