var path = require('path');

//cargar Model ORM
var Sequelize = require('sequelize');

//usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null, {
  dialect: "sqlite",
  storage: "patient.sqlite"
});

// importar la definición de la tabla Patient en patient.js
var Patient = sequelize.import(path.join(__dirname,'patient'));

exports.Patient = Patient;// exportar definición de tabla Patient

//TODO cambiar success por *Promises*
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
