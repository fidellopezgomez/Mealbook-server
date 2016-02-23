var models = require('../models/models.js');

// var routerFile = require('../routes/index.js');
// var express = require('express');
// var router = express.Router();
// var patientController = require('../controllers/patient_controller');

// var app = require('../app.js');

// POST /patients/patientId/weight
exports.create = function(req,res,next) {
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
  .then(
    function(err){
      if(err){
        // console.log("URL req: "+req.url);
        // req.url = '/patients/'+req.params.patientId;
        // console.log("URL req: "+req.url);
        // res.url = req.url;
        // console.log("URL res: "+res.url);

        // res.locals.patient= req.patient;
        // res.locals.weight= weight;
        // res.locals.btnLabel= "Añadir Peso";
        // res.locals.errors= err.errors;
        // req.session.errors= err.errors;
        // res.session.errors= err.errors;
        // res.set("errors",err.errors);
        // console.log("error message: "+err.errors[0].message);

        // var url = '/patients/'+req.params.patientId+'?e='+encodeURIComponent(err.errors);
        // console.log(url);
        
        // res.locals.messageErr= err.errors[0].message;
        // res.redirect('/patients/'+req.params.patientId);

        // global.window.history.pushState("", document.title, '/patients/'+req.params.patientId);
        res.render('patients/show', {   patient: req.patient,
                                        weight: weight,
                                        btnLabel: "Añadir Peso",
                                        errors: err.errors } );

        // console.log("entra 1");
        // var router = routerFile.router;
        // console.log(router);
        // router.get('/patients/:patientId(\\d+)', patientController.show);
        // router.get('/patients/'+req.params.patientId, function(req, res) {
        //   console.log("entra 2");
        //   res.render('patients/show',{  patient: req.patient,
        //                                 weight: weight,
        //                                 btnLabel: "Añadir Peso",
        //                                 errors: err.errors        });
        // });
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
