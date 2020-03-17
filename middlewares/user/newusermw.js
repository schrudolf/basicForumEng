module.exports = function(objRepo){
    return function(req,res,next){
        const { username, email, password, repassword} = req.body;
        if(!username || !email || !password || !repassword){
            return console.log("Nem töltöttél ki minden mezőt!");
        }
        if(password !== repassword){
            return console.log('A két jelszó nem eggyezik');
        }
        else { objRepo.User.create({username, email, password}, function(err, newuser){
            if(err){
                return console.log(err);
            } 
               newuser.save();
               console.log(newuser)
               res.redirect('/forum/login')
        }) 
         //asdasd
    }
    }
}