module.exports = function(objRepo) {
    return function(req,res,next){
        objRepo.Newcontent.find().populate("forums").exec(function(err, data){
            if(err){
                console.log(err);
            } else {
                    return res.render('index', {content: data});
                    }
                    next();
                }
            )}
}
        

            
    
