var express = require('express');
var router = express.Router();

var settingsController = require('../controllers/settings_controller');
var patientController = require('../controllers/patient_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user_name: 'Fidel', title: 'Mealbook' });
});

//TODO cambar a PUT
router.get('/settings',settingsController.index);
router.get('/settings/resume',settingsController.resume);

// Autoload de comandos con :patientId
router.param('patientId',patientController.load);

router.get('/patients',patientController.index);
router.get('/patients/:patientId(\\d+)',patientController.show);

module.exports = router;
