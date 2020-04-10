module.exports = function(objRepo){
    return function(req,res,next){
        objRepo.User.findOne({username: req.session.user.username}, function(err, user){
            if(err){
                return console.log(err);
            } else {
            user.upload = true;
            user.save();
            req.session.user.upload = true;
            res.redirect("back");
            }
        })
    }
}