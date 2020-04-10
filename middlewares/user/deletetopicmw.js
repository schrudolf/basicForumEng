module.exports = function (objRepo) {
  return function (req, res, next) {
    objRepo.Topic.findOne({ _id: req.params.topicid }, function (err, topic) {
      if (err) {
        req.flash("error_msg", "Hiba nem törölhető!");
        return res.redirect(
          "/forum/" + req.params.contentid + "/" + req.params.forumid + "/"
        );
      }
      if (topic.author !== res.locals.user.username) {
        req.flash("error_msg", "Csak a saját témád törölheted!");
        return res.redirect(
          "/forum/" + req.params.contentid + "/" + req.params.forumid + "/"
        );
      } else {
        topic.delete();
        req.flash("success_msg", "Sikeresen törölted!");
        return res.redirect(
          "/forum/" + req.params.contentid + "/" + req.params.forumid + "/"
        );
      }
    });
  };
};
