// env 
require('dotenv').config({ path: '' })
const PORT = process.env.PORT

// db connection
const db = require('./db/db.js')
db()

// app
const express = require('express')
const app = express();

// parser
app.use(express.json())
// cors policy
const cors = require('cors')
app.use(cors({
  origin: process.env.FRONTEND,
  credentials: true
}))
const session = require('express-session')

const isProduction = process.env.NODE_ENV === 'production';
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "abhi@123",
  cookie: {
    secure: isProduction,       // only true in prod
    sameSite: isProduction ? "none" : "lax",
    maxAge: 1000 * 60 * 60      // 1 hour
  }
}));

// authenticate
const passport = require('./authentication/config.js')
const admin = require('./authentication/route.js')
app.use(passport.initialize())
app.use(passport.session())
app.use('/admin', admin)



// portfolio
const portfolio = require('./portfolio/route.js')
app.use('/portfolio', portfolio)

//recommendation
const recommendation = require('./recommendation/route.js')
app.use('/recommendation', recommendation)

// service
const service = require('./service/route.js')
app.use('/service', service)
// education
const educationRoute = require('./education/router.js')
app.use('/education', educationRoute)
// history
const historyRoute = require('./history/route.js')
app.use('/history', historyRoute)
// mail
const mail = require('./mail/router.js')
app.use('/mail', mail)
// ejs
const ejs = require('ejs')
const { updateSearchIndex } = require('./history/model.js')
app.set('view engine', 'ejs')
app.set('views', './view')

app.get('/mail', (req, res) => {
  res.render('donateTemplate', { name: 'sdaasd', mail: 'er', message: "hi", phoneNo: '23132344', amount: '123' })
})
// cloudinary
const cloudinary=require('./cloudinary/route.js')
app.use('/cloudinary',cloudinary)

//  index
app.get('/', (req, res) => {
  res.send('hi buddy', mail)
})
// listen
app.listen(PORT, () => {
  console.log('server is running ....')
})