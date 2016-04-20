var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :patientId
exports.load = function(req, res, next, patientId) {
  models.Patient.find({
                    where: { id: Number(patientId) }//,
//                    include: [{ model: models.Weight }]
                  }).then(function(patient) {
                        if(patient) {
                          req.patient = patient;
                          next();
                        }else { next(new Error('No existe patientId='+patientId)); }
                      }
                    ).catch(function(error) { next(error); });
};

// GET json/patients
exports.patients = function(req, res) {
  models.Patient.all().then(function(patients) {
    res.send(JSON.stringify(patients));
  }).catch(function(error) { next(error); });
};

//GET json/patients/:patientId
exports.patient = function(req, res) {
    res.send(JSON.stringify(req.patient));
};