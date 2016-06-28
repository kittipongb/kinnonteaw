'use strict';
angular.module('kinnonteawApp')
  .controller('ProfileCtrl', ['$scope', '$rootScope', '$routeParams', '$window', '$log', 'JourneyService','UserService',  'UtilService',
   function ($scope, $rootScope, $routeParams,$window, $log, JourneyService, UserService, UtilService) {
  	$scope.GreatJourneys = [];
    $scope.Journeys = [];
    $scope.Journey = {};
    $scope.Page = {
        Name: '',
        Mode: ''
    }
    $scope.User = UserService.GetUser();

}]);