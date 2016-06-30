'use strict';
angular.module('kinnonteawApp')
  .controller('ProfileCtrl', ['$scope', '$rootScope', '$routeParams', '$window', '$log',
    'JourneyService','UserService',  'UtilService', 'ProfileService', 'S3FSService', 
   function ($scope, $rootScope, $routeParams,$window, $log, 
    JourneyService, UserService, UtilService, ProfileService, S3FSService) {
  	$scope.GreatJourneys = [];
    $scope.User = {};
    $scope.Page = {
        Name: '',
        Mode: ''
    }
 //   $scope.User = UserService.GetUser();
    $scope.$on('$routeChangeSuccess', function() {
        // $routeParams should be populated here
        console.log('change success ' , $routeParams);
        if (UtilService.isEmpty($routeParams)) {
            $scope.Page.Mode = 'new';
       //     $scope.CreateJourney();
        } else {
            var profileId = $routeParams.profileId;
            $scope.ViewProfile(profileId);
        }
    });

    $scope.ViewProfile = function(profileId) {
      ProfileService.LoadUserById(profileId)
      .then(function(data) {
          $scope.User = data;
      });
    };

    $scope.UploadUserBackgroundImage = function(files) {
      console.log('UploadUserBackgroundImage');
      S3FSService.UploadUserBackgroundImage(files)
      .then()
      
    };
    $scope.UploadUserProfileImage = function(files) {
      console.log('UploadUserProfileImage');
      
      
    }
    $scope.SaveProfile = function() {

      ProfileService.SaveProfile($scope.User)
      .then(function(data) {

      });
    }
}]);