
//GET index settings
exports.index = function(req, res) {
  res.render('settings/index',{user_name: 'Fidel',title: 'Mealbook'});
}

//GET resume settings
//TODO cambar a PUT
exports.resume = function(req, res) {
  var new_name = req.query.new_name;
  var old_name = req.query.old_name;

  var message;
  if(new_name === old_name) {
    message = "Error. El nombre que introducido es igual al que ya existía";
  }else if (new_name === ""){
    message = "Error. Se ha introducido un nombre vacío"
  }else {
    message = "Se ha cambiado el nombre exitosamente por "+new_name;
  }
  res.render('settings/resume',{title: req.query.title, message: message});
}
