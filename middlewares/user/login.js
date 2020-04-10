const bcrypt = require('bcryptjs');
const ip = require('ip');

module.exports = function(objRepo){
    return function(req,res,next){
        if(typeof req.body.username === "undefined") {
            return res.render('user/login')
            }
        if(!req.body.username || !req.body.password){
            res.locals.errorMsg.push('Nem töltöttél ki minden mezőt!');
            return res.render('user/login');
        }     
        objRepo.User.findOne({username: req.body.username}, async function(err, user){
            if(err) {
                return console.log(err);
            } else {
                if(!user){
                    res.locals.errorMsg.push('Nem található ilyen felhasználó');
                    return res.render('user/login');
                }
                if(!user.active){
                    res.locals.errorMsg.push('Felhasználó nem aktív. Kérlek aktiváld e-mailben kapott linkel');
                    return res.render('user/login');
                }
                try {
                    if(await bcrypt.compare(req.body.password, user.password)) {
                        req.flash('success_msg', 'Üdvözöllek a fórumon! ' + user.username)
                        req.session.successLogin = true;
                        user.ipaddress = ip.address();
                        user.save();
                        req.session.user = user;
                        res.redirect('/forum/') 
                    } else {
                        res.locals.errorMsg.push('Hibás jelszó!');
                        return res.render('user/login');
                    }
                }   catch {
                    res.status(500).send()
                } 
            }
        })

    }   
}