let Applicant = require('../models/applicant')

let applicantsController = {
  list: (req, res) => {
    Applicant.find({}, (err, applicants) => {
      if (err) throw err
      res.render('applicant/index', { applicants: applicants })
    })
  },

  new: (req, res) => {
    res.render('applicant/create')
  },

  listOne: (req, res) => {
    Applicant.findById(req.params.id, (err, applicantItem) => {
      if (err) throw err
      res.render('applicant/single-applicant', { applicantItem: applicantItem })
    })
  },

  create: (req, res) => {
    let newApplicant = new Applicant({
      name: req.body.name,
      nric: req.body.nric,
      contact: req.body.contact,
      gender: req.body.gender,
      dob: req.body.dob,
      address: req.body.address,
      bankname: req.body.bankname,
      bankaccount: req.body.bankaccount,
      nameOfEmergencyContact: req.body.nameOfEmergencyContact,
      relationshipOfEmergencyContact: req.body.relationshipOfEmergencyContact,
      contactOfEmergencyContact: req.body.contactOfEmergencyContact,
      interview: req.body.interview
    })

    newApplicant.save(function (err, savedEntry) {
      if (err) throw err
      res.redirect('/applicant')
    })
  },

  edit: (req, res) => {
    Applicant.findById(req.params.id, (err, applicantItem) => {
      if (err) throw err
      res.render('applicant/edit', { applicantItem: applicantItem })
    })
  },

  update: (req, res) => {
    Applicant.findOneAndUpdate({
      _id: req.params.id
    }, {
      name: req.body.name,
      nric: req.body.nric,
      contact: req.body.contact,
      gender: req.body.gender,
      dob: req.body.dob,
      address: req.body.address,
      bankname: req.body.bankname,
      bankaccount: req.body.bankaccount,
      nameOfEmergencyContact: req.body.nameOfEmergencyContact,
      relationshipOfEmergencyContact: req.body.relationshipOfEmergencyContact,
      contactOfEmergencyContact: req.body.contactOfEmergencyContact,
      interview: req.body.interview
    }, (err, applicantItem) => {
      if (err) throw err
      res.redirect('/applicant/' + applicantItem.id)
    })
  },

  delete: (req, res) => {
    Applicant.findByIdAndRemove(req.params.id, (err, applicantItem) => {
      if (err) throw err
      res.redirect('/applicant')
    })
  }

}

module.exports = applicantsController
