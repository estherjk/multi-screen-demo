'use strict';

/* PC controllers */

angular.module('multi-screen-demo.controllers.pc', [
]).
// controller for PC code
controller('PcCodeCtrl', function($scope, $location, socket) {
  socket.on('pair:sendCode', function(data) {
    $scope.code = data.code;
  });
  socket.on('pair:connected', function() {
    $location.path('/main');
  });
}).

// controller for main PC page
controller('PcMainCtrl', function($scope, $location, socket) {
  socket.on('gestures:connected', function() {
    $location.path('/gestures');
  });
  socket.on('dpad:connected', function() {
    $location.path('/dpad');
  });
}).

// controller for PC gestures demo
controller('PcGesturesCtrl', function($scope, socket) {
  socket.on('gestures:notify', function(data) {
    $scope.gestureStr = data.gesture;
  });
}).

// controller for PC D-pad demo
controller('PcDpadCtrl', function($scope, socket) {
  // NB: Using jquery is not very angular...
  socket.on('dpad:move', function(data) {
    switch(data.direction) {
      case 'up':
        if(data.isSelected) {
          $("#dpad-target").animate({ top: "-=180" }, 5000);  
        }
        else {
          $("#dpad-target").stop();
        }
        break;
      case 'down':
        if(data.isSelected) {
          $("#dpad-target").animate({ top: "+=180" }, 5000);  
        }
        else {
          $("#dpad-target").stop();
        }
        break;
      case 'left':
        if(data.isSelected) {
          $("#dpad-target").animate({ left: "-=180" }, 5000);  
        }
        else {
          $("#dpad-target").stop();
        }
        break;
      case 'right':
        if(data.isSelected) {
          $("#dpad-target").animate({ left: "+=180" }, 5000);  
        }
        else {
          $("#dpad-target").stop();
        }
        break;
    }
  });
});