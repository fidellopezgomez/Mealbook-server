var express = require('express');
var router = express.Router();

var jsonController = require('../controllers/json_controller');

router.route('/')
    .all(function(req,res,next) {
        res.setHeader('Content-Type', '');
        next();
    });

//* JSON *//
// Autoload de comandos con :patientId
router.param('patientId',                   jsonController.load);
//router.post('/login',                       jsonController.login);
//router.delete('/logout',                    jsonController.logout);
router.get('/patients',                     jsonController.patients);
router.get('/patients/:patientId(\\d+)',    jsonController.patient);

module.exports = router;
