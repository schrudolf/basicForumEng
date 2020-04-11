const express   = require('express');
const dbConnect = require('./config/db');
const mongoose  = require('mongoose');
const app       = express();
const flash = require('connect-flash');
const session = require('express-session')
const moment = require('moment');

moment.locale("hu"); 

require('dotenv').config()

app.set('view engine', 'ejs');
app.use(express.static('files'))
app.use(express.urlencoded({ extended: true }))

app.use(
    session({
        name: 'test cookie',
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);

// Connect flash
app.use(flash());


// Global variables
app.use(function(req,res,next) {
    res.locals.loggedUser = req.session.successLogin;
    res.locals.user = req.session.user;
    res.locals.errorMsg = req.flash('error_msg');
    res.locals.successMsg = req.flash('success_msg');
    app.locals.moment = require('moment');
    next();
})

// Load routing
require('./route/index')(app);


app.listen(80, process.env.IP_HOST, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Weboldal 80-as porton');
    }
});
