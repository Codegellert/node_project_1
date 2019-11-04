const express = require('express'),
    Router = express.Router(),
    mongoose = require('mongoose'),
    { ensureAuthenticated } = require('../config/auth')
    User = require('../Models/User')
    Avaibility = require('../Models/Avaibility'),
    Book = require('../Models/Book');


Router.get('/', ensureAuthenticated, (req, res) => {
    res.render('me',{
        name: req.user.name,
        email: req.user.email,
        password: req.user.password,
        admin: req.user.admin
    } );
})
Router.post('/change/:wich', ensureAuthenticated, async (req, res) => {
    const user = await User.findOne({email: req.user.email});
    const wich = req.params.wich;
    const id = req.user.id;
    if (wich == 'name') {
        await User.update({_id: id}, {name:req.body.name})
    }
    if (wich == 'email') {
        await User.update({_id: id}, {email:req.body.email})
    }
    res.redirect('/me');

    
})




    

module.exports = Router;
