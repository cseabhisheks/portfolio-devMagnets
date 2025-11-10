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
    credentials:true
}))
// dummy data for authentication
const user = { name: 'abhishek', password: '1234', id: '1' }
// authentication
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const session = require('express-session')
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret: "abhi@123",
    cookie:{secure:false,maxAge:1000*60*60}//1hr
}))
app.use(passport.initialize())
app.use(passport.session())
const field = {
    usernameField: 'username',
    passwordField: 'password'
}
const validate = (username, password, done) => {
    if (username != user.name || password != user.password) return done(null, false, { mess: 'either username is wrong or password! 🥲' })
    return done(null, user)
}
passport.use(new localStrategy(field, validate))

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
    if (user.id == id) return done(null, user)
})
app.post('/admin', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.json({ mess: "server error", success: false })
        if (!user) return res.json({ mess: info.mess, success: false })
        req.logIn(user, (err) => {
            if (err) return res.json({ mess: 'login error', success: false })
            console.log(req.session)
        console.log(res.cookie)
            return res.json({ mess: 'hi dev', success: true })
        })
    })(req, res, next)

})
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.json({ success: false })
    })
    return res.json({ success: true })
})
app.get('/check', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ loggedIn: true, user: req.user });
  } else {
    return res.json({ loggedIn: false });
  }
});

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

//  index
app.get('/', (req, res) => {
    res.send('hi buddy', mail)
})
// listen
app.listen(PORT, () => {
    console.log('server is running ....')
})