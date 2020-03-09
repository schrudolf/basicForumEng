const renderforummw = require('../middlewares/renderforummw');
const newcontentmw = require('../middlewares/newcontentmw');
const newforummw = require('../middlewares/newforummw');
const showforumsmw = require('../middlewares/showforumsmw');

//models
const Newcontent = require('../models/newcontent');
const Forum = require('../models/forum');

// Routing
module.exports = function(app){
    const objRepo = {
        Newcontent: Newcontent,
        Forum: Forum
    };

    app.get('/forum/',  
            renderforummw(objRepo));

    app.use('/forum/newcontent',
            newcontentmw(objRepo));

    app.get('/forum/:id/',
            showforumsmw(objRepo));

    app.use('/forum/:id/new', 
            newforummw(objRepo));
};   
  