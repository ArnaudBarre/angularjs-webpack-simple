# angularjs-webpack-simple

## Component approach

These boilerplate is based on the component approach added in AngularJS 1.5, a first step towards Angular.

## A new component

#### Create it

Create a new folder in src named newComponent with an .html, a .js and a .css file (if needed)

```html
<div class="jumbotron">
  <h1 class="text-primary">{{message}}</h1>
  <h3>{{props.messageFromParent}}</h3>
</div>
<button class="btn btn-primary" ng-click="changeMessage()">Change</button>
```

```javascript
import './newComponent.css'; // If needed, to be added in webpack bundle
import template from './newComponent.html';

/* @ngInject */ // Required to keep dependency injection after minification
function controller($scope) {
  $scope.message = 'Hello';
  $scope.changeMessage = () => $scope.message = 'Hello world';
}

/* Properties that can be passed from parent
  '=' : Two-way data-binding : A change in child will reflect in parent
  '<' : One-way data-binding : A change in child will NOT reflect in parent
*/
const props = {
  messageFromParent: '<',
};

// Export of the component
export default {controller, template, binding: props, controllerAs: 'props'};
 ```

#### Register it

In index.js, add these two lines :

```javascript
// other imports
import newComponent from './newComponent/newComponent';

const app = angular.module('app', [/* dependencies */])
  // other components
  .component('newComponent', newComponent)
```

#### Use it

You can use it in other components or in index.html :

```html
<!-- props are evaluate as JS, so you can pass a variable -->
<new-component message-from-parent="'Hi from parent !'"></new-component>
```

or as the main component of a route : 

```javascript
$routeProvider
  // other routes
  .when('/newRoute', { 
    template: '<new-component message-from-parent="\'Hi from router :)\'"></new-component>'
  })
```

## Communication between components

The AngularJS $rootScope is very good way to get a store in our app. It's initialized in the run block of index.js and the values can be accessed and changed in any controller.

## A new service

#### Create it

We can use es6 classes to get a more Angular-style service

```javascript
export default class NewService {
  /* @ngInject */ // Required to keep dependency injection after minification
  constructor($http) {
    this.$http = $http;
  }
  
  getUser(id) {
    return this.$http.get(`myWebService/users/${id}`);
  }
}
```

> If the service is used only by one component, you can put it in the component folder

#### Register it

In index.js, add these two lines :

```javascript
// other imports
import newService from './newService';

const app = angular.module('app', [/* dependencies */])
  // components
  .service('newService', newService)
```

#### Use it

The service can now be used in a controller. If a prop is needed to call the service, put the call in the $onInit method :

```javascript
 this.$onInit = () => {
    service.getUser($scope.props.userId)
      .then((user) => {
        $scope.user = user;
      });
  };
```

## Webpack tips

A change in index.html is not detected and you need to refresh the page manually. You can enable the detection by adding `watchContentBase: true` in devServer configs, but a change in any file cause a full reload.

If you need to call a web service, you can setup a proxy in the devServer configs. See [docs here](https://webpack.js.org/configuration/dev-server/#devserver-proxy).

As AngularJS is not a real component approach, HMR (hot module replacement) is not supported and a component change apply a full reload of the page. However it works with CSS, so you can change it without loosing the state of your app :)

## Build

`npm run build`

Minimization could brake angular dependency injection. So a quick check is required : use `npm run serve` to serve the index.html file and the bundle.

## Unit tests

WIP

## End-to-end tests

`npm run e2e`

End-to-end tests run on Chromium with [Puppeteer](https://github.com/GoogleChrome/puppeteer). It can be headless or not (`HEADLESS=false npm run e2e`). [See the API](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#).

## Lint

Eslint is used and extend [the Airbnb style](https://github.com/airbnb/javascript). It prevents from some mistakes (undef or unused variables) and help to keep a clean git history (comma-dangle, eol-last, ...). The configuration is in the package.json file. `npm run lint` will run eslint on all source files and automatically fix most problems.

## Inspiration

This boilerplate is heavily inspired from [vuejs-templates/webpack-simple](https://github.com/vuejs-templates/webpack-simple)
