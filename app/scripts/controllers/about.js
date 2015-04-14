'use strict';

/**
 * @ngdoc function
 * @name kinnonteawApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the kinnonteawApp
 */
angular.module('kinnonteawApp')
  .controller('AboutCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
