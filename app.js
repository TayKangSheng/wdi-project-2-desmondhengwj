require('dotenv').config({ silent: true })
const path = require('path') // for static public combine
const express = require('express') // express
const app = express() // express
const port = process.env.PORT || 3000
const mongoose = require('mongoose') // Mongoose connection
const expressLayouts = require('express-ejs-layouts')
// For Flash data
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const passport = require('passport')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONOGODB_URI)

app.use(express.static('public'))

app.use(cookieParser(process.env.SESSION_SECRET))
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 600000000 },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true
  })
}))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passportConfig')(passport)

app.use(flash())
app.use(methodOverride('_method'))
app.use(expressLayouts)
app.use(express.static(path.join(__dirname, 'public'))) // Static
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false})) // bodyParser

const userRouter = require('./routes/user_router')
app.use('/', userRouter)

const applicantRouter = require('./routes/applicant_router')
app.use('/applicants', applicantRouter)

app.get('/', function (req, res) {
  res.render('home')
})

app.get('/about', function (req, res) {
  res.render('about')
})

app.listen(port, function () {
  console.log('Project is running!!')
})
