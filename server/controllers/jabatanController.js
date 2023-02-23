const { Karyawan, Jabatan, Department } = require("../models/index");

class JabatanController {
  static async getAllJabatan(req, res, next) {
    try {
      const allJabatan = await Jabatan.findAll({
        include: [Department, Karyawan],
        order: [["id", "ASC"]],
      });
      res.status(200).json(allJabatan);
    } catch (error) {
      next(error);
    }
  }
  static async getJabatanById(req, res, next) {
    try {
      let id = req.params.jabatanId;
      const dataJabatan = await Jabatan.findByPk(id, { include: [Department] });
      if (!dataJabatan) {
        throw { name: "Data not found" };
      }
      res.status(200).json(dataJabatan);
    } catch (error) {
      next(error);
    }
  }
  static async addNewJabatan(req, res, next) {
    try {
      let { id_department, nama_jabatan } = req.body;
      const newJabatan = await Jabatan.create({ id_department, nama_jabatan });
      res.status(201).json(newJabatan);
    } catch (error) {
      next(error);
    }
  }
  static async updateJabatan(req, res, next) {
    try {
      let id = req.params.jabatanId;
      let { id_department, nama_jabatan } = req.body;
      const dataJabatan = await Jabatan.findByPk(id);
      if (!dataJabatan) {
        throw { name: "Data not found" };
      }
      await Jabatan.update({ id, id_department, nama_jabatan }, { where: { id } });
      res.status(201).json({ message: `Success to update Jabatan ${dataJabatan.nama_jabatan}` });
    } catch (error) {
      next(error);
    }
  }
  static async deleteJabatan(req, res, next) {
    try {
      let id = req.params.jabatanId;
      const dataJabatan = await Jabatan.findByPk(id);
      if (!dataJabatan) {
        throw { name: "Data not found" };
      }
      await Jabatan.destroy({ where: { id } });
      res.status(200).json({ message: `Success to delete Jabatan ${dataJabatan.nama_jabatan}` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = JabatanController;
