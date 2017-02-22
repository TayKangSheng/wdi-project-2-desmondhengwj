var mongoose = require('mongoose')
var ApplicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '']
  },
  nric: {
    type: String,
    required: [true, '']
  },
  contact: {
    type: String,
    required: [true, '']
  },
  gender: {
    type: String,
    required: [true, '']
  },
  email: {
    type: String,
    required: [true, '']
  },
  dob: {
    type: String,
    required: [true, '']
  },
  address: {
    type: String,
    required: [true, '']
  },
  bankname: {
    type: String,
    required: [true, '']
  },
  bankaccount: {
    type: String,
    required: [true, '']
  },
  nameOfEmergencyContact: {
    type: String,
    required: [true, '']
  },
  relationshipOfEmergency: {
    type: String,
    required: [true, '']
  },
  contactOfEmergency: {
    type: String,
    required: [true, '']
  }
})

ApplicantSchema.methods.sayHello = function () {
  return 'Hi' + this.name
}

var Applicant = mongoose.model('Applicant', ApplicantSchema)

module.exports = Applicant
