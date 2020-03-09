const dbConnect = require('./config/db');
const express   = require('express');
const mongoose  = require('mongoose');
const app       = express();

app.set('view engine', 'ejs');
app.use(express.static('files'))
app.use(express.urlencoded({ extended: true }))

// Load routing
require('./route/index')(app);

app.listen(3000, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Weboldal 3000-es porton');
    }
});
