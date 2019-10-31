const express = require('express');

const Router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const User = require('../Models/User');

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
Router.get('/me', ensureAuthenticated, async (req, res) => {
    const user = await User.findOne({email: req.user.email});
    console.log(user);
    if (req.query.changeName) {
        user.name = req.query.changeName;
        console.log('name updated..');
    }
    if(req.query.changeEmail) {
        user.email = req.query.changeEmail;
        console.log('email updated..');
    }
    res.redirect('/me');
    
})




module.exports = Router;