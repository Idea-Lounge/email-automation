(function () {
  "use strict";
  var nodemailer = require('nodemailer'),
    config = require('../../config.js');

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
    contactUs: function (requestBody, callback) {
      const nodemailer = require('nodemailer');

      var freelancers = '';
        function getEmails(array) {
          array.forEach(function(element) {
            freelancers = freelancers + element.email + ',';
          });
        }

        getEmails(config.freelancers);
        console.log(freelancers);
        // setup email data with unicode symbols
        var emailBody = 'Client: ' + requestBody.name + '\n';
        emailBody += 'Email: ' + requestBody.email + '\n';
        emailBody += 'Message: ' + requestBody.message;
        let mailOptions = {
          // codeReview(Anurag): IdeaLounge mail information to be stored in config and not here.
          // fix(Alona): IdeaLounge mail information already was there, hopefully we can use it.
          from: config.emailAccount.username, // sender address
          to: freelancers, // list of receivers
          subject: 'New Message from IdeaLounge', // Subject line
          text: emailBody// plain text bodys
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (!error) {
            //QUESTION:is null an error? how the error will be passed if such appers?
            //ANSWER: pass null here to show that there is no error in sending the email. If there is an error which appears see else condition. Resolved?
            callback(null);
            console.log('Message sent: %s', info.messageId);

          } else {
            // codeReview(Anurag): I am passing the error which we get directly from nodemailer. Should change this to be more structured.
            // feat():
            callback(error);
            console.log(error);
          }
        });
      }
    };

  module.exports = functions;
})();
