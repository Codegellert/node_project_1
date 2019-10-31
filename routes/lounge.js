const express = require('express'),
    Router = express.Router(),
    { ensureAuthenticated } = require('../config/auth')
    Comment = require('../Models/Comment')
    mongoose = require('mongoose');

Router.get('/',ensureAuthenticated, async (req, res) => {
    if(!req.query.subject) {
        const subjects = new Array;
        const comments = await Comment.find();
        comments.forEach(comment => {
            if (!subjects.includes(comment.subject)) {
                subjects.push(comment.subject);
            }
        });
        console.log(subjects);
        res.render('lounge', {
            name: req.user.name,
            email: req.user.email,
            comments: comments,
            subjects,
            subject: ''
        })
    }else {
        const subject = req.query.subject;
        const specComments = await Comment.find({subject});
        const subjects = new Array;
        const comments = await Comment.find();
        comments.forEach(comment => {
            if (!subjects.includes(comment.subject)) {
                subjects.push(comment.subject);
            }
        });

    res.render('lounge', {
        name: req.user.name,
        email: req.user.email,
        comments: specComments,
        subjects,
        subject: subject
    })
    }
    
})

Router.post('/saveComment',ensureAuthenticated, (req, res) => {
    const subject = req.body.subject;
    const newComment = new Comment ({
        email: req.user.email,
        subject: req.body.subject,
        text: req.body.comment
    })
    newComment.save()
        .then(user => res.redirect('/lounge?subject='+subject))
        .catch(err => console.log(err));
})

module.exports = Router;