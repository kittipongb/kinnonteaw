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
<<<<<<< HEAD
      .when('/review/:reviewId', {
        templateUrl: 'views/review.html',
        controller: 'ReviewCtrl'
=======
      .when('/places', {
        templateUrl: 'views/places.html',
        controller: 'PlacesCtrl'
>>>>>>> 0c824d057d29f67a7a26b581934fc2f98569b9cc
      })
      .otherwise({
        redirectTo: '/'
      });
  });
