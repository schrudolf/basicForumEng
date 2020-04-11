const nodemailer = require('nodemailer');
require('dotenv').config()

module.exports = function(objRepo){
    return function(req,res,next){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
            }
        });
        
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: res.locals.forgotuser.email,
            subject: 'Jelszó módosítás',
            html: '<h1>Jelszó módosítás!</h1>' + 
            '<p><span>http://' + process.env.IP_ADDRESS + "/forum/forgot/" + res.locals.token + '</span></p>'
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    }
}