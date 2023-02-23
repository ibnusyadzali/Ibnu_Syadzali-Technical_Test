const jabatanController = require("../controllers/jabatanController")
const express = require('express')
const router = express.Router()

router.get('/',jabatanController.getAllJabatan)
router.post('/add',jabatanController.addNewJabatan)
router.get('/:jabatanId',jabatanController.getJabatanById)
router.put('/:jabatanId',jabatanController.updateJabatan)
router.delete('/:jabatanId',jabatanController.deleteJabatan)

module.exports = router