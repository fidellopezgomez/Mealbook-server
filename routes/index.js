var express = require('express');
var router = express.Router();

var settingsController = require('../controllers/settings_controller');
var patientController = require('../controllers/patient_controller');
var weightController = require('../controllers/weight_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', sessionController.loginRequired, function(req, res, next) {
  res.render('index', { user_name: 'Fidel', title: 'Mealbook' });
});

router.get('/settings',                       sessionController.loginRequired, settingsController.index);

//* PATIENT *//
// Autoload de comandos con :patientId
router.param('patientId',                     patientController.load);
router.get('/patients',                       sessionController.loginRequired, patientController.index);
router.get('/patients/:patientId(\\d+)',      sessionController.loginRequired, patientController.show);
router.get('/patients/new',                   sessionController.loginRequired, sessionController.loginRequired, patientController.new);
router.post('/patients/create',               sessionController.loginRequired, patientController.create);
router.get('/patients/:patientId(\\d+)/edit', sessionController.loginRequired, patientController.edit);
router.put('/patients/:patientId(\\d+)',      sessionController.loginRequired, patientController.update);
router.delete('/patients/:patientId(\\d+)',   sessionController.loginRequired, patientController.destroy);

//* WEIGHT *//
router.post('/patients/:patientId(\\d+)/weight',                   sessionController.loginRequired, weightController.create);
router.delete('/patients/:patientId(\\d+)/weight/:weightId(\\d+)', sessionController.loginRequired, weightController.destroy);

//* SESSION *//
router.get('/login',  sessionController.new); //formulario de login
router.post('/login',  sessionController.create); //crear sesión
router.delete('/logout',  sessionController.destroy); //destruir sesión

module.exports = router;
