'use strict';

angular.module('kinnonteawApp')
.directive('journeyList', function () {
	return {
		restrict: 'E',
		scope: {
			journey: '='
		},
		replace: true,
		templateUrl: 'views/templates/journeyList.html',
		controller: function($scope) {
		//	console.log('yeah ', $scope.journey);
		}
	};
});