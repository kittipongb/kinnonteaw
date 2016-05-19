'use strict';
angular.module('kinnonteawApp')
  .controller('ReviewCtrl', ['$scope', '$routeParams', 'ReviewService', 
   function ($scope, $routeParams, ReviewService) {
  	$scope.Reviews = [];
    $scope.Review = {
    	ReviewTitle: '',
    	ReviewContent: '',
    	Tags: [],
    	Rating : 0
    };
    $scope.Mode = 'view';
    console.log('review ctrl');

    ReviewService.LoadReview()
    .then(function(data, status) {
    	console.log('review ctrl', data);
      	$scope.Reviews = data;
    }, function(error, status) {

    });

    $scope.CreateReview = function() {
    	$scope.Mode = 'edit';
    }

    $scope.CancelReview = function() {
    	$scope.Mode = 'view';
    }

    $scope.ViewReview = function() {
    	$scope.Mode = 'edit';
    	console.log('view review ', $routeParams);
    	console.log('view review ', $routeParams.reviewId);
    	var reviewId = $routeParams.reviewId;
    	ReviewService.LoadReviewByReviewId(reviewId)
    	.then(function(data, status) {
    		$scope.Review = data;
    	}, function(err, status) {
    		consol.log('con not find review');
    	});
    }

    $scope.SaveReview = function() {
    	ReviewService.CreateReview($scope.Review)
    	.then(function(data, status) {
    		console.log(data);

    	}, function(err, status) {

    	});
    }
}]);
