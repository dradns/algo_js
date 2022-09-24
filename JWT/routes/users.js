var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let some = req.headers.authorization;
  if (some){
    let takenToken = some.split(' ')[1];
    jwt.verify(takenToken, process.env.SECRET_TOKEN, (err, resdecode) =>{
      if(err){
        res.sendStatus(402);
      }else{
        res.json(resdecode);
        res.sendStatus(201);
      }
    });
  }else{
    res.sendStatus(401);
  }

});

module.exports = router;
