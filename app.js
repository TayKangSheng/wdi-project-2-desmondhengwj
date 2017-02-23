require('dotenv').config({ silent: true })
var express = require('express')
var path = require('path')
var debug = require('debug')
var logger = require('morgan')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var expressLayouts = require('express-ejs-layouts')
var app = express()
var router = express.Router()
var methodOverride = require('method-override')
var passport = require('passport')

// all you need for flash data
var session = require('express-session')
var flash = require('connect-flash')
var cookieParser = require('cookie-parser')
var MongoStore = require('connect-mongo')(session)

var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

app.use(express.static('public'))

app.use(cookieParser(process.env.SESSION_SECRET))
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true
  })
}))

// initialize passport into your application
app.use(passport.initialize())
app.use(passport.session())
require('./config/passportConfig')(passport)

app.use(flash())

app.use(methodOverride('_method'))
app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
// app.set('views', path.join(__dirname, 'views'))
app.use(expressLayouts)
// app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')

app.get('/test', function (req, res) {
  console.log(process.env); res.send('secret is ' + process.env.SESSION_SECRET)
})

// routes to login and signup
const Auth = require('./routes/authRoutes')
app.use('/', Auth)

const Applicant = require('./models/applicant')

app.get('/', function (req, res) {
  res.redirect('/login')
})

app.get('/applicants', function (req, res) {
  Applicant.find({}, function (err, output) {
    res.render('applicants/index', {
      applicants: output,
      flash: req.flash('flash')[0]
    })
  })
})

app.get('/allapplicants', function (req, res) {
  Applicant.find({}, function (err, output) {
    res.render('applicants/allapplicants', {
      applicants: output,
      flash: req.flash('flash')[0]
    })
  })
})

app.get('/applicants/:id', function (req, res, next) {
  if (req.query.status) {
    return next('route')
  }

  Applicant.findById(req.params.id, function (err, output) {
    if (err) return next(err)
    res.render('applicants/show', {
      applicants: output
    })
  })
})

app.get('/applicants/:id', function (req, res, next) {
  Applicant.findByIdAndUpdate(req.params.id, {
    status: req.query.status
  }, function (err, output) {
    if (err) return next(err)

    res.redirect('/applicants')
  })
})

app.post('/applicants', function (req, res, next) {
  Applicant.create(req.body.applicants, function (err, output) {
    if (err) {
      if (err.name === 'ValidationError') {
        let errMessages = []
        for (field in err.errors) {
          errMessages.push(err.errors[field].message)
        }

        console.log(errMessages)

        req.flash('flash', {
          type: 'danger',
          message: errMessages
        })
        res.redirect('/applicants')
      }

      return next(err)
    }
    req.flash('flash', {
      type: 'success',
      message: 'Applicant Created' + output.name
    })
    res.redirect('/applicants')
  })
})
app.delete('/applicants/:id', function (req, res, next) {
  Applicant.findByIdAndRemove(req.params.id, function (err, output) {
    if (err) return next(err)
    req.flash('flash', {
      type: 'warning',
      message: 'Applicant Deleted'
    })
    res.redirect('/applicants')
  })
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

const port = 4001
app.listen(port, function () {
  console.log('DS App is running on ' + port)
})
