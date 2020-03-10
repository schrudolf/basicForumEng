module.exports = function(objRepo){
    return function(req,res,next){
        objRepo.Forum.findById(req.params.forumid).populate('topics').exec(function(err, topic){
            if(err){
                console.log(err);
            } else {
                var data = {
                    topic: topic,
                    contentid: req.params.id,
                    forumid: req.params.forumid
                }
               res.render('topic', {topic: data})
               return next();
            }
        })
    }
}