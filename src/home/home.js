import template from './home.html';

export const dummyChangeMessage = (message) => {
  const parts = message.split(' ');
  parts[parts.length - 1] = 'external function';
  parts.push('!');
  return parts.join(' ');
};

/* @ngInject */
function controller($scope) {
  $scope.message = 'Hi from $scope';
  $scope.changeMessage = () => {
    $scope.message = dummyChangeMessage($scope.message);
  };
}

const props = {
  messageFromParent: '<',
};

export default {
  controller, template, bindings: props, controllerAs: 'props',
};
