'use strict';
angular.module('kinnonteawApp')
.service('S3FSService', ['$q', '$http', 'ENV','Upload', function ($q, $http, ENV, Upload) {
    return {
    	UploadUserBackgroundImage: function(files, userId ) {
    		var defer = $q.defer();
    		if (files && files.length) {
	          	for (var i = 0; i < files.length; i++) {
	              var file = files[i];
	              Upload
	              .upload({
	                  url: ENV.apiEndpoint + '/s3fs/uploadUserBackgroundImage/' + userId,
	                  file: file
	              })
	              .progress(function (evt) {
	                  var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	              })
	              .success(function (data, status) {
	                  var downloadUrl = ENV.apiEndpoint + '/aws/downloadProductCategoryImageThumbnail/' + ProductCategoryCode;
	                  $http.get(downloadUrl)
	                  .success(function (data, status) {
	                  	  defer.resolve(data);
	                  })
	                  .error(function (err, status) {
	                  	defer.reject(err);
	                  });
	              })
	              .error(function (err, status) {
	                  defer.reject(err);
	              });
	          	}
		    }
    	},

    	UploadUserProfileImage: function(files, userId) {
    		if (files && files.length) {
	            for (var i = 0; i < files.length; i++) {
	                var file = files[i];
	                Upload
	                .upload({
	                    url: ENV.apiEndpoint + '/s3fs/uploadUserProfileImage/' +  userId,
	                    file: file
	                })
	                .progress(function (evt) {
	                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	                })
	                .success(function (data, status) {
	                    var downloadUrl = ENV.apiEndpoint + '/aws/downloadUserProfileImage/' + userId;
	                    $http.get(downloadUrl)
	                    .success(function (data, status) {
	                    //    document.getElementById('ViewProductCategoryImageNotReady').style.display = 'none';
	                    //    $('#ThumbnailProductCategoryImage').children("img").remove();
	                    //    $('#ThumbnailProductCategoryImage').append(data);

	                    })
	                    .error(function (data, status) {
	                        console.log(data);
	                    //    document.getElementById('ViewProductCategoryImageNotReady').style.display = 'none';
	                    });
	                })
	                .error(function (data, status) {
	                    console.log('error ' + data + ' status ' + status);
	                });
	            }
	        }

    		return defer.promise;
    	}
    };
}]);