module.exports = function(objRepo) {
    return function(req,res,next){
        if(objRepo.error !== 0) {
            setTimeout(function() {
                 objRepo.error = [];
             }, 300)
             return next();
         }
    }
}