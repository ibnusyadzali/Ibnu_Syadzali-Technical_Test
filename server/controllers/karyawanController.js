const { Karyawan, Jabatan, Department } = require("../models/index");

class KaryawanController {
  static async getAllKaryawan(req, res, next) {
    try {
      const allKaryawan = await Karyawan.findAll({
        include: [
          {
            model: Jabatan,
            include: [Department],
          },
        ],
        order: [["id", "ASC"]],
      });
      res.status(200).json(allKaryawan);
    } catch (error) {
      next(error);
    }
  }
  static async getKaryawanById(req, res, next) {
    try {
      let id = req.params.karyawanId;
      const dataKaryawan = await Karyawan.findByPk(id, { include: { model: Jabatan, include: [Department] } });
      if (!dataKaryawan) {
        throw { name: "Data not found" };
      }
      res.status(200).json(dataKaryawan);
    } catch (error) {
      next(error);
    }
  }
  static async addNewKaryawan(req, res, next) {
    try {
      let { name, id_jabatan, age, gender, tanggal_lahir, alamat } = req.body;
      tanggal_lahir = new Date(tanggal_lahir);
      console.log(name, id_jabatan, age, gender, tanggal_lahir, alamat);
      const newKaryawan = await Karyawan.create({ name, id_jabatan, age, gender, tanggal_lahir, alamat });
      res.status(201).json(newKaryawan);
    } catch (error) {
      next(error);
    }
  }
  static async updateKaryawan(req, res, next) {
    try {
      let id = req.params.karyawanId;
      let { name, id_jabatan, age, gender, tanggal_lahir, alamat } = req.body;
      tanggal_lahir = new Date(tanggal_lahir);
      const dataKaryawan = await Karyawan.findByPk(id);
      if (!dataKaryawan) {
        throw { name: "Data not found" };
      }
      await Karyawan.update({ id, name, id_jabatan, age, gender, tanggal_lahir, alamat }, { where: { id } });
      res.status(201).json({ message: `Success to update detail on Karyawan ${dataKaryawan.name}` });
    } catch (error) {
      next(error);
    }
  }
  static async deleteKaryawan(req, res, next) {
    try {
      let id = req.params.karyawanId;
      const dataKaryawan = await Karyawan.findByPk(id);
      if (!dataKaryawan) {
        throw { name: "Data not found" };
      }
      await Karyawan.destroy({ where: { id } });
      res.status(200).json({ message: `Success to delete Karyawan ${dataKaryawan.name}` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = KaryawanController;
