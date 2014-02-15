/*
 * REST API
 */

// get user
exports.getUser = function(req, res) {
  res.json({
    userId: 'EstherKim',
    firstname: 'Esther',
    lastname: 'Kim'
  });
};