'use strict'

angular.module('kinnonteawApp')
.controller('floatingListController', ['$scope', 'contentBlockService', function ($scope, contentBlockService) {
	//TODO: Mock POIList
	$scope.poiList = contentBlockService.fetch();
}])
.directive('floatingList', function () {
	return {
		restrict: "E",
		templateUrl: "views/templates/floatingList.html",
		controller: 'floatingListController'
	};
});