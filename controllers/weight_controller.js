var models = require('../models/models.js');

// POST /patients/patientId/weight
exports.create = function(req,res) {
  // var weightVal = req.body.weight.weight;
  var weight = models.Weight.build(
                  {
                      weightValue: req.body.weight.weightVal,
                      // imc: function(weightVal) {
                      //   return
                      // }
                      PatientId: req.params.patientId
                  });

  weight
  .validate()
  .then(function(err){
    if(err){
      res.render('patients/show', {   patient: req.patient,
                                      weight: weight,
                                      btnLabel: "Añadir Peso",
                                      errors: err.errors })
    }else {
      weight
        .save()
        .then( function(){ res.redirect('/patients/'+req.params.patientId) });
    }
  }).catch(function(error){next(error)});
}

//DELETE /patients/:patientId/weight/:weightId
exports.destroy = function(req, res) {
  var weight = req.patient.Weights[req.params.weightId];

  weight
    .destroy()
    .then( function() {
      res.redirect('/patients/'+req.params.patientId);
    }).catch(function(error) {
      next(error);
    });
}
