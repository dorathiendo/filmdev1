var express = require('express');
var router = express.Router();
var fs = require('fs');
var jsonfile = require('jsonfile');
var file = '~/routes/devTimes.txt';
jsonfile.readFile(file, function(err, obj) {
  console.dir(obj)
});

/* GET home page. */
router.get('/:stepId', function(req, res, next) {
  var stepId = req.params.stepId;
  res.render('bwSteps/step' + stepId);
});

router.get('/devTimes', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
