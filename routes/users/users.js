(function () {
  "use strict";
  var router = require('express').Router(),
    functions = require('./functions'),

    bodyParser = require('body-parser');
/* Handel POST request from the email automation form. */
  router.post('/send-email', function (req, res, next) {
    // TODO: request parser
    var response = {};
    console.log('sending email');
    functions.sendEmail(req.body, function (error) {
      // TODO: grab informaion from req.body
      console.log(req.body);
      if (!error) {
        // if there is no error we construct a respose object
        response = {
          'message': 'Email sent.'
        };
        // send response( node bilt in function), we are passing respose object to it.
        res.json(response);
      } else {
        // if there is a mistake, construct a respose obj with error_code spesification
        response = {
          error_code: 400,
          message: 'There was some error'
        };
        // set up a respose status as an error_code we specified
        res.status(response.error_code);
        //send a response
        res.json(response);
      }
    });
  });

  module.exports = router;
})();
