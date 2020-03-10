const renderforummw = require('../middlewares/renderforummw');
const newcontentmw = require('../middlewares/newcontentmw');
const newforummw = require('../middlewares/newforummw');
const showforumsmw = require('../middlewares/showforumsmw');
const topicmw = require('../middlewares/topicmw');
const newtopicmw = require('../middlewares/newtopicmw');

//models
const Newcontent = require('../models/newcontent');
const Forum = require('../models/forum');
const Topic = require('../models/topic');

// Routing
module.exports = function(app){
    const objRepo = {
        Newcontent: Newcontent,
        Forum: Forum,
        Topic: Topic
    };

    app.get('/forum/',  
            renderforummw(objRepo));

    app.use('/forum/newcontent',
            newcontentmw(objRepo));

    app.get('/forum/:id/',
            showforumsmw(objRepo));

    app.use('/forum/:id/new', 
            newforummw(objRepo));

    app.get('/forum/:id/:forumid/', 
            topicmw(objRepo));

    app.use('/forum/:id/:forumid/new', 
            newtopicmw(objRepo));
};   
  