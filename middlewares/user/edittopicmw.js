module.exports = function(objRepo){
    return function(req,res,next){
        objRepo.Topic.findOne({_id: req.params.topicid}, function(err, topic){
            if(err) {
                return console.log(err);
            } if(topic.author !== res.locals.user.username){
                req.flash("error_msg", "Más témáját nem módosíthatod!");
                return res.redirect("/forum/" + req.params.contentid + "/" + req.params.forumid + "/" + req.params.topicid);
            } else {
                if(typeof req.body.title === "undefined"){
                    return res.render("user/edittopic", {topic: topic, id: req.params.id, forumid: req.params.forumid, topicid: req.params.topicid})
                 }
                if(req.body.title === "" || req.body.desc === ""){
                    res.locals.errorMsg.push("Nem küldheted be üresen!");
                    res.render("user/edittopic", {topic: topic, id: req.params.id, forumid: req.params.forumid, topicid: req.params.topicid});
                } else {
                    topic.title = req.body.title;
                    topic.desc = req.body.desc;
                    topic.save();
                    req.flash("success_msg", "Sikeresen elmentetted a változtatásokat!");
                    res.redirect("/forum/" + req.params.contentid + "/" + req.params.forumid + "/" + req.params.topicid);
                }
            }
        })
    }
}