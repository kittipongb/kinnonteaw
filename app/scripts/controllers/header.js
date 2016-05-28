'use strict';

angular.module('kinnonteawApp')
.controller('HeaderCtrl', ['$scope','$route','$routeParams', '$location', 'UserService', 'CredentialService', 
	function ($scope, $route, $routeParams,$location, UserService, CredentialService) {

    $scope.User = {};

   $scope.$on('UpdateUser', function(event, data) { 
        console.log('header ', data); 
        $scope.User = data;
    });

   CredentialService.LoadOAuth()
    .then(function(data, status) {
        OAuth.initialize('header',data);
    //    console.log(data);
    }, function(error, status) {
        console.log('oauth err ', error);
    });
    $scope.IsLogin = false;
    $scope.IsRequestSignup = false;
    $scope.RequestSignup = function() {
      $scope.IsRequestSignup = true;
    }
    $scope.RequestSignin = function() {
      $scope.IsRequestSignup = false;
    }

}]);
