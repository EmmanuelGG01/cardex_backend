var userModel = require('../models/userModel');
var express = require('express');
var router = express.Router();


/* GET students listing. */
router.get('/', function(req, res, next) {
  //res.send('GET respond with a resource');
  console.log('Body: ');
  console.log(req.body);
  var user =  new userModel();
  userModel.get(function (err,user){
    if(err){
      res.json({
        status: "Error",
        massage: err
      });
    }else{
      res.json({
        status: "Success",
        message: "Got User Successfully",
        data: user
      });
    }
  });
});

router.post('/', function(req, res, next) {
  console.log('Body: ' );
  console.log(req.body);
  //res.send('created');
  var user = new userModel();
  user.name = req.body.name;
  user.email = req.body.email;
  user.telephone = req.body.telephone;
  user.password = req.body.password;
  user.age = req.body.age;
  user.gender = req.body.gender;
  user.hobby = req.body.hobby;
  user.registrationdate = req.body.registrationdate;
  user.save(function (err){
    if(err){
      res.json(err);
    }
    res.json({
      message: "User created Successfully",
      data: user
    });
  });

});

router.put('/', function(req,res,next){
  res.send('PUT respond with a resource');
});

router.delete('/',function(res,req,next){
  res.send('DELETE respond with a resource');
});

module.exports = router;
