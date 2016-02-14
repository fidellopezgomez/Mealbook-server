var path = require('path');

var pg = require('pg');

pg.connect(process.env.DATABASE_URL, function(err, client) {
  if(err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;');
    .on('row',function(row) {
      console.lg(JSON.stringify(row));
    })
});

// Postgres DATABASE_URL = postgres://user:password@host:port/DATABASE_URL
// SQLite DATABASE_URL = sqlite://:@:/
var URL = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_NAME =   (URL[6]||null);
var USER =      (URL[2]||null);
var PWD =       (URL[3]||null);
var PROTOCOL =  (URL[1]||null);
var DIALECT =   (URL[1]||null);
var PORT =      (URL[5]||null);
var HOST =      (URL[4]||null);
var STORAGE = process.env.DATABASE_STORAGE;

//cargar Model ORM
var Sequelize = require('sequelize');

//usar BBDD
var sequelize = new Sequelize(DB_NAME, USER, PWD, {
    dialect:  DIALECT,
    protocol: PROTOCOL,
    port:     PORT,
    host:     HOST,
    storage:  STORAGE,
    omitNull: true //solo para Postgres
  }
);

//usar BBDD SQLite:
// var sequelize = new Sequelize(null, null, null, {
//     dialect:  "sqlite",
//     storage:  "mealbookDB.sqlite"
//   }
// );

// importar definición de la tabla Patient
var patient_path = path.join(__dirname,'patient');
var Patient = sequelize.import(patient_path);

exports.Patient = Patient;// exportar tabla Patient

//TODO cambiar success por *Promises*
//sequelize.sync() crea e inicializa la tabla de Patients en DB
sequelize.sync().then(function() {
  //success(...) ejecuta el manejador una vez creada la tabla
  Patient.count().then(function(count){
    if(count === 0) { //la tabla se inicializa solo si está vacía
      Patient.create({ name: 'Pedro',email: 'pedro@email.com' });
      Patient.create({ name: 'Marcos',email: 'marcos@email.com' });
      Patient.create({ name: 'Sofía',email: 'sofia@email.com' });
      Patient.create({ name: 'Lucia',email: 'lucia@email.com' })
      .then(function(){console.log('Database initialized')})
    };
  });
});
