(function () {
  "use strict";
  var router = require('express').Router(),
    functions = require('./functions'),

    bodyParser = require('body-parser');
/* Handel POST request from the contactUs form. */
  router.post('/contact-us', function (req, res, next) {
    // TODO: request parser
    var response = {};
    functions.contactUs(req.body, function (error) {
      // TODO: grab informaion from req.body
      console.log(req.body);
      if (!error) {
        // if there is no error we construct a respose object
        response = {
          'message': 'Email sent to freelancers.'
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
