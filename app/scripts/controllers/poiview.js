'use strict';

/**
 * @ngdoc function
 * @name kinnonteawApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the kinnonteawApp
 */
angular.module('kinnonteawApp')
  .controller('PoiViewCtrl', ['$scope', '$routeParams', 'contentBlockService', function ($scope, $routeParams, contentBlockService) {
  	contentBlockService.fetch(); //TODO: should utilize for performance
  	$scope.Id = $routeParams.poiId;
    $scope.header = 'Header from PoiViewCtrl';
  }]);
