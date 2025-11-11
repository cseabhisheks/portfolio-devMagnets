// authentication
const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const user={name:'abhishek',password:'1234',id:2030}

const field = {
    usernameField: 'username',
    passwordField: 'password'
}

const validate = (username, password, done) => {
    if (username != user.name || password != user.password) return done(null, false, { mess: 'either username is wrong or password! 🥲,you can try again' })
    return done(null, user)
}
passport.use(new localStrategy(field, validate))

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
    if (user.id == id) return done(null, user)
})

module.exports=passport