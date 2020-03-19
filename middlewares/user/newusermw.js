const bcrypt = require('bcryptjs');

module.exports = function(objRepo){
    return function(req,res,next){
        const { username, email, password, repassword} = req.body;
        if(!username || !email || !password || !repassword){
            res.locals.errorMsg.push("Nem töltöttél ki minden mezőt!");
            return res.render("user/register")
        }
        if(password !== repassword){
            res.locals.errorMsg.push("A két jelszó nem egyezik!");
            return res.render("user/register")
        }
        else {
            objRepo.User.findOne({ username: username}).then(user => {
                if(user){
                    res.locals.errorMsg.push("A megadott felhasználónév már létezik!");
                    return res.render("user/register")
                } else {
                    objRepo.User.findOne({ email: email}).then(checkemail => {
                        if(checkemail){
                            res.locals.errorMsg.push("A megadott e-mail már létezik!");
                            return res.render("user/register")
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
                                req.flash('success_msg','Sikeres regisztráció!');
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