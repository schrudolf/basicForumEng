const renderforummw = require('../middlewares/renderforummw');
const newcontentmw = require('../middlewares/newcontentmw');
const newforummw = require('../middlewares/newforummw');
const showforumsmw = require('../middlewares/showforumsmw');
const topicmw = require('../middlewares/topicmw');
const newtopicmw = require('../middlewares/newtopicmw');
const showtopicmw = require('../middlewares/showtopicmw');
const newcommentmw = require('../middlewares/newcommentmw');
const login = require('../middlewares/user/login');
const register = require('../middlewares/user/register');

// clear error

const errormw = require('../middlewares/errormw')

//models
const Newcontent = require('../models/newcontent');
const Forum = require('../models/forum');
const Topic = require('../models/topic');
const Comment = require('../models/comments');



// Routing
module.exports = function(app){
    const objRepo = {
        Newcontent: Newcontent,
        Forum: Forum,
        Topic: Topic,
        Comment: Comment,
        error: []
    };

    app.get('/forum/',  
        errormw(objRepo),
        renderforummw(objRepo));

    app.use('/forum/register',
        register(objRepo));

    app.use('/forum/login',
        login(objRepo));

    app.use('/forum/newcontent',
        errormw(objRepo),
        newcontentmw(objRepo));

    app.get('/forum/:id/',
        errormw(objRepo),
        showforumsmw(objRepo));

    app.use('/forum/:id/new',
        errormw(objRepo), 
        newforummw(objRepo));

    app.get('/forum/:id/:forumid/', 
        errormw(objRepo),
        topicmw(objRepo));

    app.use('/forum/:id/:forumid/new',
        errormw(objRepo),
        newtopicmw(objRepo));

    app.get('/forum/:id/:forumid/:topicid',
        errormw(objRepo),
        showtopicmw(objRepo));

    app.use('/forum/:id/:forumid/:topicid/newcomment', 
        errormw(objRepo),
        newcommentmw(objRepo),
        showtopicmw(objRepo));
};   
  