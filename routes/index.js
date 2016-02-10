var express = require('express');
var router = express.Router();

var settings = require('../controllers/settings');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user_name: 'Fidel', title: 'Mealbook' });
});

//TODO cambar a PUT
router.get('/settings',settings.index);
router.get('/settings/resume',settings.resume);

module.exports = router;
