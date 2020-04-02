const bcrypt = require('bcryptjs');

module.exports = function(objRepo){
    return function(req,res,next){
        objRepo.User.findOne({email: req.body.email},function(err, forgotuser){
            if(err){
                return console.log(err);
            } if(!forgotuser){
                res.locals.errorMsg.push("Nincs ilyen felhasználó")
                res.render("forgot/forgot");
            } else {
                const token = bcrypt.hashSync('secrettoken', 10);
                function savetoken(token){
                    forgotuser.forgottoken = token;
                    forgotuser.forgottokenexpire = Date.now() + 3600000;
                    forgotuser.save();
                    res.locals.token = token;
                    res.locals.forgotuser = forgotuser;
                    req.flash('success_msg', (res.locals.forgotuser.email) + ' | E-mail címre elküldtük a jelszó módosításához szükséges linket!');
                    res.redirect('/forum/login');
                    return next();
                }
                savetoken(token)
            }
        })
    }
}