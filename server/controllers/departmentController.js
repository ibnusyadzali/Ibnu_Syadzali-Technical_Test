const { Karyawan, Jabatan, Department } = require("../models/index");

class DepartmentController {
  static async getAllDepartment(req, res, next) {
    try {
      const allDepartment = await Department.findAll({
        include: [
          {
            model: Jabatan,
            include: [Karyawan],
          },
        ],
        order: [["id", "ASC"]],
      });
      res.status(200).json(allDepartment);
    } catch (error) {
      next(error);
    }
  }
  static async getDepartmentById(req, res, next) {
    try {
      let id = req.params.departmentId;
      const dataDepartment = await Department.findByPk(id);
      if (!dataDepartment) {
        throw { name: "Data not found" };
      }
      res.status(200).json(dataDepartment);
    } catch (error) {
      next(error);
    }
  }
  static async addNewDepartment(req, res, next) {
    try {
      let { nama_department } = req.body;
      const newDepartment = await Department.create({ nama_department });
      res.status(201).json(newDepartment);
    } catch (error) {
      next(error);
    }
  }
  static async updateDepartment(req, res, next) {
    try {
      let id = req.params.departmentId;
      let { nama_department } = req.body;
      const dataDepartment = await Department.findByPk(id);
      if (!dataDepartment) {
        throw { name: "Data not found" };
      }
      await Department.update({ id, nama_department }, { where: { id } });
      res.status(201).json({ message: `Success to update ${dataDepartment.nama_department} department` });
    } catch (error) {
      next(error);
    }
  }
  static async deleteDepartment(req, res, next) {
    try {
      let id = req.params.departmentId;
      const dataDepartment = await Department.findByPk(id);
      if (!dataDepartment) {
        throw { name: "Data not found" };
      }
      await Department.destroy({ where: { id } });
      res.status(200).json({ message: `Success to delete ${dataDepartment.nama_department} department` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DepartmentController;
