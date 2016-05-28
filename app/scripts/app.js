'use strict';

/**
 * @ngdoc overview
 * @name kinnonteawApp
 * @description
 * # kinnonteawApp
 *
 * Main module of the application.
 */
angular
  .module('kinnonteawApp', [
    'ui.bootstrap',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'CONFIG',
    'textAngular','ngTagsInput'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/poiview/:poiId?', {
        templateUrl: 'views/poiview.html',
        controller: 'PoiViewCtrl'
      })
      .when('/review', {
        templateUrl: 'views/review.html',
        controller: 'ReviewCtrl'
      })
      .when('/review/:reviewId', {
        templateUrl: 'views/review.html',
        controller: 'ReviewCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/places', {
        templateUrl: 'views/places.html',
        controller: 'PlacesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })

})
.run(function ($rootScope) {

    $rootScope.$on('UpdateUser', function (event, args) {
      console.log('root ', args);
        $rootScope.$broadcast('UpdateUser', args);
    });
    
});
