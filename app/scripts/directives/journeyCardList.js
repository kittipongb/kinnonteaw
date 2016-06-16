'use strict';

angular.module('kinnonteawApp')
.directive('journeyCardList', function () {
	return {
		restrict: 'E',
		scope: {
			journey: '='
		},
		replace: true,
		templateUrl: 'views/templates/journeyCardList.html',
		controller: function($scope) {
		}
	};
})