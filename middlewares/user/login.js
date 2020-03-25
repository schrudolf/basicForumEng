const bcrypt = require('bcryptjs');

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
                try {
                    if(await bcrypt.compare(req.body.password, user.password)) {
                        req.flash('success_msg', 'Üdvözöllek a fórumon! ' + user.username)
                        req.session.successLogin = true;
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