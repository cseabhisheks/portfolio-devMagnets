const passport = require('./config')
const login = (req, res, next) => {
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

}
const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.json({ success: false })
    req.session.destroy((err) => {
      if (err) return res.json({ sucess: false })
      res.clearCookie('connect.sid')
      return res.json({ success: true })
    })
  })
}
const isAuthenticated = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ loggedIn: true, user: req.user });
  } else {
    return res.json({ loggedIn: false });
  }
}

module.exports = { login, logout, isAuthenticated }