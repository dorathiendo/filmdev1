var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('results', { results: fs.readdirSync('./public/images/background/all') });
});

router.get('/submit', function(req, res, next) {
  res.render('submitResults', {});
});

module.exports = router;
