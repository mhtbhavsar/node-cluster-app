var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express', message: `Handled by worker ${process.pid}` }).end();
});

module.exports = router;
