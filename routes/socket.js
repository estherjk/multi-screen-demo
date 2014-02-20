/*
 * Socket.io Communication
 */

// module dependencies
var crypto = require('crypto');

// variable declarations
var socketCodes = {};

module.exports = function(socket) {
  // establish connection
  socket.emit('pair:init', {});

  // pair mobile and PC
  // Reference: http://blog.artlogic.com/2013/06/21/phone-to-browser-html5-gaming-using-node-js-and-socket-io/
  socket.on('pair:deviceType', function(data) {
    // if deviceType is 'pc', generate a unique code and send to PC
    if(data.deviceType == 'pc') {
      // generate a code
      var code = crypto.randomBytes(3).toString('hex');

      // ensure code is unique
      while(code in socketCodes) {
        code = crypto.randomBytes(3).toString('hex');
      }

      // store code / socket assocation
      socketCodes[code] = this;
      socket.code = code;

      // show code on PC
      socket.emit('pair:sendCode', { code: code });
    }
    // if deviceType is 'mobile', check if submitted code is valid and pair
    else if(data.deviceType == 'mobile') {
      socket.on('pair:getCode', function(data) {
        if(data.code in socketCodes) {
          // save the code for mobile commands
          socket.code = data.code;

          // start mobile connection
          socket.emit('pair:connected', {});

          // start PC connection
          socketCodes[data.code].emit('pair:connected', {});
        }
        else {
          socket.emit('pair:fail', {});
          //socket.disconnect();
        }
      });
    }
  });

  // main page
  socket.on('main:init', function() {
    if(socket.code && socket.code in socketCodes) {
      socketCodes[socket.code].emit('main:connected', {});
    }
  });

  // dpad demo
  socket.on('dpad:init', function() {
    if(socket.code && socket.code in socketCodes) {
      socketCodes[socket.code].emit('dpad:connected', {});
    }
  });
  socket.on('dpad:selectUp', function() {
    if(socket.code && socket.code in socketCodes) {
      socketCodes[socket.code].emit('dpad:moveUp', {});
    }
  });
  socket.on('dpad:selectLeft', function() {
    if(socket.code && socket.code in socketCodes) {
      socketCodes[socket.code].emit('dpad:moveLeft', {});
    }
  });
  socket.on('dpad:selectRight', function() {
    if(socket.code && socket.code in socketCodes) {
      socketCodes[socket.code].emit('dpad:moveRight', {});
    }
  });
  socket.on('dpad:selectDown', function() {
    if(socket.code && socket.code in socketCodes) {
      socketCodes[socket.code].emit('dpad:moveDown', {});
    }
  });

  // trackpad demo
  socket.on('trackpad:init', function() {
    if(socket.code && socket.code in socketCodes) {
      socketCodes[socket.code].emit('trackpad:connected', {});
    }
  });

  // clean up on disconnect
  socket.on('disconnect', function() {
    // remove code / socket assocation
    if(socket.code && socket.code in socketCodes) {
      delete socketCodes[socket.code];
    }
  });
};