/*
 * Socket.io Communication
 */

// module dependencies
var crypto = require('crypto');

// variable declarations
var socketCodes = {};

module.exports = function(socket) {
  // establish connection
  socket.emit('server:init', {});

  // receive device type
  socket.on('client:device', function(data) {
    if(data.deviceType == 'pc') {
      // generate a code
      var code = crypto.randomBytes(3).toString('hex');

      // ensure uniqueness
      while(code in socketCodes) {
        code = crypto.randomBytes(3).toString('hex');
      }

      // show code on PC
      socket.emit('server:code', { code: code });
    }
  });
};