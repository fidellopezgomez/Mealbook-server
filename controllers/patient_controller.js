var models = require('../models/models.js');

// GET /patients
exports.index = function(req, res) {
  models.Patient.all().then(function(patients) {
    res.render('patients/index',{ patients: patients });
  })
};

//GET /patients/:patientId
exports.show = function(req, res) {
  models.Patient.findById(req.params.patientId).then(function(patient) {
    res.render('patients/show',{ patient: patient});
  })
};
