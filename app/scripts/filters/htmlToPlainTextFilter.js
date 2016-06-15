'use strict';

angular.module('kinnonteawApp')
.filter('htmlToPlaintext', function() {
    return function(text) {
      return angular.element(text).text();
    }
});