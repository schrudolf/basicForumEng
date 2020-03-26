const renderforummw = require('../middlewares/renderforummw');
const newcontentmw = require('../middlewares/newcontentmw');
const newforummw = require('../middlewares/newforummw');
const showforumsmw = require('../middlewares/showforumsmw');
const topicmw = require('../middlewares/topicmw');
const newtopicmw = require('../middlewares/newtopicmw');
const showtopicmw = require('../middlewares/showtopicmw');
const newcommentmw = require('../middlewares/newcommentmw');
const edittopicmw = require('../middlewares/user/edittopicmw');
const deletetopicmw = require('../middlewares/user/deletetopicmw');
const deletecommentmw = require('../middlewares/user/deletecommentmw');
const login = require('../middlewares/user/login');
const renderregistermw = require('../middlewares/user/rendRegistermw');
const newusermw = require('../middlewares/user/newusermw');



// auth
const authmw = require('../middlewares/auth/authmw');
const logoutmw = require('../middlewares/auth/logoutmw');


//models
const Newcontent = require('../models/newcontent');
const Forum = require('../models/forum');
const Topic = require('../models/topic');
const Comment = require('../models/comments');
const User = require('../models/user');



// Routing
module.exports = function(app){
    const objRepo = {
        Newcontent: Newcontent,
        Forum: Forum,
        Topic: Topic,
        Comment: Comment,
        User: User
    };

    app.use('/forum/logout', logoutmw(objRepo));   

    app.get('/forum/',
        authmw(objRepo),  
        renderforummw(objRepo));

    app.use('/forum/register',
        renderregistermw(objRepo),
        newusermw(objRepo));
        
    app.use('/forum/login',
        login(objRepo));

    app.use('/forum/newcontent',
        authmw(objRepo),
        newcontentmw(objRepo));

    app.get('/forum/:id/',
        authmw(objRepo),
        showforumsmw(objRepo));

    app.use('/forum/:id/new',
        authmw(objRepo), 
        newforummw(objRepo));

    app.get('/forum/:id/:forumid/',
        authmw(objRepo), 
        topicmw(objRepo));

    app.use('/forum/:id/:forumid/new',
        authmw(objRepo),
        newtopicmw(objRepo));

    app.get('/forum/:id/:forumid/:topicid',
        authmw(objRepo),
        showtopicmw(objRepo));

    app.use('/forum/:id/:forumid/:topicid/edit',
        authmw(objRepo),
        edittopicmw(objRepo));

    app.get('/forum/:id/:forumid/:topicid/delete',
        authmw(objRepo),
        deletetopicmw(objRepo));

    app.use('/forum/:id/:forumid/:topicid/newcomment',
        authmw(objRepo), 
        newcommentmw(objRepo),
        showtopicmw(objRepo));
        
    app.get('/forum/:id/:forumid/:topicid/:commentid/delete',
        authmw(objRepo), 
        deletecommentmw(objRepo));
};   
  