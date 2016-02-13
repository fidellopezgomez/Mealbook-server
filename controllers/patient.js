var models = require('../models/models.js');

// GET /patients
exports.list = function(req, res) {
  models.Patient.all().then(function(patient) {
    res.render('patients',{ name: patient[0].name,
                            email: patient[0].email });
  })
};
