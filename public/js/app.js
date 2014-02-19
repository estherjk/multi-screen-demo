'use strict';

// Declare app level module which depends on filters, and services

angular.module('multi-screen-demo', [
  'btford.socket-io',
  'ngRoute',

  'multi-screen-demo.controllers.index',
  'multi-screen-demo.controllers.mobile',
  'multi-screen-demo.controllers.pc',
  'multi-screen-demo.directives',
  'multi-screen-demo.filters',
  'multi-screen-demo.services'
]).
factory('socket', function(socketFactory) {
  return socketFactory();
}).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/partials/' + window.deviceType + '/code'
    }).
    when('/main', {
      templateUrl: '/partials/' + window.deviceType + '/main'
    }).
    when('/dpad', {
      templateUrl: '/partials/' + window.deviceType + '/dpad'
    }).
    when('/trackpad', {
      templateUrl: '/partials/' + window.deviceType + '/trackpad'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});