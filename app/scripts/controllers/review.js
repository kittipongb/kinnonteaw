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
    function isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }

        return true && JSON.stringify(obj) === JSON.stringify({});
    }
    $scope.$on('$routeChangeSuccess', function() {
        // $routeParams should be populated here
        console.log('change success ' , $routeParams);
        if (isEmpty($routeParams)) {
            $scope.CreateReview();
        } else {
            var reviewId = $routeParams.reviewId;
            $scope.ViewReview(reviewId);
        }
    });
    $scope.LoadReviews = function() {
        ReviewService.LoadReviews()
        .then(function(data, status) {
          	angular.forEach(data, function(review) {
                var test = review.ReviewContent;

                var testImg = test.match("<img (.*)/>");
                console.log(testImg);
                if (testImg) {
                    console.log('test ', testImg[0]);
                    review.ThumbnailImg = testImg[0];
                } else {
                    review.ThumbnailImg = undefined;
                }
                $scope.Reviews.push(review);
            });

        }, function(error, status) {

        });
    };

    $scope.CreateReview = function() {
        console.log('create review ');
    	$scope.Page.Mode = 'new';
    };

    $scope.CancelReview = function() {
    	$scope.Page.Mode = 'view';
    };

    $scope.ViewReview = function(reviewId) {
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
    	}, function(err, status) {
    		console.log('con not find review');
    	});
    }

    $scope.SaveReview = function() {
    	ReviewService.CreateReview($scope.Review)
    	.then(function(data, status) {
    		console.log(data);

            $location.path('#/reviews');  
    	}, function(err, status) {

    	});
    }
}]);
