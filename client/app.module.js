'use strict';

// Define the `phonecatApp` module
angular.module('phonecatApp', [
  'ngRoute',
  'core.filters.checkmark',
  'core.factories.phone',
  'phoneDetail',
  'phoneList',
]);
