const express = require('express'),
    Router = express.Router(),
    User = require('../Models/User'),
    bcrypt = require('bcryptjs')
    passport = require('passport');


Router.get('/login', (req, res) => {
    res.render('login');
})

Router.get('/register', (req, res) => {
    res.render('register');
})

//Register handle

Router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body;
    let errors = [];
    if (!name || !email || !password || ! password2) {
        errors.push({msg : 'Please fill in all the fields..'});
    }
    if (password != password2) {
        errors.push({msg: 'Passwords does not match..'})
    }
    if(password.length < 6) {
        errors.push({msg: 'Password should be atlest 6 characters..'})
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }else {
        //validation done
        const user = User.findOne({email: email})
            .then(user =>  {
                if (user) {
                    //user exists
                    errors.push({msg: 'This e-mail is already in use..'});
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    //hash pwd

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //Set pwd to hashed
                            newUser.password = hash;
                            //Save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in..');
                                    res.redirect('/users/login');

                                
                                })
                                .catch(err => console.log(err));
                        })
                    })
                }
            }); 
    }
})
//login handle
Router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true // error néven létrehoz egy flash messaget
    })(req, res, next);
})

//logout handle
Router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
})

module.exports = Router;