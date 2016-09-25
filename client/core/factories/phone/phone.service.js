'use strict';

angular.
  module('core.factories.phone').
  factory('Phone', ['$resource',
    function($resource) {
      return $resource('api/phones/:phoneId', {}, {
        query: {
          method: 'GET',
          params: {phoneId: '@id'},
          isArray: true
        }
      });
    }
  ]);
