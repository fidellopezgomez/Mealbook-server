
// Definición del modelo Paciente
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Patient',
    {
      name: {
        type: DataTypes.STRING,
        validate: {notEmpty: {msg: "El campo nombre(*) es obligatorio"}}
      },
      email: {
        type: DataTypes.STRING,
        validate: {notEmpty: {msg: "El campo email(*) es obligatorio"}}
      }
    });
}
