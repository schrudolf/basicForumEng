const bcrypt = require('bcryptjs');

module.exports = function(objRepo){
    return function(req,res,next){
        const { username, email, password, repassword} = req.body;
        if(!username || !email || !password || !repassword){
            return console.log("Nem töltöttél ki minden mezőt!");
        }
        if(password !== repassword){
            return console.log('A két jelszó nem eggyezik');
        }
        else {
            objRepo.User.findOne({ username: username}).then(user => {
                if(user){
                    console.log("Ez a felhasználó már létezik!")
                    return res.render('user/register')
                } else {
                    objRepo.User.findOne({ email: email}).then(checkemail => {
                        if(checkemail){
                            console.log("Ezzel az e-mailel már regisztráltak!")
                            return res.render('user/register')
                    } else {
                        const newUser = new objRepo.User({
                            username,
                            email,
                            password
                        });

                        bcrypt.genSalt(10, (err,salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if(err) throw err;
                                newUser.password = hash;
                                newUser.save()
                                res.redirect('/forum/login')
                                });
                            })
                    }
                })
                    
                }
            })
    }
    }
}