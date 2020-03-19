const express   = require('express');
const dbConnect = require('./config/db');
const mongoose  = require('mongoose');
const app       = express();
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

app.use(function(req,res,next) {
    res.locals.loggedUser = req.session.successLogin;
    res.locals.username = req.session.username;
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
