module.exports = function(objRepo) {
    return function(req,res,next){
        if(typeof req.body.forumname === "undefined"){
           return res.render('newforum', {id: req.params.id, error: objRepo.error});
        } else {
            if(req.body.forumname === ''){
                objRepo.error.push('Üresen hagytad a mezőt!')
                return res.render('newforum', {id: req.params.id, error: objRepo.error});
            }
            objRepo.Newcontent.findById(req.params.id, function(err, newcontent){
                if(err){
                    console.log(err);
                } else {
                    objRepo.Forum.create({forumname: req.body.forumname}, function(err, newforum){
                        if(err){
                            console.log(err);
                        } else {
                            newcontent.forums.push(newforum);
                            newcontent.save();
                            res.redirect('/forum/' + req.params.id + '/');
                            return next();
                        }
                    })

                        }
                    })
                }
            }
        }