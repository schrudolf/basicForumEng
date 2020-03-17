module.exports = function(objRepo){
    return function(req,res,next){
        if(typeof req.body.username === "undefined") {
        return res.render('user/register')
        } 
        return next();
    }
}