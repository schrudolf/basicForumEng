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
                    res.render("forgot/newpw", {tokenid: newtoken.forgottoken});
                }
            }
        })
    }
}