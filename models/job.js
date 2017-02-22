const mongoose = require('mongoose')
let JobSchema = new mongoose.Schema({
  location: String,
  date: String,
  startTime: String,
  endTime: String
})

let Job = mongoose.model('Job', JobSchema)

JobSchema.methods.confirmation = function () {
  return 'Hello, your slot at' + this.location + 'from' + this.startTime + 'to' + this.endTime + 'is confirmed'
}

module.exports = Job
