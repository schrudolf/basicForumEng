module.exports = function(objRepo){
    return function(req,res,next){
        objRepo.User.findOne({activetoken: req.params.id}, function(err, token){
            if(err){
               return console.log(err);
            } else {
                if(!token){
                    req.flash('error_msg','Nem létező vagy lejárt!');
                    res.redirect('/forum/login')
                } else {
                    token.active = true;
                    token.activetoken = undefined;
                    token.save();
                    req.flash('success_msg','Sikeresen aktiváltad most már bejelentkezhetsz!');
                    res.redirect('/forum/login')
                }
            }
        })
    }
}