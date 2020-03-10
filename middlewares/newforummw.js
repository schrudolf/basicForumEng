module.exports = function(objRepo) {
    return function(req,res,next){
        if(typeof req.body.forumname === "undefined"){
           return res.render('newforum', {id: req.params.id});
        } else {
            objRepo.Newcontent.findById(req.params.id, function(err, newcontent){
                if(err){
                    console.log(err);
                    res.redirect('/forum/:id/new')
                } else {
                    objRepo.Forum.create({forumname: req.body.forumname}, function(err, newforum){
                        console.log(newforum)
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