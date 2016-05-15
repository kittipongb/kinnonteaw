"use strict"
angular.module('kinnonteawApp').service("ReviewService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadReview: function() {
    		var defer = $q.defer();
		    var loadReviewUrl = ENV.apiEndpoint + '/review/LoadReview';
        
	        $http.get(loadReviewUrl)
	        .success(function (data, status) {
	        	console.log(data);
	        	defer.resolve(data);
	        })
	        .error(function (error, status) {
	         	defer.reject(error);
	        });

    		return defer.promise;
    	},
    	CreateReview: function(ReviewObject) {
    		var defer = $q.defer();
		    var createReviewUrl = ENV.apiEndpoint + '/review/CreateReview';
        
	        $http.post(createReviewUrl, ReviewObject)
	        .success(function (data, status) {
	        	defer.resolve(data);
	        })
	        .error(function (error, status) {
	         	defer.reject(error);
	        });

    		return defer.promise;
    	}
    };
}]);