require('dotenv').config({ silent: true })
const path = require('path')
const job = require('./routes/job_router')
const ejsLayouts = require('express-ejs-layouts')
// Filesystem
const fs = require('fs')
// Express
const express = require('express')
const app = express()
const port = 3000
// Mongoose connection
const mongoose = require('mongoose')
// Importing of models
const Applicant = require('./models/applicant')
const Job = require('./models/job')
// Express EJS Layouts
const expressLayouts = require('express-ejs-layouts')
// For Flash data
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// Mongoose
mongoose.Promise = global.Promise
mongoose.connect('mongodb://desmondhengwj:hengwjd123@ds157499.mlab.com:57499/wdiproject2')

// app.use(cookieParser(process.env.SESSION_SECRET))
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   cookie: { maxAge: 600000000000000 },
//   resave: false,
//   saveUninitialized: true,
//   store: new MongoStore({
//     url: process.env.MONGODB_URI,
//     autoReconnect: true
//   })
// }))

// app.use(passport.initialize())
// app.use(passport.session())
// require('./config/passportConfig')(passport)

app.use(flash())


app.use(methodOverride('_method'))
app.use('/job', job)
app.use(expressLayouts)
app.use(ejsLayouts)
// Static
app.use(express.static(path.join(__dirname, 'public')))
// bodyParser
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))

// Details of New Applicant
const newApplicant = new Applicant({
  name: 'Lim Han Song',
  nric: 'S1234567D',
  contact: '91594259',
  gender: 'Male',
  email: 'hansong@dsrecruitment.sg',
  dob: '1st January 1990',
  address: '371 Sengkang Drive',
  bankname: 'POSB',
  bankaccount: '12345678',
  nameOfEmergencyContact: 'Desmond Heng',
  relationshipOfEmergency: 'Friend',
  contactOfEmergency: '91594259'
})

// Details of New Job
const newJob = new Job({
  location: 'Mandarin Oriental',
  date: '1st March 2017',
  startTime: '10am',
  endTime: '6pm'
})

// Save new Application into the database
newApplicant.save(function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Applicant Created!')
})

// Save new Job into the database
newJob.save(function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Job Created!')
})

// Homepage
app.get('/', function (req, res) {
  res.send('Welcome to Homepage')
})

// about
app.get('/about', function (req, res) {
  res.send('Welcome to About Page')
})

// services
app.get('/services', function (req, res) {
  res.send('Welcome to Services Page')
})

// apply
app.get('/apply', function (req, res) {
  res.send('Welcome to Application Page')
})

// FAQ
app.get('/FAQ', function (req, res) {
  res.send('Welcome to FAQ Page')
})

app.listen(port, function () {
  console.log('Project is running!!')
})
