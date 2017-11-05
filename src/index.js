import angular from 'angular';
import uirouter from '@uirouter/angularjs';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import service from './service';
import home from './home/home';
import header from './header/header';
import page2 from './page2/page2';

export default angular.module('awesome-app', [uirouter])
  .service('service', service)
  .component('home', home)
  .component('header', header)
  .component('page2', page2)
  .config(($urlRouterProvider, $locationProvider, $stateProvider) => {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider.state({
      name: 'home',
      url: '/',
      component: 'home',
      resolve: {
        messageFromParent: () => 'Hi from router :)'
      }
    }).state({
      name: 'page2',
      url: '/page2',
      component: 'page2',
      resolve: {
        title: service => service.getTitle()
      }
    });
  })
  .run($rootScope => {
    $rootScope.headerText = 'Hi from $rootScope'
  })
