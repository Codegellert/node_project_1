const express = require('express'),
    Router = express.Router(),
    { ensureAuthenticated } = require('../config/auth')
    Comment = require('../Models/Comment')
    mongoose = require('mongoose');

Router.get('/',ensureAuthenticated, async (req, res) => {
    const comments = await Comment.find();
    res.render('lounge', {
        name: req.user.name,
        email: req.user.email,
        comments: comments
    })
})

Router.post('/saveComment',ensureAuthenticated, (req, res) => {
    const newComment = new Comment ({
        email: req.user.email,
        subject: req.body.subject,
        text: req.body.comment
    })
    newComment.save()
        .then(user => res.redirect('/lounge'))
        .catch(err => console.log(err));
})

module.exports = Router;