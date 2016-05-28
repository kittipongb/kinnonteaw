'use strict';

/**
 * @ngdoc function
 * @name kinnonteawApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kinnonteawApp
 */
angular.module('kinnonteawApp')
  .controller('MainCtrl', ['$scope', '$http', '$timeout', 'contentBlockService', 'CredentialService', 'ENV', 'UserService',
    function ($scope, $http, $timeout, contentBlockService, CredentialService, ENV, UserService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.User = {
        Id : '',
        Firstname : '',
        Lastname : '',
        Gender : '',
        Email : '',
        DisplayName : '',
        Terminal : '',
        UserType : ''
    }
/*
    $scope.$on('UpdateUser', function(event, data) { 
        console.log('main', data); 
        $scope.User = data;
    });*/
    $scope.User = UserService.User;
    if (!contentBlockService.dataReady()) {
        contentBlockService.fetch().then(function () {
            $scope.dataReady = true;
        });
    }
    else {
        $scope.dataReady = true;
    }

    $scope.IsVisibleDisplayModal = false;
    $scope.Title = 'You typed Search!';
    $scope.TitleFix = 'Search keyword is';

    $scope.searchClicked = function () {
        var searchString = $scope.SearchAllData.split(' ');

        var stringArray = [];
        for (var i = 0; i < searchString.length; i++) {
            console.log(searchString);
            if (i !== searchString.length - 1) {
                stringArray.push(searchString[i]);
            }
        }
        if (searchString.length > 0) {
            $scope.IsVisibleDisplayModal = true;
            $scope.Title = $scope.TitleFix + ' ' + searchString.join(',');
        } else {
            $scope.IsVisibleDisplayModal = false;
        }
    };


    
}]);
