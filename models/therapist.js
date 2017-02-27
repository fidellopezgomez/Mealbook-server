//     Terapeuta
//---------------------
// - dni
// - password
// - email
// - nombre
// - apellidos
// - ciudad
// - dirección

// Definición del modelo Terapeuta
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Therapist', {
    //id: DataTypes.INTEGER (cod_registro)
    //createdAt: STRING->DATE
    //updateAt: STRING->DATE
    dni: {
      type: DataTypes.STRING,
      unique: {
        msg: "El dni introducido ya se ha registrado"
      },
      validate: {
        notEmpty: {
          msg: "El campo dni(*) es obligatorio"
        },
        isAlphanumeric: {
          msg: "Solo se pueden introducir números(0-9) o letras en mayúscula(A-Z)"
        },
        //se podría poner isAlphanumeric&isUppercase??NO se puede!
        is: {
          args: ["(([X-Z]{1})(\d{7})([A-Z]{1}))|((\d{8})([A-Z]{1}))", 'i'],
          msg: "El formato introducido es incorrecto, debe ser: 12345678A o X1234567B"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "El campo password(*) es obligatorio"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "El campo nombre(*) es obligatorio"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "El campo email(*) es obligatorio"
        },
        isEmail: {
          msg: "Formato del email incorrecto"
        }
      }
    }
  }, {

  });
}
