'use strict';
angular.module('kinnonteawApp')
  .controller('JourneyCtrl', ['$scope', '$rootScope', '$routeParams', '$window', '$log', 'JourneyService','UserService',  'UtilService',
   function ($scope, $rootScope, $routeParams,$window, $log, JourneyService, UserService, UtilService) {
  	$scope.GreatJourneys = [];
    $scope.Journeys = [];
    $scope.Journey = {};
    $scope.Page = {
        Name: '',
        Mode: ''
    }
    $scope.User = UserService.GetUser();
    
    $scope.$on('$routeChangeSuccess', function() {
        // $routeParams should be populated here
        console.log('change success ' , $routeParams);
        if (UtilService.isEmpty($routeParams)) {
            $scope.Page.Mode = 'new';
       //     $scope.CreateJourney();
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
        if (UtilService.isEmpty($scope.User) &&  $scope.User._id === undefined) {
            console.log('empty ');
            swal({
              title: 'ท่านยังไม่ได้เข้าสู่ระบบ',
              text: 'ท่านต้องการเข้าสู่ระบบ ?',
              type: 'question',
              showCancelButton: true,
              confirmButtonText: 'ใช่',
              cancelButtonText: 'ไม่',
            }).then(function() {
/*
              swal(
                'Deleted!',
                'Your imaginary file has been deleted.',
                'success'
              );*/
          //      $rootScope.$apply(function() {
                  $window.location.assign('#/login');
        //        });
            }, function(dismiss) {
              // dismiss can be 'cancel', 'overlay', 'close', 'timer'
              if (dismiss === 'cancel') {
            /*    swal(
                  'Cancelled',
                  'Your imaginary file is safe :)',
                  'error'
                );*/

              }
            });
        } else {
            console.log('NOT empty ');
           
       //     $rootScope.$apply(function() {
                $scope.Page.Mode = 'new';
                $window.location.assign('#/journey');
                
       //     });
            
        }
    };

    $scope.CancelJourney = function() {
        if (($scope.Journey.JourneyTitle === undefined || $scope.Journey.JourneyTitle.length <= 0)
        || ($scope.Journey.JourneyContent === undefined || $scope.Journey.JourneyContent.length <= 0)
        || ($scope.Journey.Tags === undefined || $scope.Journey.Tags.length <= 0)) {
            swal({
              title: 'ท่านยังไม่ได้บันทึกเรื่องราวของท่าน',
              text: 'ท่านต้องการบันทึกรายการ ?',
              type: 'question',
              showCancelButton: true,
              confirmButtonText: 'ใช่',
              cancelButtonText: 'ไม่',
            }).then(function() {
                  $scope.SaveJourney();
            }, function(dismiss) {
              // dismiss can be 'cancel', 'overlay', 'close', 'timer'
              if (dismiss === 'cancel') {
                $window.location.assign('#/journeys');
              }
            });

        } else {
            $window.location.assign('#/journeys');
        }
    	
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
        $scope.Journey.UserId = $scope.User._id;
        console.log($scope.Journey);
    	JourneyService.CreateJourney($scope.Journey)
    	.then(function(data, status) {
    		console.log('success', data);
            $window.location.assign('#/journeys');
    	}, function(err, status) {
            console.log('err', err);
    	});
    }
}]);
