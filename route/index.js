const renderforummw = require('../middlewares/renderforummw');
const newcontentmw = require('../middlewares/newcontentmw');
const newforummw = require('../middlewares/newforummw');
const showforumsmw = require('../middlewares/showforumsmw');
const topicmw = require('../middlewares/topicmw');
const newtopicmw = require('../middlewares/newtopicmw');
const showtopicmw = require('../middlewares/showtopicmw');
const newcommentmw = require('../middlewares/newcommentmw');
const login = require('../middlewares/user/login');
const renderregistermw = require('../middlewares/user/rendRegistermw');
const newusermw = require('../middlewares/user/newusermw');

// clear error

const errormw = require('../middlewares/errormw');

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
        User: User,
        error: []
    };
    app.use('/forum/logout', logoutmw(objRepo));   

    app.get('/forum/',
        authmw(objRepo),  
        errormw(objRepo),
        renderforummw(objRepo));

    app.use('/forum/register',
        renderregistermw(objRepo),
        newusermw(objRepo));
        
    app.use('/forum/login',
        login(objRepo));

    app.use('/forum/newcontent',
        authmw(objRepo),
        errormw(objRepo),
        newcontentmw(objRepo));

    app.get('/forum/:id/',
        authmw(objRepo),
        errormw(objRepo),
        showforumsmw(objRepo));

    app.use('/forum/:id/new',
        authmw(objRepo),
        errormw(objRepo), 
        newforummw(objRepo));

    app.get('/forum/:id/:forumid/',
        authmw(objRepo), 
        errormw(objRepo),
        topicmw(objRepo));

    app.use('/forum/:id/:forumid/new',
        authmw(objRepo),
        errormw(objRepo),
        newtopicmw(objRepo));

    app.get('/forum/:id/:forumid/:topicid',
        authmw(objRepo),
        errormw(objRepo),
        showtopicmw(objRepo));

    app.use('/forum/:id/:forumid/:topicid/newcomment',
        authmw(objRepo), 
        errormw(objRepo),
        newcommentmw(objRepo),
        showtopicmw(objRepo));

};   
  