/*
 * Socket.io Communication
 */

module.exports = function(socket) {
  setInterval(function () {
    socket.emit('send:time', {
      time: (new Date()).toString()
    });
  }, 1000);
};