
require('dotenv').config();
const nodemailer = require('../config/nodemailer');

module.exports.newToken =  function (token) {
    let htmlString = nodemailer.renderTemplate({token: token}, '/access_token.ejs');
    nodemailer.transporter.sendMail({
        from: process.env.AUTH_USER,
        to: token.email,
        subject: 'PostIt | Reset Password',
        html: htmlString
    }, function (error, info) {
        if (error) {
            console.log('Error --> forgot_password_mailers -> newToken ', error);
            return;
        }

        // console.log('message sent: ', info);
        return;
    })
}
