'user strict'
angular.module('kinnonteawApp').service("CredentialService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	LoadOAuth: function() {
    		var defer = $q.defer();
			var oauthURL = ENV.apiEndpoint + "/oauths/GetPublicKey";
		    $http.get(oauthURL)
		    .success(function(data, status) {
		    //    OAuth.initialize(data);
		    	  defer.resolve(data);
		    })
		    .error(function(error, status) {
		    	  defer.reject(error);
		    });
	        return defer.promise;
    	},
    	LoadRecaptcha:function() {
    		var defer = $q.defer();
    		var recaptchaURL = ENV.apiEndpoint + "/recaptchas/GetRecaptchaKey";
		    $http.get(recaptchaURL)
		    .success(function(data, status) {
		      	defer.resolve(data);
		    })
		    .error(function(error, status) {
		    	defer.reject(error);
		    });
    		return defer.promise;
    	}
    };
}]);