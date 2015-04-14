'use strict';

var contentBlocksService = angular.module('contentBlocksService', []);

contentBlocksService.factory('ContentBlock', [
  function() {
  	var content = {};
  	content.blocks = [
  		{
  			Content: 'Block1',
  			Type: 'Place',
  			POI: '00001'
  		},
  		{
  			Content: 'Block2',
  			Type: 'Eat',
  			POI: '00002'
  		},
  		{
  			Content: 'Block3',
  			Type: 'Place',
  			POI: '00003'
  		}
  	];

  	var query = function () {
  		return content;
  	};

    return {
    	query: query
    };
    
  }]);