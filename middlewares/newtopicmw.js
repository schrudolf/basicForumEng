module.exports = function(objRepo) {
    return function(req,res,next){
        if(typeof req.body.title === "undefined"){
           return res.render('newtopic', {id: req.params.id, forumid: req.params.forumid});
        }
        if(req.body.title === "" || req.body.desc === "") {
            res.locals.errorMsg.push("Nem töltöttél ki minden mezőt!")
            return res.render('newtopic', {id: req.params.id, forumid: req.params.forumid});
        }if(req.body.title.length > 30) {
            res.locals.errorMsg.push("Maximum 30 karakteres lehet a címe!")
            return res.render('newtopic', {id: req.params.id, forumid: req.params.forumid});
        } else {
            objRepo.Forum.findById(req.params.forumid, function(err, forum){
                if(err){
                    console.log(err);
                } else {
                    objRepo.Topic.create({title: req.body.title, author: req.body.author, desc: req.body.desc, img: req.body.img}, function(err, newtopic){
                        if(err){
                            console.log(err);
                        } else {
                            forum.topics.push(newtopic);
                            forum.save();
                            req.flash("success_msg", "Sikeresen létrehoztad - " + req.body.title)
                            res.redirect('/forum/' + req.params.id + '/' + req.params.forumid + '/');
                            return next();
                        }
                    })

                        }
                    })
                }
                }
        }