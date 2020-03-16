module.exports = function(objRepo) {
    return function(req,res,next) {
        if(typeof req.body.title !== "undefined"){
            if(req.body.title === '' || req.body.desc === ''){
                objRepo.error.push('Hiba: Üresen hagyott mezők!')
                return res.render('newcontent', {error: objRepo.error});
            }
            objRepo.Newcontent.create({title: req.body.title, desc: req.body.desc}, function(err, newcontent){
                if(err){
                    console.log(err);
                } else{
                    console.log(newcontent)
                    res.redirect('/forum/');
                    next();
                }
            })
        } else {
            return res.render('newcontent', {error: objRepo.error});
        }
    }
}
    
