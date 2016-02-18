
// Definición del modelo Peso
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Weight',
    {
      weightValue: {
        type: DataTypes.DOUBLE,
        validate: {
                    //notEmpty: {msg: "Debe insertar algún valor en el cajetín"},
                    isDecimal: {msg: "Debe insertar una cifra entre 15 y 500 kg"},
                    min: {args: 15.00, msg: "El peso debe ser mayor de 15kg"},
                    max: {args: 500.00, msg: "El peso debe ser menor de 500kg"}
                  }
      }
      // ,
      // imc: {
      //   type: DataTypes.DOUBLE,
      //   //validate: { min: 15.00, max: 500.00 }
      // }
    });
}
