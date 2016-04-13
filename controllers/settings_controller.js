
//GET index settings
exports.index = function(req, res) {
  res.render('settings/index',{user_name: 'Fidel',title: 'Mealbook'});
}
