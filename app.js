const express   = require('express');
const dbConnect = require('./config/db');
const mongoose  = require('mongoose');
const app       = express();
const flash = require('connect-flash');
const session = require('express-session')



app.set('view engine', 'ejs');
app.use(express.static('files'))
app.use(express.urlencoded({ extended: true }))

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true
    })
);

// Connect flash
app.use(flash());



// Global variables
app.use(function(req,res,next) {
    res.locals.loggedUser = req.session.successLogin;
    user = req.session.user;
    res.locals.errorMsg = req.flash('error_msg');
    res.locals.successMsg = req.flash('success_msg');
    next();
})

// Load routing
require('./route/index')(app);

app.listen(3000, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Weboldal 3000-es porton');
    }
});
