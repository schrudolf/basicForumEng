module.exports = function(objRepo){
    return function(req,res,next) {
        objRepo.Comment.findByIdAndDelete({_id: req.params.commentid}, function(err, comment){
            if(err){
                req.flash('error_msg', 'Hiba nem törölhető!')
                return res.redirect('back');
            } else {
                req.flash('success_msg', 'Sikeresen törölted!')
                return res.redirect('back');
            }
        })
    }
}