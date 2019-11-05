const express = require('express'),
    Router = express.Router(),
    mongoose = require('mongoose'),
    { ensureAuthenticated } = require('../config/auth'),
    User = require('../Models/User'),
    Avaibility = require('../Models/Avaibility'),
    Book = require('../Models/Book');

let basket = [];

function basketInvalid(phone, person, req) {
    let invalid = false;
    if (phone.length < 5 || phone.length > 15) {
        
        req.flash('error_msg_basketPhone', 'Hibás telefonszám, Próbálja újra..')
        invalid = true;
    }
    if (person > 6 || person < 1) {
        req.flash('error_msg_basketPerson', 'Maximum 6 személy, Minimum 1. Próbálja újra');
        invalid = true;
    }
    return invalid;
}




Router.get('/',ensureAuthenticated, async(req, res) => {
    const availables = await Avaibility.find();
    const basket = [];
    res.render('book', {
        availables,
        basket
    })
})
Router.post('/', ensureAuthenticated, async (req, res) => {
    bookIds = req.body.bookId;
    
    const availables = await Avaibility.find();
    
    if(typeof bookIds == 'string'){
        const element = await Avaibility.findById(bookIds);
        
        basket.push({
            id: element._id,
            fromMonth: element.fromMonth, 
            fromDay: element.fromDay,
            toMonth: element.toMonth,
            toDay: element.toDay
        })
        res.render('book', {
            basket,
            availables,
            email: req.user.email,
            name: req.user.name
    
        })
        basket = [];
    }
    for (let i = 0; i < bookIds.length; i++) {
        
        const element = await Avaibility.findById(bookIds[i]);
        basket.push({
            id: element._id,
            fromMonth: element.fromMonth, 
            fromDay: element.fromDay,
            toMonth: element.toMonth,
            toDay: element.toDay
        })
    }
    res.render('book', {
        basket,
        availables,
        email: req.user.email,
        name: req.user.name

    })
    basket = [];
})
Router.post('/final', async(req, res) => {
    datas = req.body;
    if(basketInvalid(datas.phone, datas.person, req)) {
        res.redirect('/book');
    }
    if(typeof bookIds == 'string'){
        const book = new Book ({
            
            name: datas.name,
            phone: datas.phone,
            persons: datas.person,
            email: datas.email,
            bookIds: [bookIds]
        })
        await Avaibility.update({_id : bookIds}, {pending: true});
        const result = await book.save();
        req.flash('success_msg', 'Successfully booked, the landlord will call you shortly..')
        res.redirect('/book');
    }else {
        const book = new Book ({
            name: datas.name,
            phone: datas.phone,
            persons: datas.person,
            email: datas.email,
            bookIds: bookIds
        })
        for (let i = 0; i < bookIds.length; i++) {
            await Avaibility.update({_id : bookIds[i]}, {pending: true});
        }
            
        
        
        const result = await book.save();
        req.flash('success_msg', 'Successfully booked, the landlord will call you shortly..')
        res.redirect('/book');

    }
    
})

module.exports = Router