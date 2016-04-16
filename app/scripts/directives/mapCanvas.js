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
	$scope.latLng = $scope.poiData.LatLng;
    $scope.map = new google.maps.Map($.find('#map-canvas')[0], {
        center: $scope.latLng,
        zoom: 17
      });
    $scope.marker = new google.maps.Marker({
    	animation: google.maps.Animation.DROP,
	    position: $scope.latLng,
	    map: $scope.map
  });
}]);