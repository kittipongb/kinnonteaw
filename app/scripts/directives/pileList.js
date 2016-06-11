'use strict';

angular.module('kinnonteawApp')
.controller('pileListController', ['$scope', 'ReviewService', function ($scope, ReviewService) {
	ReviewService.LoadReviews().then(function (data) {
		$scope.pileList = data;
		_.delay(function () {
			$('input.rating[type=number]').each(function() {
		      $(this).rating();
		    });
		}, 0);
	});
}])
.directive('pileList', function () {
	return {
		restrict: 'E',
		templateUrl: 'views/templates/pileList.html',
		controller: 'pileListController'
	};
});