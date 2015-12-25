'use strict';

angular.module('kinnonteawApp')
.directive('mapCanvas', function () {
	return {
		restrict: 'E',
		templateUrl: 'views/templates/mapCanvas.html',
		scope: {
			poiId: '@'
		},
		controller: 'mapCanvas'
	};
})
.controller('mapCanvas', ['$scope', function ($scope) {
    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
}]);