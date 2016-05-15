'use strict';
angular.module('kinnonteawApp')
  .controller('ReviewCtrl', ['$scope', '$routeParams', 'ReviewService',
   function ($scope, $routeParams, ReviewService) {
  	$scope.Reviews = [];
    $scope.Review = {};
    console.log('review ctrl');
    ReviewService.LoadReview()
    .then(function(data, status) {
    	console.log('review ctrl', data);
      $scope.Reviews = data;
    }, function(error, status) {

    })
}]);
