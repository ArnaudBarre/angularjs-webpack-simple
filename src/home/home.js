import template from './home.html';

/* @ngInject */
function controller($scope) {
  $scope.message = 'Hi from $scope';
  $scope.changeMessage = () => $scope.message = 'Hello World !';
}

const props = {
  messageFromParent: '<'
};

export default {controller, template, bindings: props, controllerAs: 'props'};