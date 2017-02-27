var path = require('path');

//EN LOCAL CREAR UN FICHERO .env en la raiz del proyecto con las siguientes constantes
//DATABASE_URL=sqlite://:@:/
//DATABASE_STORAGE=mealbookDB.sqlite

// Postgres DATABASE_URL = postgres://user:password@host:port/DATABASE_URL
var URL = process.env.DATABASE_URL.match(
  /(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_NAME = (URL[6] || null);
var USER = (URL[2] || null);
var PWD = (URL[3] || null);
var PROTOCOL = (URL[1] || null);
var DIALECT = (URL[1] || null);
var PORT = (URL[5] || null);
var HOST = (URL[4] || null);
var STORAGE = process.env.DATABASE_STORAGE;

//cargar Model ORM
var Sequelize = require('sequelize');

//usar BBDD
var sequelize = new Sequelize(DB_NAME, USER, PWD, {
  dialect: DIALECT,
  protocol: PROTOCOL,
  port: PORT,
  host: HOST,
  storage: STORAGE,
  omitNull: true //solo para Postgres
});

//usar BBDD SQLite:
// var sequelize = new Sequelize(null, null, null, {
//     dialect:  "sqlite",
//     storage:  "mealbookDB.sqlite"
//   }
// );

// importar definición de la tabla Patient
var therapist_path = path.join(__dirname, 'therapist');
var Therapist = sequelize.import(therapist_path);

// importar definición de la tabla Patient
var patient_path = path.join(__dirname, 'patient');
var Patient = sequelize.import(patient_path);

// importar definición de la tabla Patient
var weight_path = path.join(__dirname, 'weight');
var Weight = sequelize.import(weight_path);

Patient.belongsTo(Therapist);
Therapist.hasMany(Patient);
Weight.belongsTo(Patient);
Patient.hasMany(Weight);

exports.Therapist = Therapist // exportar tabla Therapist
exports.Patient = Patient; // exportar tabla Patient
exports.Weight = Weight; // exportar tabla Weight

//sequelize.sync() crea e inicializa la tabla de Patients en DB
sequelize.sync().then(function() {
  //success(...) ejecuta el manejador una vez creada la tabla
  Therapist.count().then(function(count) {
    if (count === 0) {
      Therapist.bulkCreate({

      }).then(function() {
        console.log()
      })
    }
  });

  var jsonPatients = require('./models/dummies/patients.json');
  Patient.count().then(function(count) {
    if (count === 0) { //la tabla se inicializa solo si está vacía
      Patient.bulkCreate(
        jsonPatients.patients
      ).then(function() {
        console.log('Database initialized')
      })
    };
  });
});
