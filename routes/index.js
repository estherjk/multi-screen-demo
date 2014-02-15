/*
 * GET index and view partials
 */

exports.index = function(req, res) {
  res.render('index');
};

exports.partials = function (req, res) {
  var view = req.params.view;
  res.render('partials/' + view);
};