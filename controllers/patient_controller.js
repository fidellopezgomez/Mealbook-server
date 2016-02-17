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
  res.render('patients/new',{ phName: phName, phEmail: phEmail, patient: patient, btnLabel: "Crear", errors: []});
};

//POST /patients/create
exports.create = function(req, res) {
  var patient = models.Patient.build( req.body.patient );

  patient
    .validate()
    .then(function(err) {
      if(err) {
        var placeholderName = "Introduce el nombre";
        var placeholderEmail = "Introduce el email";
        res.render('patients/new', { phName: placeholderName, phEmail: placeholderEmail, patient: patient, btnLabel: "Crear", errors: err.errors});
      } else {
        patient
          .save({fields: ["name","email"]})// guardar en la base de datos el nuevo paciente
          .then(function(){ res.redirect('/patients'); }); // Redirección HTTP (URL relativo) a la lista de pacientes
      }
    });
};

//GET /patients/:patientId/edit
exports.edit = function(req, res) {
  var patient = req.patient;

  res.render('patients/edit', {phName: "", phEmail: "", patient: patient, btnLabel: "Modificar", errors: []});
}

//PUT /patients/:patientId
exports.update = function(req,res) {
  req.patient.name = req.body.patient.name;
  req.patient.email = req.body.patient.email;

  req.patient
    .validate()
    .then(function(err){
      if(err) {
        res.render('patients/edit', {phName: "", phEmail: "", patient: patient, btnLabel: "Modificar", errors: err.errors});
      }else {
        req.patient
          .save({fields: ["name","email"]})// guardar en la base de datos el paciente modificado
          .then(function(){ res.redirect('/patients/'+req.patient.id); });
      }
    });
}
