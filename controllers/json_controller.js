var models = require('../models/models.js');

// GET json/patients
exports.patients = function(req, res) {
  models.Patient.all().then(function(patients) {
    res.send(JSON.stringify(patients));
  }).catch(function(error) { next(error); });
};
