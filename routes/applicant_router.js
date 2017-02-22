const express = require('express')
const router = express.Router()
const applicantController = require('../controllers/applicant_controller')

router.get('/', applicantController.list)

router.get('/new', applicantController.new)

router.get('/:id', applicantController.listOne)

router.get('/:id/edit', applicantController.edit)

router.post('/', applicantController.create)

router.put('/:id', applicantController.update)

router.delete('/:id', applicantController.delete)

module.exports = router
