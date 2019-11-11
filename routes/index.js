const express = require('express');

const Router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const User = require('../Models/User');

//welcome page

//dashboard
Router.get('/', (req, res) => {
    res.render('home');
})
Router.get('/services', (req, res) => {
    res.render('services');
})



module.exports = Router;
