var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.aggregate(
    [
      {
        $match: {
          eyeColor: 'blue',
          gender: 'male',
          'company.location.country': 'USA',
        },
      },
    ],
    (err, users) => {
      if (err) return next(err);
      console.log(users);
      res.render('active', { users });
    }
  );
});

module.exports = router;
