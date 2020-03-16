module.exports = function(objRepo) {
    return function(req,res,next){
        if(typeof req.body.title === "undefined"){
           return res.render('newtopic', {id: req.params.id, forumid: req.params.forumid, error: objRepo.error});
        }
        if(req.body.title === "" || req.body.author === "" || req.body.desc === "") {
            objRepo.error.push("Nem töltöttél ki minden mezőt!")
            res.render('newtopic', {id: req.params.id, forumid: req.params.forumid, error: objRepo.error});
        } else {
            objRepo.Forum.findById(req.params.forumid, function(err, forum){
                if(err){
                    console.log(err);
                } else {
                    objRepo.Topic.create({title: req.body.title, author: req.body.author, desc: req.body.desc}, function(err, newtopic){
                        if(err){
                            console.log(err);
                        } else {
                            forum.topics.push(newtopic);
                            forum.save();
                            res.redirect('/forum/' + req.params.id + '/' + req.params.forumid + '/');
                            return next();
                        }
                    })

                        }
                    })
                }
                }
        }