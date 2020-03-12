module.exports = function(objRepo) {
    return function(req,res,next){
        objRepo.Newcontent.find({}, function(err, data){
            if(err){
                console.log(err);
            } else {
                    return res.render('index', {content: data});
                    }
                    next();
                }
        )}
}
        

            
    
