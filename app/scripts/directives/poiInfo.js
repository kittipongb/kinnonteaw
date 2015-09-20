'use strict';

angular.module('kinnonteawApp')
.directive('poiInfo', function () {
	return {
		restrict: 'E',
		templateUrl: 'views/templates/poiInfo.html',
		scope: {
			poiId: '@'
		},
		controller: 'poiInfoController'
	};
})
.controller('poiInfoController', ['$scope', 'contentBlockService', function ($scope, contentBlockService) {
	$scope.poiData = contentBlockService.getId($scope.poiId);
}]);