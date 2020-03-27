module.exports = function(objRepo){
    return function(req,res,next){
        objRepo.Comment.findOne({_id: req.params.commentid}, function(err, comment){
            if(err) {
                return console.log(err);
            } if(comment.author !== res.locals.user.username){
                req.flash("error_msg", "Más hozzászólását nem módosíthatod!");
                return res.redirect("/forum/" + req.params.contentid + "/" + req.params.forumid + "/" + req.params.topicid);
            } else {
                if(typeof req.body.desc === "undefined"){
                    return res.render("user/editcomment", {comment: comment, id: req.params.id, forumid: req.params.forumid, topicid: req.params.topicid})
                 }
                if(req.body.desc === ""){
                    res.locals.errorMsg.push("Nem küldheted be üresen!");
                    res.render("user/editcomment", {comment: comment, id: req.params.id, forumid: req.params.forumid, topicid: req.params.topicid});
                } else {
                    comment.desc = req.body.desc;
                    comment.save();
                    req.flash("success_msg", "Sikeresen módosítottad!");
                    res.redirect("/forum/" + req.params.contentid + "/" + req.params.forumid + "/" + req.params.topicid);
                }
            }
        })
    }
}