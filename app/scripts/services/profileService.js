'use strict';
angular.module('kinnonteawApp')
.service('ProfileService', ['$q', '$http', 'ENV', function ($q, $http, ENV) {
    return {
    	LoadUserById: function(profileId) {
    		var defer = $q.defer();
		    var loadUserUrl = ENV.apiEndpoint + '/user/LoadUserById/' + profileId;
        
	        $http.get(loadUserUrl)
	        .success(function (data) {
	        	console.log(data);
	        	defer.resolve(data);
	        })
	        .error(function (error) {
	         	defer.reject(error);
	        });

    		return defer.promise;
    	},

    	UpdateProfile: function(User) {
    		var defer = $q.defer();
		    var updateUserUrl = ENV.apiEndpoint + '/user/UpdateUserById/' + User._id;
        
	        $http.get(updateUserUrl, User)
	        .success(function (data) {
	        	console.log(data);
	        	defer.resolve(data);
	        })
	        .error(function (error) {
	         	defer.reject(error);
	        });

    		return defer.promise;
    	}
    };
}]);