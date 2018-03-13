import angular from 'angular';
import ngRoute from 'angular-route';

import service from './service';
import home from './home/home';
import header from './header/header';
import page2 from './page2/page2';

const app = angular.module('app', [ngRoute])
  .service('service', service)
  .component('home', home)
  .component('header', header)
  .component('page2', page2)
  .config(($locationProvider, $routeProvider) => {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', { template: '<home message-from-parent="\'Hi from router:)\'"></home>' })
      .when('/page2', { template: '<page-2></page-2>' })
      .otherwise('/');
  })
  .run(($rootScope) => {
    $rootScope.headerText = 'Hi from $rootScope';
  });

angular.bootstrap(document, [app.name], { strictDi: true });
