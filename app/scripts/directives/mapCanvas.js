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
.controller('mapCanvas', ['$scope', 'contentBlockService' , function ($scope, contentBlockService) {
	$scope.poiData = contentBlockService.getId($scope.poiId);
	$scope.latLong = $scope.poiData.CoOrdinate;
    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: {lat: $scope.latLong.Latitude, lng: $scope.latLong.Longitude},
        zoom: 8
      });
}]);