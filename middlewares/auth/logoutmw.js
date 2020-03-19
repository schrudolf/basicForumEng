module.exports = function(objRepo){
    return function(req,res,next){
        req.session.destroy(function(err) {
            res.redirect('/forum/login')
          })
    };
};