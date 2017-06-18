var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:stepId', function(req, res, next) {
  var stepId = req.params.stepId;
  res.render('bwSteps/step' + stepId);
});

module.exports = router;
