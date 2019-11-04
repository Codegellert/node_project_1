const express = require('express');

const Router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const User = require('../Models/User');

//welcome page
Router.get('/', (req, res) => {
    res.render('welcome', {name : "Gellert"});
})
//dashboard
Router.get('/pictures', (req, res) => {
    res.render('pictures');
})

Router.get('/pricing', (req, res) => {
    res.render('pricing');
})




module.exports = Router;