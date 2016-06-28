'use strict';
angular.module('kinnonteawApp')
.service('JourneyService', ['$q', '$http', 'ENV', function ($q, $http, ENV) {
    return {
    	LoadJourneys: function() {
    		var defer = $q.defer();
		    var loadJourneyUrl = ENV.apiEndpoint + '/journey/LoadJourney';
        
	        $http.get(loadJourneyUrl)
	        .success(function (data) {
	        	
	        	defer.resolve(data);
	        })
	        .error(function (error) {
	         	defer.reject(error);
	        });

    		return defer.promise;
    	},
    	LoadJourneyByJourneyId: function(JourneyId) {
    		var defer = $q.defer();
		    var loadJourneyUrl = ENV.apiEndpoint + '/journey/LoadJourneyByJourneyId/' + JourneyId;
        
	        $http.get(loadJourneyUrl)
	        .success(function (data) {
	        	console.log(data);
	        	defer.resolve(data);
	        })
	        .error(function (error) {
	         	defer.reject(error);
	        });

    		return defer.promise;
    	},
    	CreateJourney: function(JourneyObject) {
    		console.log('in journey service ', JourneyObject);
    		var defer = $q.defer();
		    var createJourneyUrl = ENV.apiEndpoint + '/journey/CreateJourney';
        
	        $http.post(createJourneyUrl, JourneyObject)
	        .success(function (data) {
	        	defer.resolve(data);
	        })
	        .error(function (error) {
	         	defer.reject(error);
	        });

    		return defer.promise;
    	}
    };
}]);