module.exports = function(objRepo){
    return function(req,res,next){
        req.flash("success_msg", "Sikeresen kijelentkeztél!");
        res.redirect('/forum/login')
        setTimeout(function(){
            req.session.destroy(function(err) {
            })
        },2000) 
    };
};