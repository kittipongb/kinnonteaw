'use strict';

angular.module('kinnonteawApp').factory('contentBlockService', [
  function() {
  	var content = {};
  	content.blocks = [
    {
      Id: '1', // should be MD5?
      Name: 'ร้านกาแฟ Think Tank',
      Location: 'สาธร กรุงเทพ',
      Description: 'นั่งชิลๆ ได้ทั้งวัน มี Wifi มีปลั๊ก',
      Type: 'eat',
      ImageLink: 'images/00001.jpg',
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
      ImageLink: 'images/00002.jpg',
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
      ImageLink: 'images/00003.jpg',
      Rating: '3.5',
      LatLong: '',
      ReviewsQuantity: '2',
      ImagesQuantity: '3',
      Address: 'address3',
      Ranking: '',
      Keywords: ''
    }];

  	var query = function () {
  		return content;
  	};

    return {
    	fetch: query
    };
    
  }]);