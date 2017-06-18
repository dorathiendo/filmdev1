var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/step/:stepId', function(req, res, next) {
  var stepId = req.params.stepId;
  res.render('colorSteps/step' + stepId);
});

router.get('/all', function(req, res, next) {
  res.render('colorSteps/steps');
});
module.exports = router;
