const express = require('express');

const Router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const User = require('../Models/User');
const nodemailer = require('nodemailer');

Router.get('/',ensureAuthenticated,  (req, res) => {
    res.render('contact', {
        name: req.user.name,
        email: req.user.email
    })
})
Router.post('/send-mail', async (req,res) => {
    const output = `
    <p>Új email érkezett</p>
    <h3> Küldő fél adatai: </h3>
    <ul>
        <li>Neve: <b>${req.body.name}</b></li>
        <li>Email címe: <b>${req.body.email}</b></li>
        <li>Telefonszáma: <b>${req.body.phone} </b></li>
    </ul>
    <h3> Üzenet:  </h3>
    <p> ${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.me.com',
        port: 587,
        secure: false,
        auth: {
            user: 'gellertpuskas@icloud.com', 
            pass: 'tppt-tmul-deuf-imki' 
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let info = await transporter.sendMail({
        from: '"Pelsoporta kapcsolat" <gellertpuskas@icloud.com>', 
        to: 'gellertpuskas@gmail.com', 
        subject: req.body.subject, 
        text: req.body.message, 
        html: output 
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.redirect('/')
})

Router.post('/send-circular', async (req,res) => {
    const emails = await User.find().select({email: 1, _id: 0});
    
    const output = `
    <h1>Pelso Porta körlevél:</h1>
    <p> Feladó: ${req.body.name} </p
    <p> Feladó elérhetőségei: </p>
    <ul>
        <li> Telefon: ${req.body.phone} </li>
        <li> E-mail: ${req.body.email} </li>
    </ul>
    <h3> Üzenet:  </h3>
    <p> ${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.me.com',
        port: 587,
        secure: false,
        auth: {
            user: 'gellertpuskas@icloud.com', 
            pass: 'tppt-tmul-deuf-imki' 
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    for (let i = 0; i < emails.length; i++) {
        await transporter.sendMail({
            from: '"Pelsoporta körüzenet" <gellertpuskas@icloud.com>', 
            to: emails[i], 
            subject: req.body.subject, 
            text: req.body.message, 
            html: output 
        });
        // console.log('Message sent: %s', info.messageId);
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    res.redirect('/me/admin');
})

module.exports = Router