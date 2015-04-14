'use strict';

/**
 * @ngdoc function
 * @name kinnonteawApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kinnonteawApp
 */
angular.module('kinnonteawApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.IsVisibleDisplayModal = false;
    $scope.Title = 'You typed Search!';

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
        } else {
            $scope.IsVisibleDisplayModal = false;
        }
    };

  }]);
