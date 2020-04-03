const bcrypt = require("bcryptjs");

module.exports = function(objRepo){
    return function(req,res,next){
        objRepo.User.findOne({forgottoken: req.params.id}, function(err, newtoken){
            if(err){
                return console.log(err);
            } else {
                if(!newtoken || newtoken.forgottokenexpire < new Date()){
                    req.flash("error_msg", "Nem létező vagy lejárt! Kérlek igényelj újat")
                    return res.redirect("/forum/forgot");
                } else {
                    const {password, passwordre} = req.body;
                    if(password !== passwordre){
                        req.flash("error_msg", "Nem egyeznek a megadott jelszavak!")
                        res.redirect("back");
                    } else {
                        bcrypt.genSalt(10, (err,salt) => {
                            bcrypt.hash(password, salt, (err, hash) => {
                                if(err) throw err;
                                newtoken.password = hash;
                                newtoken.forgottoken = undefined;
                                newtoken.forgottokenexpire = undefined;
                                newtoken.save()
                                req.flash('success_msg','Sikeresen módosítottad! Most már bejelentkezhetsz új jelszóval.');
                                res.redirect('/forum/login')
                                });
                            })
                            res.locals.newtoken = newtoken;
                            next();
                        }
                }
            }
        })
    }
}