'use strict';
angular.module('kinnonteawApp')
.service('JourneyService', ['$q', '$http', 'ENV', function ($q, $http, ENV) {
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
    	}
    };
}]);