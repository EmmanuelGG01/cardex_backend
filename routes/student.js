var express = require('express');
var router = express.Router();


/* GET students listing. */
router.get('/', function(req, res, next) {
  res.send('GET respond with a resource');
});

router.post('/', function(req, res, next) {
  res.send('POST respond with a resource');

});

router.put('/', function(req,res,next){
  res.send('PUT respond with a resource');
});

router.delete('/',function(res,req,next){
  res.send('DELETE respond with a resource');
});

module.exports = router;
