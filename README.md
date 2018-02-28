# angularjs-webpack-simple

## Component approach

These boilerplate is based on the component approach added in angularjs 1.5, a first step towards Angular2+.

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

// This heading is required for keep dependency injections after minimization (handle by babel-plugin-angularjs-annotate)
/* @ngInject */
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

export default angular.module('awesome-app', [/* dependencies */])
  // other components
  .component('newComponent', newComponent)
```

#### Use it

You can use it in other components or in index.html :

```html
<!-- Note: props are evaluate as JS, so you can pass a variable -->
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

The angularjs $rootScope is very good way to get a store in our app. It's initialized in the run block of index.js and the values can be accessed and changed in any controller.

## A new service

#### Create it

```javascript
/* @ngInject */
export default function ($http) {
  this.getUser = id => $http.get(`myWebservice/users/${id}`);
}
```
Two things are important here to get the service working : 
* Annotate the function with `/* @ngInject */`
* Not use the arrow function syntax for the global function

> If the service is used only by one component, you can put it in the component folder

#### Register it

In index.js, add these two lines :

```javascript
// other imports
import newService from './newService';

export default angular.module('awesome-app', [/* dependencies */])
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

If you need to call a webservice, you can setup a proxy in the devServer configs. See [docs here](https://webpack.js.org/configuration/dev-server/#devserver-proxy).

As angularjs is not a real component approach, HMR (hot module replacement) is not supported and a component change apply a full reload of the page. However it works with CSS, so you can change it without loosing the state of your app :)

## Build

`npm run build`

Minimization could brake angular dependency injection. So a quick check is required :

Install globally http-server : `npm i -g http-server`

Run `http-server` in the root of the repo. It will run a micro node server to serve the index.html file and the bundle.

## Inspiration

This boilerplate is heavily inspired from [vuejs-templates/webpack-simple](https://github.com/vuejs-templates/webpack-simple)
