'use strict';
angular.module('kinnonteawApp')
  .controller('ReviewCtrl', ['$scope', '$routeParams', 'ReviewService', 
   function ($scope, $routeParams, ReviewService) {
  	$scope.Reviews = [];
    $scope.Review = {};
    $scope.Page = {
        Name: '',
        Mode: ''
    }

    $scope.LoadReviews = function() {
        ReviewService.LoadReviews()
        .then(function(data, status) {
       // 	console.log('review ctrl', data);
          	$scope.Reviews = data;
        }, function(error, status) {

        });
    }

    $scope.CreateReview = function() {
        console.log('create review ');
    	$scope.Page.Mode = 'new';
    }

    $scope.CancelReview = function() {
    	$scope.Page.Mode = 'view';
    }

    $scope.ViewReview = function(reviewId) {
    	$scope.Mode = 'view';
    	console.log('view review ', reviewId);
    	console.log('view review ', $routeParams.reviewId);
    	var reviewId = reviewId;
    	ReviewService.LoadReviewByReviewId(reviewId)
    	.then(function(data, status) {
            $scope.Review._id = data._id;
    		$scope.Review.ReviewTitle = data.ReviewTitle;
            $scope.Review.ReviewContent = data.ReviewContent;
            $scope.Review.Tags = data.Tags;
            $scope.Page.Mode = 'view';
            $scope.Review = data;
            console.log('review ctrl', $scope.Review);
    	}, function(err, status) {
    		console.log('con not find review');
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
