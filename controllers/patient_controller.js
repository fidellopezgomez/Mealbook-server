var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :patientId
exports.load = function(req, res, next, patientId) {
  models.Patient.findById(patientId).then(
    function(patient) {
      if(patient) {
        req.patient = patient;
        next();
      }else { next(new Error('No existe patientId='+patientId)); }
    }
  ).catch(function(error) { next(error); });
}

// GET /patients
exports.index = function(req, res) {
  models.Patient.all().then(function(patients) {
    res.render('patients/index',{ patients: patients });
  }).catch(function(error) { next(error); });
};

//GET /patients/:patientId
exports.show = function(req, res) {
  res.render('patients/show',{ patient: req.patient });
};

//GET /patients/new
exports.new = function(req, res) {
  var patient = models.Patient.build(// crea objeto Paciente
    {name:"",email:""}
  );
  var phName = "Introduce el nombre";
  var phEmail = "Introduce el email";
  res.render('patients/new',{ phName: phName, phEmail: phEmail, patient: patient, errors: []});
};

//POST /patients/create
exports.create = function(req, res) {
  var patient = models.Patient.build( req.body.patient );

  patient
    .validate()
    .then(function(err) {
      if(err) {
        var e = err.errors
        if(e.length) {
          for(var i in e) {
                console.log("error: "+e[i].message);
          }
        }
        var phName = "Introduce el nombre";
        var phEmail = "Introduce el email";
        res.render('patients/new', { phName: phName, phEmail: phEmail, patient: patient, errors: err.errors});
      } else {// guardar en la DB el nuevo paciente
        patient
          .save({fields: ["name","email"]})
          .then(function(){ res.redirect('/patients'); }) // Redirección HTTP (URL relativo) a la lista de pacientes
      }
    });
};
