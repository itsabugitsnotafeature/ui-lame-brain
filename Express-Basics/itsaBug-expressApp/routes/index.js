var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Updates home page. */
router.get('/bug', function(req, res, next) {
  res.render('index', { title: 'Its-A-Bug Express !' });
});


module.exports = router;
