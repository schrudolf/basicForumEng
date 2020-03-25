module.exports = function(objRepo){
    return function(req,res,next) {
        objRepo.Comment.findOne({_id: req.params.commentid}, function(err, comment){
            if(err){
                req.flash('error_msg', 'Hiba nem törölhető!')
                return res.redirect('/forum/' + req.params.contentid + "/" + req.params.forumid + "/" + req.params.topicid);
            } if(comment.author !== user.username){
                req.flash('error_msg', 'Csak a saját hozzászólásod törölheted!')
                return res.redirect('/forum/' + req.params.contentid + "/" + req.params.forumid + "/" + req.params.topicid);
            } else {
                comment.delete();
                req.flash('success_msg', 'Sikeresen törölted a hozzászólásod!');
                return res.redirect('/forum/' + req.params.contentid + "/" + req.params.forumid + "/" + req.params.topicid);
            }
        })
    }
}