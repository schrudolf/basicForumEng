module.exports = function(objRepo){
    return function(req,res,next){
        if(!req.session.successLogin){
            res.redirect("/forum/login")
        } else {
            return next();
        }
    }
}