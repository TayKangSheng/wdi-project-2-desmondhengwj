let Job = require('../models/job')

let jobsController = {
  list: (req, res) => {
    Job.find({}, (err, jobs) => {
      if (err) throw err
      res.render('job/index', { jobs: jobs })
    })
  },

  new: (req, res) => {
    res.render('job/create')
  },

  listOne: (req, res) => {
    Job.findById(req.params.id, (err, jobItem) => {
      if (err) throw err
      res.render('job/single-job', { jobItem: jobItem })
    })
  },

  create: (req, res) => {
    let newJob = new Job({
      location: req.body.location,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      completed: false
    })
    newJob.save(function (err, savedEntry) {
      if (err) throw err
      res.redirect('/job')
    })
  },

  edit: (req, res) => {
    Job.findById(req.params.id, (err, jobItem) => {
      if (err) throw err
      res.render('job/edit', { jobItem: jobItem })
    })
  },

  update: (req, res) => {
    Job.findOneAndUpdate({
      _id: req.params.id
    }, {
      location: req.body.location,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      completed: req.body.completed
    }, (err, jobItem) => {
      if (err) throw err
      res.redirect('/job/' + jobItem.id)
    })
  },

  delete: (req, res) => {
    Job.findByIdAndRemove(req.params.id, (err, jobItem) => {
      if (err) throw err
      res.redirect('/job')
    })
  }

}

module.exports = jobsController
