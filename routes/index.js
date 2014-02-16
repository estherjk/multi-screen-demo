/*
 * GET index and view partials
 */

exports.index = function(req, res) {
  res.render('index');
};

exports.partials = function (req, res) {
  var deviceType = req.params.deviceType;
  var view = req.params.view;
  res.render('partials/' + deviceType + '/' + view);
};