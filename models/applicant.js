var mongoose = require('mongoose')
var ApplicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please key in your Name.']
  },
  nric: {
    type: String,
    required: [true, 'Please key in your NRIC.']
  },
  contact: {
    type: Number,
    required: [true, 'Please key in your Number.']
  },
  gender: {
    type: String,
    required: [true, 'Please key in your Gender.']
  },
  dob: {
    type: Date, default: Date.now
  },
  address: {
    type: String,
    required: [true, 'Please key in your Full Address.']
  },
  bankname: {
    type: String,
    required: [true, 'Please key in your Bank Name.']
  },
  bankaccount: {
    type: Number,
    required: [true, 'Please key in your Bank Account.']
  },
  nameOfEmergencyContact: {
    type: String,
    required: [true, 'Please key in the name of your Emergency Contact.']
  },
  relationshipOfEmergencyContact: {
    type: String,
    required: [true, 'Please key in the relationship with your Emergency contactOfEmergency']
  },
  contactOfEmergencyContact: {
    type: Number,
    required: [true, 'Please key in the contact number of your Emergency Contact']
  },
  status: {
    type: String,
    enum: ['Interviewed', 'Interview'],
    default: 'Interview'
  }
})

ApplicantSchema.virtual('member_since').get(function () {
  return this.dob.getFullYear()
})

var Applicant = mongoose.model('Applicant', ApplicantSchema)

module.exports = Applicant
