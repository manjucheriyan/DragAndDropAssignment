var express = require('express');
//const bank = require('../services/bank');
var router = express.Router();
var Bank = require('../services/bank');




function authMiddleware(req,res,next){
  console.log("Inside authMiddleware");
  if(req.session.currentUser){
    next();
  }
  else{    
    res.status(401).send({message:"Please login"});
  }
}
/* GET users listing. */

router.post('/list', function(req, res) {
  console.log("In Router user-list");
  Bank.getUsers()
  .then(data=>{
    res.status(data.statusCode).send({message:data.message,users:data.users});
  });
});

router.get('/', function(req, res) {
  console.log("in router user");
  Bank.getUsers()
  .then(data=>{
    res.status(data.statusCode).send({message:data.message,users:data.users});
  });
});

router.post('/register',function(req, res) {
  console.log("njn keri");
  let usname=req.body.username;
    Bank.addUser(usname)
    .then(data=>{
      res.status(data.statusCode).send({message:data.message});
    }) 
  

})

router.post('/createItem',function(req, res) {
    console.log("Inside Router-create Item")
    let itemName=req.body.itemName;
    console.log(itemName)
    Bank.createItem(itemName)
    .then(data=>{
      res.status(data.statusCode).send({message:data.message});
    })  

})

router.post('/deleteAllItems',function(req, res) {
  console.log("Inside Router-Delete all Item")
  Bank.deleteAllItems()
  .then(data=>{
    res.status(data.statusCode).send({message:data.message});
  })  

})


router.get('/delete',authMiddleware,function(req,res){
  console.log("In Delete User");
 // let uname=req.session.currentUser;
  Bank.deleteUser(uname)
  .then(data=>{
    res.status(data.statusCode).send({message:data.message});
  }) 
})


module.exports = router;