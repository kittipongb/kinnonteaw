'use strict';

angular.module('kinnonteawApp')
.controller('HeaderCtrl', ['$scope','$route','$window', '$routeParams', '$location', 'UserService', 'CredentialService', 
	function ($scope, $route, $window, $routeParams,$location, UserService, CredentialService) {

    
    $scope.$on('UpdateUserBroadcast', function(event, data) { 
        console.log('header ', data); 
        $scope.User = data.User;
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
    };
    $scope.RequestSignin = function() {
      $scope.IsRequestSignup = false;
    };

    $scope.Logout = function() {
        swal({
              title: 'ออกจากระบบ',
              text: 'ท่านต้องการออกจากระบบ ?',
              type: 'question',
              showCancelButton: true,
              confirmButtonText: 'ใช่',
              cancelButtonText: 'ไม่',
            }).then(function() {
                $scope.$emit('UpdateUserEmit', {
                    User: {}
                });
                $window.location.assign('#/login');
            }, function(dismiss) {
              // dismiss can be 'cancel', 'overlay', 'close', 'timer'
              if (dismiss === 'cancel') {
            
                }
            });
        }
}]);
