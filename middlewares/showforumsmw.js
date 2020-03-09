module.exports = function(objRepo){
    return function(req,res,next){
        objRepo.Newcontent.findById(req.params.id).populate('forums').exec(function(err, forums){
            if(err){
                console.log(err);
            } else {
               res.render('forums', {forums: forums})
               return next();
            }
        })
    }
}