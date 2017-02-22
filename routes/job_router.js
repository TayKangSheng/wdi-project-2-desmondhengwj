const express = require('express')
const router = express.Router()
const jobController = require('../controllers/job_controller')

router.get('/', jobController.list)

router.get('/new', jobController.new)

router.get('/:id', jobController.listOne)

router.get('/:id/edit', jobController.edit)

router.post('/', jobController.create)

router.put('/:id', jobController.update)

router.delete('/:id', jobController.delete)

module.exports = router
