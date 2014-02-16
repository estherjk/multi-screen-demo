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

  // receive device type
  socket.on('pair:deviceType', function(data) {
    // if deviceType is 'pc', generate a unique code and send to PC
    if(data.deviceType == 'pc') {
      // generate a code
      var code = crypto.randomBytes(3).toString('hex');

      // ensure uniqueness
      while(code in socketCodes) {
        code = crypto.randomBytes(3).toString('hex');
      }

      // store pairing code / socket assocation
      socketCodes[code] = this;
      socket.code = code;

      // show code on PC
      socket.emit('pair:sendCode', { code: code });
    }
    // if deviceType is 'mobile', check if submitted code is valid and pair
    else if(data.deviceType == 'mobile') {
      socket.on('pair:getCode', function(data) {
        if(data.code in socketCodes) {
          // save the code for controller commands
          socket.code = data.code;

          // initialize the controller
          socket.emit('pair:connected', {});

          // start the PC
          socketCodes[data.code].emit('pair:connected', {});
        }
        else {
          socket.emit('pair:fail', {});
          socket.disconnect();
        }
      });
    }
  });
};