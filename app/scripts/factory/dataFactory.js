'use strict';

angular.module('kinnonteawApp').factory('dataFactory', ['$q',
    function($q) {
        var dataModel = {
            user: {},
        };

        dataModel.setUser = function (data) {
            return _.set('dataModel.user', data);
        };

        dataModel.getUser = function () {
            return _.get('dataModel.user');
        };
        
        return dataModel;
    }]);