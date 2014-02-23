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
  // dimensions of dpad-container
  var width = $('#dpad-container').outerWidth();
  var height = $('#dpad-container').outerHeight();

  // initial position of dpad-target
  var x = $('#dpad-target').position().left;
  var y = $('#dpad-target').position().top;

  // size of dpad-target (assuming it is square)
  var targetSize = $('#dpad-target').width();

  socket.on('dpad:moveUp', function() {
    y = y - 10;
    if(y >= 0) {
      $("#dpad-target").css({ left: x, top: y });
    }
    else {
      y = 0;
    }
  });
  socket.on('dpad:moveLeft', function() {
    x = x - 10;
    if(x >= 0) {
      $("#dpad-target").css({ left: x, top: y });
    }
    else {
      x = 0;
    }
  });
  socket.on('dpad:moveRight', function() {
    x = x + 10;
    if(x <= (width-targetSize)) {
      $("#dpad-target").css({ left: x, top: y });
    }
    else {
      x = width - targetSize;
    }
  });
  socket.on('dpad:moveDown', function() {
    y = y + 10;
    if(y <= (height-targetSize)) {
      $("#dpad-target").css({ left: x, top: y });
    }
    else {
      y = height - targetSize;
    }
  });
});