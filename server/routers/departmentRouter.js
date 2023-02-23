const departmentController = require("../controllers/departmentController")
const express = require('express')
const router = express.Router()

router.get('/',departmentController.getAllDepartment)
router.post('/add',departmentController.addNewDepartment)
router.get('/:departmentId',departmentController.getDepartmentById)
router.put('/:departmentId',departmentController.updateDepartment)
router.delete('/:departmentId',departmentController.deleteDepartment)

module.exports = router