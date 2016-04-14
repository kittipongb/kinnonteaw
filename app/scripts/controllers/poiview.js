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
  	if (!contentBlockService.dataReady()) {
        contentBlockService.fetch().then(function () {
            $scope.dataReady = true;
        });
    }
    else {
        $scope.dataReady = true;
    }
  	$scope.Id = $routeParams.poiId;
    $scope.header = 'Header from PoiViewCtrl';
  }]);
