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
            to: res.locals.newtoken.email,
            subject: 'Sikeres jelszó módosítás! ' + res.locals.newtoken.username,
            html: '<h1>Sikeresen módosítottad a jelszavad a fórumon!</h1>' + 
            '<p>Most már bejelentkezhetsz az új jelszóval:<span>http://localhost:3000/forum/login' + '</span></p>'
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