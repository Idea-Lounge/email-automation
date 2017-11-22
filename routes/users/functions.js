(function () {
  "use strict";
  var nodemailer = require('nodemailer'),
    config = require('../../config.js'),
    fs = require('fs');

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
  let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.emailAccount.username, // generated ethereal user
        pass: config.emailAccount.password  // generated ethereal password
      }
    });

  var functions = {
    sendEmail: function (requestBody, callback) {
      const nodemailer = require('nodemailer');


      // setup email data with unicode symbols
      var emailBody = 'Client: ' + requestBody.name + '\n';
      emailBody += 'Email: ' + requestBody.email + '\n';
      emailBody += 'Message: ' + requestBody.message;

      var content;
      // First I want to read the file
      fs.readFile(config.path +'/template1.html', function (error, data) {
          console.log('reading file!');
        if (!error) {
          content = data;
          console.log(content);

          let mailOptions = {
            // codeReview(Anurag): IdeaLounge mail information to be stored in config and not here.
            // fix(Alona): IdeaLounge mail information already was there, hopefully we can use it.
            from: config.emailAccount.username, // sender address
            to: requestBody.email, // list of receivers
            subject: 'Email-Promotion example from Idea Lounge', // Subject line
            // TODO: get html from another static html file in file system
            html: content
          };
          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (!error) {
              callback(null);
              console.log('Message sent: %s', info.messageId);
            } else {
              // codeReview(Anurag): I am passing the error which we get directly from nodemailer. Should change this to be more structured.
              // feat():
              callback(error);
              console.log(error);
            }
          });
        } else {
          console.log('there was an error reading the file', error);
        }
      });
    }
  };

  module.exports = functions;
})();
