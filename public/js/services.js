'use strict';

/* Services */

angular.module('multi-screen-demo.services', [
  'ngResource'
]).
// resource for querying users
factory('User', ['$resource',
  function($resource) {
    return $resource('/api/user', {}, {
      query: { method: 'GET', isArray: false }
    });
}]);
