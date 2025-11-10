const { login, logout, isAuthenticated } = require('./controller.js')
const express = require('express')
const Router = express.Router()
Router.post('/login', login)
Router.get('/logout', logout)
Router.get('/isAuthenticated', isAuthenticated);
module.exports = Router