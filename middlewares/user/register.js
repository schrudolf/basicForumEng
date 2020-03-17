module.exports = function(objRepo){
    return function(req,res,next){
        res.render('user/register')
        if(req.body !== ''){
            console.log(req.body)
        }
    }
}