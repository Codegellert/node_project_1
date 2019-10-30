const express = require('express');

const Router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//welcome page
Router.get('/', (req, res) => {
    res.render('welcome', {name : "Gellert"});
})
//dashboard
Router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard',{
        name: req.user.name,
        email: req.user.email
    } );
})




module.exports = Router;