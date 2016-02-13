// Definición del modelo Paciente

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Patient',
            {
              name: DataTypes.STRING,
              email: DataTypes.STRING
            });
}
