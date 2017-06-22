var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Film Dev' });
});

router.get('/images/:type', function(req, res, next){
  if(req.params.type == 0){
    res.send(fs.readdirSync('./public/images/background/color'));
  } else {
    res.send(fs.readdirSync('./public/images/background/bw'));
  }
});

module.exports = router;
