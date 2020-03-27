module.exports = function(objRepo){
    return function(req,res,next){
        objRepo.User.findOne({_id: req.params.userid}, function(err, currentUser){
            if(err){
                return console.log(err);
            } if(currentUser.username !== res.locals.user.username){
                req.flash("error_msg", "Más profilképét nem módosíthatod!");
                return res.redirect("/forum/");
            }  if(typeof req.body.img === "undefined"){
                return res.render("user/edituserimg")
             } if(req.body.img === ""){
                res.locals.errorMsg.push("Nem küldheted be üresen!");
                res.render("user/edituserimg");
            } else {
                currentUser.img = req.body.img;
                currentUser.save();
                objRepo.Comment.find({author: currentUser.username}, function(err, commentimg){
                    if(err){
                        console.log(err);
                    } else {
                        objRepo.Comment.updateMany({author: currentUser.username}, {img: req.body.img}, function(err,data){
                            if(err){
                                console.log(err)
                            } 
                            objRepo.Topic.updateMany({author: currentUser.username}, {img: req.body.img}, function(err,data){
                                if(err){
                                    console.log(err)
                                } 
                                res.locals.user.img = req.body.img
                                req.flash("success_msg", "Sikeresen módosítottad profilképed!");
                                res.redirect('/forum/')
                            });
                        });  
                    }
                })
            }  
        })
    }
}