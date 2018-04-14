import angular from 'angular';
import ngRoute from 'angular-route';

import service from './service';
import app from './app';
import home from './home/home';
import header from './header/header';
import page2 from './page2/page2';

const mainModule = angular.module('mainModule', [ngRoute])
  .service('service', service)
  .component('app', app)
  .component('home', home)
  .component('header', header)
  .component('page2', page2)
  .config(($locationProvider, $routeProvider) => {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', { template: '<home message-from-parent="\'Hi from router 🤗\'"></home>' })
      .when('/page2', { template: '<page-2></page-2>' })
      .otherwise('/');
  });

angular.bootstrap(document, [mainModule.name], { strictDi: true });
