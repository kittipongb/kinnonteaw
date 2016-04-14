'use strict';

angular.module('kinnonteawApp').factory('contentBlockService', ['$http', '$q',
    function($http, $q) {
        var content = {};
        var dataLoaded = false;

        var query = function () {
            var deferred = $q.defer();
            $http.get('http://localhost:3030/poi/LoadPoi').success(function (data) { //TODO: should refer with context path
                content.blocks = data;
                // content.blocks = getMockData();
                //TODO: should process data?
                dataLoaded = true;
                deferred.resolve(true);
            }).error(function (data, status) {
                console.log('Error: ' + status);
                dataLoaded = false;
                deferred.reject(false);
            });

            return deferred.promise;
        };

        var getAllPoi = function () {
            return content.blocks;
        };

        var getPoi = function (poiId) {
            return _.findWhere(content.blocks, {_id: poiId});
        };

        var isDataLoaded = function () {
            return dataLoaded;
        };

        var getMockData = function () {
            return [
            {
                Id: '1', // should be MD5?
                Name: 'ร้านกาแฟ Think Tank',
                Location: 'สาธร กรุงเทพ',
                Description: 'นั่งชิลๆ ได้ทั้งวัน มี Wifi มีปลั๊ก',
                Type: 'eat',
                ImageLink: 'assets/images/00002.jpg',
                Rating: '4',
                LatLong: '',
                ReviewsQuantity: '42',
                ImagesQuantity: '5',
                Address: 'address1',
                Ranking: '',
                Keywords: ''  
            },
            {
                Id: '2',
                Name: 'วัดไชยวัฒนาราม',
                Location: 'อยุธยา',
                Description: 'วัดสวย และยิ่งใหญ่',
                Type: 'place',
                ImageLink: 'assets/images/00001.jpg',
                Rating: '4.5',
                LatLong: '14.3432986, 100.5413961',
                ReviewsQuantity: '16',
                ImagesQuantity: '10',
                Address: 'address2',
                Ranking: '',
                Keywords: ''
            },
            {
                Id: '3',
                Name: 'ที่พัก X Guesthouse',
                Location: 'อัมพวา',
                Description: 'ระคาประหยัด ใกล้ที่เที่ยว',
                Type: 'sleep',
                ImageLink: 'assets/images/00003.jpg',
                Rating: '3.5',
                LatLong: '',
                ReviewsQuantity: '2',
                ImagesQuantity: '3',
                Address: 'address3',
                Ranking: '',
                Keywords: ''
            },
            {
                Id: '4',
                Name: 'ที่พัก X Guesthouse',
                Location: 'อัมพวา',
                Description: 'ระคาประหยัด ใกล้ที่เที่ยว',
                Type: 'sleep',
                ImageLink: 'assets/images/00003.jpg',
                Rating: '3.5',
                LatLong: '',
                ReviewsQuantity: '2',
                ImagesQuantity: '3',
                Address: 'address3',
                Ranking: '',
                Keywords: ''
            },
            {
                Id: '5',
                Name: 'ที่พัก X Guesthouse',
                Location: 'อัมพวา',
                Description: 'ระคาประหยัด ใกล้ที่เที่ยว',
                Type: 'sleep',
                ImageLink: 'assets/images/00003.jpg',
                Rating: '3.5',
                LatLong: '',
                ReviewsQuantity: '2',
                ImagesQuantity: '3',
                Address: 'address3',
                Ranking: '',
                Keywords: ''
            },
            {
                Id: '6',
                Name: 'ที่พัก X Guesthouse',
                Location: 'อัมพวา',
                Description: 'ระคาประหยัด ใกล้ที่เที่ยว',
                Type: 'sleep',
                ImageLink: 'assets/images/00003.jpg',
                Rating: '3.5',
                LatLong: '',
                ReviewsQuantity: '2',
                ImagesQuantity: '3',
                Address: 'address3',
                Ranking: '',
                Keywords: ''
            },
            {
                Id: '7',
                Name: 'ที่พัก X Guesthouse',
                Location: 'อัมพวา',
                Description: 'ระคาประหยัด ใกล้ที่เที่ยว',
                Type: 'sleep',
                ImageLink: 'assets/images/00003.jpg',
                Rating: '3.5',
                LatLong: '',
                ReviewsQuantity: '2',
                ImagesQuantity: '3',
                Address: 'address3',
                Ranking: '',
                Keywords: ''
            },
            {
                Id: '8',
                Name: 'ที่พัก X Guesthouse',
                Location: 'อัมพวา',
                Description: 'ระคาประหยัด ใกล้ที่เที่ยว',
                Type: 'sleep',
                ImageLink: 'assets/images/00003.jpg',
                Rating: '3.5',
                LatLong: '',
                ReviewsQuantity: '2',
                ImagesQuantity: '3',
                Address: 'address3',
                Ranking: '',
                Keywords: ''
            },
            {
                Id: '9',
                Name: 'ที่พัก X Guesthouse',
                Location: 'อัมพวา',
                Description: 'ระคาประหยัด ใกล้ที่เที่ยว',
                Type: 'sleep',
                ImageLink: 'assets/images/00003.jpg',
                Rating: '3.5',
                LatLong: '',
                ReviewsQuantity: '2',
                ImagesQuantity: '3',
                Address: 'address3',
                Ranking: '',
                Keywords: ''
            },
            {
                Id: '10',
                Name: 'ที่พัก X Guesthouse',
                Location: 'อัมพวา',
                Description: 'ระคาประหยัด ใกล้ที่เที่ยว',
                Type: 'sleep',
                ImageLink: 'assets/images/00003.jpg',
                Rating: '3.5',
                LatLong: '',
                ReviewsQuantity: '2',
                ImagesQuantity: '3',
                Address: 'address3',
                Ranking: '',
                Keywords: ''
            }];
        };

        return {
            fetch: query,
            getAll: getAllPoi,
            getId: getPoi,
            dataReady: isDataLoaded
        };
        
    }]);