var express = require('express');
var router = express.Router();

var settings = require('../controllers/settings');
var patient = require('../controllers/patient');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user_name: 'Fidel', title: 'Mealbook' });
});

//TODO cambar a PUT
router.get('/settings',settings.index);
router.get('/settings/resume',settings.resume);

router.get('/patients',patient.list);

module.exports = router;
