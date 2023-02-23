'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jabatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Jabatan.hasMany(models.Karyawan, {foreignKey: "id_jabatan"})
      Jabatan.belongsTo(models.Department, {foreignKey: "id_department"})
    }
  }
  Jabatan.init({
    id_department: DataTypes.INTEGER,
    nama_jabatan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Jabatan',
  });
  return Jabatan;
};