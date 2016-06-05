'use strict';

angular.module('kinnonteawApp')
.controller('pileListController', ['$scope', 'ReviewService', function ($scope, ReviewService) {
	ReviewService.LoadReviews().then(function (data) {
		$scope.pileList = data;
	});
}])
.directive('pileList', function () {
	return {
		restrict: 'E',
		templateUrl: 'views/templates/pileList.html',
		controller: 'pileListController'
	};
});