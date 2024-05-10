const express = require('express');
const router = express.Router();


/* GET protect page. */
router.get('/', function(req, res, next) {
  res.render('protect', { title: 'Express' });
});

module.exports = router;
