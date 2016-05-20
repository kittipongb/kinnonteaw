'use strict';

angular.module('kinnonteawApp')
.controller('pileListController', ['$scope', 'contentBlockService', function ($scope, contentBlockService) {
	$scope.poiList = contentBlockService.getAll();
}])
.directive('pileList', function () {
	return {
		restrict: 'E',
		templateUrl: 'views/templates/pileList.html',
		controller: 'pileListController'
	};
});