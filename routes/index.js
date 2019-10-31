const express = require('express');

const Router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//welcome page
Router.get('/', (req, res) => {
    res.render('welcome', {name : "Gellert"});
})
//dashboard
Router.get('/home', ensureAuthenticated, (req, res) => {
    res.render('home',{
        name: req.user.name,
        email: req.user.email
    } );
})
Router.get('/me', ensureAuthenticated, (req, res) => {
    res.render('me',{
        name: req.user.name,
        email: req.user.email,
        password: req.user.password,
    } );
})
Router.get('/pricing', ensureAuthenticated, (req, res) => {
    res.render('pricing',{
        name: req.user.name,
        email: req.user.email,
        password: req.user.password,
    } );
})




module.exports = Router;