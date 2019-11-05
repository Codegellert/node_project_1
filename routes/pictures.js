const express = require('express'),
    Router = express.Router(),
    mongoose = require('mongoose'),
    { ensureAuthenticated } = require('../config/auth'),
    User = require('../Models/User'),
    Avaibility = require('../Models/Avaibility'),
    Book = require('../Models/Book');



Router.get('', (req,res) => {
    res.render('pictures');
})




module.exports = Router;