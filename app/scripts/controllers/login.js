'use strict';

angular.module('kinnonteawApp')
.controller('LoginCtrl', ['$scope','$http', '$route','$routeParams', '$location', 'UserService', 'CredentialService', 
	function ($scope, $http, $route, $routeParams,$location, UserService, CredentialService) {

    $scope.User = {
      Signup_Email:'',
      Signup_Username: '',
      Signup_Password: '',
      Signin_Username: '',
      Signin_Password: ''

    };
   CredentialService.LoadOAuth()
    .then(function(data, status) {
        OAuth.initialize(data);
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
    $scope.Signin = function() {
    	console.log('in sing in ');
    	console.log($scope.User.Signin_Username);
    	console.log($scope.User.Signin_Password);
    	UserService.LoginWithUsernameAndPassword($scope.User.Signin_Username, $scope.User.Signin_Password)
    	.then(function(data, status) {
    		console.log('login ', data);
        UserService.User = data;
        
        $scope.$emit('UpdateUser', data);
        $location.path('#');
    	}, function(err, status) {

    	});
    };
    $scope.Signup = function() {
    	console.log('in sing up ');
    	console.log($scope.User.Signup_Email);
    	console.log($scope.User.Signup_Username);
    	console.log($scope.User.Signup_Password);
    };
    $scope.Signout = function() {

    };
    $scope.LoginWithSocial = function (provider) {
        console.log(provider);
        OAuth.popup(provider)
        .done(function(result) {
            result.me()
            .done(function (response) {
                //this will display "John Doe" in the console                
                $scope.$apply(function() {
                  $scope.PopulateValue(provider, response);
                  
                });
                console.log($scope.User);
            })
            .fail(function (err) {
                //handle error with err
                console.log(err.message + err.stack);
            });
        })
        .fail(function (err) {
            //handle error with err
            console.log(err.message + err.stack);
        });
    };

    $scope.PopulateValue = function(provider, response) {
        if (provider === 'facebook') {
          $scope.User.Id = response.raw.id;
          $scope.User.Firstname = response.firstname;
          $scope.User.Lastname = response.lastname;
          $scope.User.Gender = response.gender;
          $scope.User.Email = response.email;
          $scope.User.DisplayName = response.name;
          $scope.User.Terminal = "facebook";
          $scope.User.UserType = "user";
          $scope.IsLogin = true;
          $scope.IsAdmin = false;
          $scope.IsGuest = false;
          //Load Facebook graph profile image picture
          var facebookImageUrl = response.avatar;
          $http.get(facebookImageUrl)
          .success(function(data, status, headers, config) {
            $('#UserProfileImage').children("img").remove();
            var imageFacebookTag = "<img src='" + config.url + "' style='-webkit-user-select: none; margin-top:-10px;width:50px; height:50px;' class='img-responsive img-circle'/>"; ;
            $('#UserProfileImage').append(imageFacebookTag);

            $("#LoginModal").modal("toggle");
          })
          .error(function(data, status, headers, config) {
            console.log("Oops!! error for loading profile pic from facebook ");
          });
        } 
        
        else if (provider === 'twitter') {
          $scope.User.Id = response.id;
          $scope.User.Firstname = response.alias;
          $scope.User.Lastname = response.last_name;
          $scope.User.Gender = response.gender;
          $scope.User.Email = response.email;
          $scope.User.DisplayName = response.name;
          $scope.User.Terminal = "twitter";
          $scope.User.UserType = "user";
          $scope.IsLogin = true;
          $scope.IsAdmin = false;
          $scope.IsGuest = false;

          var twitterImageUrl = response.avatar;
          $http.get(twitterImageUrl)
          .success(function(data, status, headers, config) {
            $('#UserProfileImage').children("img").remove();
            var imageFacebookTag = "<img src='" + config.url + "' style='-webkit-user-select: none; margin-top:-10px;width:50px; height:50px;' class='img-responsive img-circle'/>"; ;
            $('#UserProfileImage').append(imageFacebookTag);

            $("#LoginModal").modal("toggle");
          })
          .error(function(data, status, headers, config) {
            console.log("Oops!! error for loading profile pic from linkedin.");
          });
        } 
        
        // Create User from Login with Social
    
        response.provider = provider;

        UserService.CreateAndUpdateWithSocial(response)
        .then(function(data, status) {
          console.log(data);
          $scope.$emit('UpdateUser', $scope.User);
                  $location.path('/');
        }, function(error, status) {

        });
    };
    
    $scope.Logout = function() {
      var int = 1;
        swal({
          title: "Are you sure?",
          text: "คุณต้องการออกจากระบบ ใช่ หรือ ไม่?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#dd6b55",
          confirmButtonText: "Yes, log out!",
          cancelButtonText: "No, cancel please!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
            $scope.$apply(function() {
              if (isConfirm) {
                swal("Success", "Log out success", "success");
                $scope.User = {};
                $scope.Firstname = '';
                $scope.Lastname = '';
                $scope.IsLogin = false;
                $scope.AddNoProfileUserImage();
                $cookies.remove('User');
              } else {
                console.log('cancel');
                swal("Cancelled", "Stay in system :)", "success");
              }
          });
        });
    };
}]);
