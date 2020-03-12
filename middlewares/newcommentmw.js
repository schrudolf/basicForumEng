module.exports = function(objRepo) {
    return function(req,res,next){
        if(req.body.author === '' || req.body.desc === ''){
           console.log('nem töltött ki minden mezőt');
        } else {
            objRepo.Topic.findById(req.params.topicid, function(err, newcomment){
                if(err){
                    res.redirect('/forum/')
                } else {
                    objRepo.Comment.create({author: req.body.author, desc: req.body.desc}, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            newcomment.comments.push(comment);
                            newcomment.save();
                            res.redirect('/forum/' + req.params.id + '/' + req.params.forumid + '/' + req.params.topicid);
                            return next();
                        }
                    })

                        }
                    })
                }
            }
        }