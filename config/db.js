const mongoose = require('mongoose');

module.exports= mongoose.connect('mongodb://localhost:27017/forum',{useNewUrlParser: true, useUnifiedTopology: true}, function(err){
  if(err){
    console.log(err);
  } else {
    console.log('Sikeres adatbázis kapcsolat')
  }
});