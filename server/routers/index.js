const express = require('express')
const router = express.Router()
const departmentRouter = require('./departmentRouter')
const jabatanRouter = require('./jabatanRouter')
const karyawanRouter = require('./karyawanRouter')

router.use('/department', departmentRouter)
router.use('/jabatan', jabatanRouter)
router.use('/karyawan', karyawanRouter)

module.exports = router