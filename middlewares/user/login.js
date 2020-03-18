const bcrypt = require('bcryptjs');

module.exports = function(objRepo){
    return function(req,res,next){
        if(typeof req.body.username === "undefined") {
            return res.render('user/login')
            } 
        objRepo.User.findOne({username: req.body.username}, async function(err, user){
            if(err) {
                return console.log(err);
            } else {
                if(user === null){
                    console.log('Nem található ilyen felhasználó')
                    return res.redirect('/forum/login')
                }
                try {
                    if(await bcrypt.compare(req.body.password, user.password)) {
                        console.log('Sikeres belépés')
                        return res.redirect('/forum/') 
                    } else {
                        console.log('Nem jó jelszó')
                        return res.redirect('/forum/login')
                    }
                }   catch {
                    res.status(500).send()
                } 
            }
        })

    }   
}