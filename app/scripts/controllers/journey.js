'use strict';
angular.module('kinnonteawApp')
  .controller('JourneyCtrl', ['$scope', '$routeParams', 'JourneyService', 'UtilService',
   function ($scope, $routeParams, JourneyService, UtilService) {
  	$scope.Journeys = [];
    $scope.Journey = {};
    $scope.Page = {
        Name: '',
        Mode: ''
    }
    
    $scope.$on('$routeChangeSuccess', function() {
        // $routeParams should be populated here
        console.log('change success ' , $routeParams);
        if (UtilService.isEmpty($routeParams)) {
            $scope.CreateJourney();
        } else {
            var journeyId = $routeParams.journeyId;
            $scope.ViewJourney(journeyId);
        }
    });
    $scope.LoadJourneys = function() {
        JourneyService.LoadJourneys()
        .then(function(data, status) {
          	angular.forEach(data, function(journey) {
                var div = document.createElement('div');
                div.innerHTML = journey.JourneyContent;
                var firstImage = div.getElementsByTagName('img')[0];
                var imgSrc = firstImage ? firstImage.src : "";
                journey.SourceImageThumbnail = imgSrc;
                $scope.Journeys.push(journey);
            });

        }, function(error, status) {

        });
    };

    $scope.CreateJourney = function() {
        console.log('create journey ');
    	$scope.Page.Mode = 'new';
    };

    $scope.CancelJourney = function() {
    	$scope.Page.Mode = 'view';
    };

    $scope.ViewJourney = function(journeyId) {
    	console.log('view journey ', journeyId);
    	console.log('view journey ', $routeParams.journeyId);
    	var journeyId = journeyId;
    	JourneyService.LoadJourneyByJourneyId(journeyId)
    	.then(function(data, status) {
            $scope.Journey._id = data._id;
    		$scope.Journey.JourneyTitle = data.JourneyTitle;
            $scope.Journey.JourneyContent = data.JourneyContent;
            $scope.Journey.Tags = data.Tags;
            $scope.Page.Mode = 'view';
            $scope.Journey = data;
    	}, function(err, status) {
    		console.log('con not find journey');
    	});
    }

    $scope.SaveJourney = function() {
    	JourneyService.CreateJourney($scope.Journey)
    	.then(function(data, status) {
    		console.log(data);

            $location.path('#/journeys');  
    	}, function(err, status) {

    	});
    }
}]);
