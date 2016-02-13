var path = require('path');

// MogoDB? DATABASE_URL = mongoDB://user:password@host:port/DATABASE_URL
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

//cargar Modelo ORM
var Sequelize = require('sequelize');

// usar BBDD
var sequelize = new Sequelize(DB_NAME, USER, PWD, {
    dialect:  DIALECT,
    protocol: PROTOCOL,
    port:     PORT,
    host:     HOST,
    storage:  STORAGE,
    omitNull: true //solo para Postgres
  }
);

//cargar Modelo ORM SQLite:
// var sequelize = new Sequelize(null, null, null, {
//     dialect: "sqlite",
//     storage: "patient.sqlite"
//   }
// );

// importar la definición de la tabla Patient en patient.js
var paient_path = path.join(__dirname,'patient');
var Patient = sequelize.import(paient_path);

exports.Patient = Patient;// exportar tabla Patient

//sequelize.sync() crea e inicializa la tabla de Patients en DB
sequelize.sync().then(function() {
  //success(...) ejecuta el manejador una vez creada la tabla
  Patient.count().then(function(count){
    if(count === 0) { //la tabla se inicializa solo si está vacía
      Patient.create(
        { name: 'Pedro',email: 'pedro@email.com' }//,
        //{ name: '',email: '' },
        //{ name: '',email: '' },
        //{ name: '',email: '' }
      ).then(function(){console.log('Database initialized')})
    };
  });
});
