//ADMIN-------------------------------------------
const express = require('express'),
    Router = express.Router(),
    { ensureAuthenticated } = require('../config/auth')
    User = require('../Models/User');
const mongoose = require('mongoose');
const Book = require('../Models/Book');
const Avaibility = require('../Models/Avaibility');
let months = [
    'june',
    'july',
    'august'
]

Router.get('/',ensureAuthenticated, async (req, res ) => {
    const books = await Book.find().populate('bookIds');
    res.render('admin', {
        name: req.user.name,
        email: req.user.email,
        months,
        books
    });
})
Router.post('/insertAvaibility',ensureAuthenticated, async (req, res ) => {
    const avaibility = new Avaibility({
        fromMonth: req.body.fromMonth,
        fromDay: req.body.fromDay,
        toMonth: req.body.toMonth,
        toDay: req.body.toDay,
    });
    const result = await avaibility.save();
    res.redirect('/me/admin');
})
Router.post('/remove/:bookId',ensureAuthenticated, async (req, res ) => {
    const bookId = req.params.bookId;
    const {bookIds} = await Book.findOne({_id: bookId});
    for (let i = 0; i < bookIds.length; i++) {

        let week = await Avaibility.findOneAndUpdate({_id: bookIds[i]}, {
            pending: false,
            available: true
        });
        
    }
    await Book.findOneAndDelete({_id: bookId});
    res.redirect('/me/admin')
})

Router.post('/reserve/:bookId',ensureAuthenticated, async (req, res ) => {
    const bookId = req.params.bookId;
    const {bookIds} = await Book.findOne({_id: bookId});
    for (let i = 0; i < bookIds.length; i++) {

        let week = await Avaibility.findOneAndUpdate({_id: bookIds[i]}, {
            pending: false,
            available: false
        });
        
    }
    res.redirect('/me/admin')
})

module.exports = Router;