const karyawanController = require("../controllers/karyawanController")
const express = require('express')
const router = express.Router()

router.get('/',karyawanController.getAllKaryawan)
router.post('/add',karyawanController.addNewKaryawan)
router.get('/:karyawanId',karyawanController.getKaryawanById)
router.put('/:karyawanId',karyawanController.updateKaryawan)
router.delete('/:karyawanId',karyawanController.deleteKaryawan)

module.exports = router