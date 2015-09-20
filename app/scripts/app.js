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
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
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
      .otherwise({
        redirectTo: '/'
      });
  });
