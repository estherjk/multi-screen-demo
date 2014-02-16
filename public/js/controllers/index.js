'use strict';

/* Admin controllers */

angular.module('multi-screen-demo.controllers.index', [
]).
// controller for head element
controller('HeadCtrl', function($scope) {
  $scope.deviceType = window.deviceType;
});