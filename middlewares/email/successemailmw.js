const nodemailer = require('nodemailer');

require('dotenv').config()

module.exports = function(objRepo){
    return function(req,res,next){
                setTimeout(function(){
                    objRepo.User.findOne({username: req.body.username}, function(err, finduser){
                        if(err){
                            console.log(err);
                        } else {
                            const token = finduser.activetoken;
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                user: process.env.EMAIL_ADDRESS,
                                pass: process.env.EMAIL_PASSWORD
                                }
                            });
                            
                            const mailOptions = {
                                from: process.env.EMAIL_ADDRESS,
                                to: req.body.email,
                                subject: 'Sikeres regisztráció teszt fórumra',
                                html: '<h1>Üdvözöllek a fórumon!</h1><p>Sikeres regisztráció!</p><p>Felhasználónév: <span> ' 
                                + req.body.username + '</span></p>' +
                                '<br><p>Aktivációs link: <span>http://' + process.env.IP_ADDRESS + "/forum/activate/" + token + '</span></p>'
                            };
                            
                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                console.log(error);
                                } else {
                                console.log('Email sent: ' + info.response);
                                }
                            });
                        }
                    })
                }, 3000)
    }
}