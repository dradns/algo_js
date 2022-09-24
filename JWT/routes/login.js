var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/', function(req, res, next) {
  let user1 = req.body.username;
  let token1 = jwt.sign({payload: 'iampayload', username: user1},process.env.SECRET_TOKEN,);

  res.send({res: token1});
});

module.exports = router;