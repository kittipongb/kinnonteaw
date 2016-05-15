"use strict"
angular.module('kinnonteawApp').service("UserService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	CreateAndUpdateWithSocial:function(response) {
    		var defer = $q.defer();
		    var createAndCheckLofinSocialUrl = ENV.apiEndpoint + '/user/CreateAndUpdateWithSocial';
        
	        $http.post(createAndCheckLofinSocialUrl, response)
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